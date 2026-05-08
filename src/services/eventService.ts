import type { EventData } from '../components/EventCard/EventCard';
import {
  EVENT_ADMIN_ONLY_QR_CODE,
  EVENT_CREATOR_ONLY_QR_CODE,
  EVENT_NOT_FOUND,
  EVENT_QR_CODE_PERMISSION_DENIED,
  EVENT_USER_NOT_IDENTIFIED
} from '../config/messages';
import {
  collection,
  collectionGroup,
  doc,
  firestore,
  getDoc,
  getDocs,
  onSnapshot,
  orderBy,
  query,
  runTransaction,
  serverTimestamp,
  updateDoc,
  where,
  type FirebaseError,
  type Unsubscribe
} from '../libs/firebase';
import {
  mapDialEventToEventData,
  type DialEventDoc
} from '../utils/dialEventMapper';
import { buildSignedQRPayload, verifyQRPayload } from '../utils/qrCodeSigning';
import type { UserRole } from './authService';
import {
  validateCheckInEligibility,
  type CheckInErrorCode
} from './checkInValidation';

export type EventQRCodeRequestInput = {
  eventId: string;
  requesterUid: string;
  requesterRole: UserRole;
};

export type CreateDialEventInput = {
  title: string;
  timeRange: string;
  duration: string;
  location: string;
  creatorUid: string;
  creatorName: string;
  creatorPhotoUrl: string | null;
  description: string;
};

export function subscribeDialEvents(
  onEvents: (events: EventData[]) => void,
  onError: () => void
): Unsubscribe {
  const eventsQuery = query(
    collection(firestore, 'dial_events'),
    orderBy('createdAt', 'desc')
  );

  return onSnapshot(
    eventsQuery,
    (snapshot) => {
      const events = snapshot.docs.map((eventDoc) => {
        const data = eventDoc.data() as DialEventDoc;
        return mapDialEventToEventData(eventDoc.id, data);
      });

      onEvents(events);
    },
    () => {
      onError();
    }
  );
}

export async function createDialEvent(
  input: CreateDialEventInput
): Promise<string> {
  const eventRef = doc(collection(firestore, 'dial_events'));

  await runTransaction(firestore, async (transaction) => {
    const userRef = doc(firestore, 'dial_users', input.creatorUid);
    const userSnap = await transaction.get(userRef);

    const profileFullName = userSnap.exists()
      ? ((userSnap.data() as { fullName?: string }).fullName ?? null)
      : null;

    const trimmedCreatorName = input.creatorName.trim();
    const participantFullName = profileFullName ?? (trimmedCreatorName || null);

    transaction.set(eventRef, {
      title: input.title,
      timeRange: input.timeRange,
      duration: input.duration,
      location: input.location,
      creatorUid: input.creatorUid,
      creatorName: input.creatorName,
      creatorPhotoUrl: input.creatorPhotoUrl,
      description: input.description,
      isActive: true,
      createdAt: serverTimestamp()
    });

    const creatorParticipantRef = doc(
      firestore,
      'dial_events',
      eventRef.id,
      'participants',
      input.creatorUid
    );

    transaction.set(creatorParticipantRef, {
      uid: input.creatorUid,
      fullName: participantFullName,
      joinedAt: serverTimestamp(),
      checked: true
    });
  });

  return eventRef.id;
}

export type RegisterParticipantResult =
  | { success: true; alreadyRegistered: boolean }
  | { success: false; code: CheckInErrorCode; error: string };

export async function registerParticipant(
  eventId: string,
  uid: string
): Promise<RegisterParticipantResult> {
  const eventRef = doc(firestore, 'dial_events', eventId);

  try {
    return await runTransaction(firestore, async (transaction) => {
      const eventSnap = await transaction.get(eventRef);

      if (!eventSnap.exists()) {
        return {
          success: false,
          code: 'EVENT_NOT_FOUND',
          error: 'Evento não encontrado.'
        };
      }

      const eventData = eventSnap.data() as DialEventDoc;

      const createdAtIso =
        typeof eventData.createdAt === 'string'
          ? eventData.createdAt
          : eventData.createdAt?.toDate().toISOString();

      const eligibility = validateCheckInEligibility({
        isActive: eventData.isActive !== false,
        timeRange: eventData.timeRange ?? '',
        createdAtIso: createdAtIso ?? ''
      });

      if (!eligibility.allowed) {
        return {
          success: false,
          code: eligibility.code,
          error: eligibility.message
        };
      }

      const participantRef = doc(
        firestore,
        'dial_events',
        eventId,
        'participants',
        uid
      );

      const userRef = doc(firestore, 'dial_users', uid);
      const [participantSnap, userSnap] = await Promise.all([
        transaction.get(participantRef),
        transaction.get(userRef)
      ]);

      if (participantSnap.exists()) {
        return { success: true, alreadyRegistered: true };
      }

      const fullName = userSnap.exists()
        ? ((userSnap.data() as { fullName?: string }).fullName ?? null)
        : null;

      transaction.set(participantRef, {
        uid,
        fullName,
        joinedAt: serverTimestamp(),
        checked: true
      });

      return { success: true, alreadyRegistered: false };
    });
  } catch (error: unknown) {
    if (isPermissionDeniedError(error)) {
      return {
        success: false,
        code: 'PERMISSION_DENIED',
        error: 'Sem permissão para registrar presença neste evento.'
      };
    }

    throw error;
  }
}

export type ParticipantData = {
  uid: string;
  fullName: string | null;
  joinedAt: Date | null;
};

export async function getEventParticipants(
  eventId: string
): Promise<ParticipantData[]> {
  const snap = await getDocs(
    collection(firestore, 'dial_events', eventId, 'participants')
  );

  const participants = snap.docs.map((d) => {
    const data = d.data();
    return {
      uid: data.uid as string,
      fullName: (data.fullName as string | null) ?? null,
      joinedAt: data.joinedAt?.toDate?.() ?? null
    };
  });

  const missing = participants.filter((p) => !p.fullName);

  if (missing.length > 0) {
    const userSnaps = await Promise.allSettled(
      missing.map((p) => getDoc(doc(firestore, 'dial_users', p.uid)))
    );

    const nameByUid = new Map<string, string>();
    userSnaps.forEach((result, index) => {
      if (result.status === 'fulfilled' && result.value.exists()) {
        const name = (result.value.data() as { fullName?: string }).fullName;
        if (name) {
          nameByUid.set(missing[index].uid, name);
        }
      }
    });

    return participants.map((p) =>
      p.fullName ? p : { ...p, fullName: nameByUid.get(p.uid) ?? null }
    );
  }

  return participants;
}

export async function getUserCheckedEventIds(uid: string): Promise<string[]> {
  const snap = await getDocs(
    query(collectionGroup(firestore, 'participants'), where('uid', '==', uid))
  );

  return snap.docs
    .map((d) => d.ref.parent.parent?.id)
    .filter((id): id is string => Boolean(id));
}

export function subscribeUserCheckedEventIds(
  uid: string,
  onIds: (ids: string[]) => void,
  onError: () => void
): Unsubscribe {
  const checkedEventsQuery = query(
    collectionGroup(firestore, 'participants'),
    where('uid', '==', uid)
  );

  return onSnapshot(
    checkedEventsQuery,
    (snapshot) => {
      const uniqueEventIds = Array.from(
        new Set(
          snapshot.docs
            .map((d) => d.ref.parent.parent?.id)
            .filter((id): id is string => Boolean(id))
        )
      );

      onIds(uniqueEventIds);
    },
    () => {
      onError();
    }
  );
}

export async function getUserCheckedEventIdsByEventIds(
  uid: string,
  eventIds: string[]
): Promise<string[]> {
  const uniqueEventIds = Array.from(
    new Set(eventIds.map((eventId) => eventId.trim()).filter(Boolean))
  );

  if (uniqueEventIds.length === 0) {
    return [];
  }

  const participantSnapshots = await Promise.all(
    uniqueEventIds.map((eventId) =>
      getDoc(doc(firestore, 'dial_events', eventId, 'participants', uid))
    )
  );

  return uniqueEventIds.filter((_, index) =>
    participantSnapshots[index].exists()
  );
}

export async function getOrCreateEventQRCodePayload(
  input: EventQRCodeRequestInput
): Promise<string> {
  const { eventId, requesterUid, requesterRole } = input;

  if (!requesterUid) {
    throw new Error(EVENT_USER_NOT_IDENTIFIED);
  }

  if (requesterRole !== 'ADMIN') {
    throw new Error(EVENT_ADMIN_ONLY_QR_CODE);
  }

  try {
    const eventRef = doc(firestore, 'dial_events', eventId);
    const eventSnap = await getDoc(eventRef);

    if (!eventSnap.exists()) {
      throw new Error(EVENT_NOT_FOUND);
    }

    const eventData = eventSnap.data() as DialEventDoc;
    const creatorUid = eventData.creatorUid?.trim();

    if (!creatorUid || creatorUid !== requesterUid) {
      throw new Error(EVENT_CREATOR_ONLY_QR_CODE);
    }

    const existingPayload =
      typeof eventData.qrPayload === 'string' ? eventData.qrPayload.trim() : '';

    if (existingPayload) {
      const verification = await verifyQRPayload(existingPayload);
      if (verification.valid && verification.eventId === eventId) {
        return existingPayload;
      }
    }

    const qrPayload = await buildSignedQRPayload(eventId);

    await updateDoc(eventRef, {
      qrPayload,
      qrPayloadUpdatedAt: serverTimestamp()
    });

    return qrPayload;
  } catch (error: unknown) {
    if (isPermissionDeniedError(error)) {
      throw new Error(EVENT_QR_CODE_PERMISSION_DENIED);
    }

    throw error;
  }
}

function isPermissionDeniedError(error: unknown): boolean {
  const firebaseError = error as FirebaseError | null;
  return firebaseError?.code === 'permission-denied';
}
