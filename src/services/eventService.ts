import type { EventData } from '../components/EventCard/EventCard';
import {
  addDoc,
  collection,
  collectionGroup,
  doc,
  firestore,
  getDoc,
  getDocs,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  setDoc,
  updateDoc,
  where,
  type Unsubscribe
} from '../libs/firebase';
import {
  mapDialEventToEventData,
  type DialEventDoc
} from '../utils/dialEventMapper';
import { isWithinEventTimeWindow } from '../utils/parseEventTimeRange';
import { buildSignedQRPayload, verifyQRPayload } from '../utils/qrCodeSigning';
import type { UserRole } from './authService';

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
  const docRef = await addDoc(collection(firestore, 'dial_events'), {
    title: input.title,
    timeRange: input.timeRange,
    duration: input.duration,
    location: input.location,
    creatorUid: input.creatorUid,
    creatorName: input.creatorName,
    creatorPhotoUrl: input.creatorPhotoUrl,
    description: input.description,
    createdAt: serverTimestamp()
  });

  return docRef.id;
}

export type RegisterParticipantResult =
  | { success: true; alreadyRegistered: boolean }
  | { success: false; error: string };

export async function registerParticipant(
  eventId: string,
  uid: string
): Promise<RegisterParticipantResult> {
  const eventRef = doc(firestore, 'dial_events', eventId);
  const eventSnap = await getDoc(eventRef);

  if (!eventSnap.exists()) {
    return { success: false, error: 'Evento não encontrado.' };
  }

  const eventData = eventSnap.data() as DialEventDoc;

  const createdAtIso =
    typeof eventData.createdAt === 'string'
      ? eventData.createdAt
      : (eventData.createdAt?.toDate().toISOString() ??
        new Date().toISOString());

  if (!isWithinEventTimeWindow(eventData.timeRange ?? '', createdAtIso)) {
    return { success: false, error: 'Fora do horário permitido do evento.' };
  }

  const participantRef = doc(
    firestore,
    'dial_events',
    eventId,
    'participants',
    uid
  );

  const participantSnap = await getDoc(participantRef);
  if (participantSnap.exists()) {
    return { success: true, alreadyRegistered: true };
  }

  await setDoc(participantRef, {
    uid,
    joinedAt: serverTimestamp(),
    checked: true
  });

  return { success: true, alreadyRegistered: false };
}

export async function getUserCheckedEventIds(uid: string): Promise<string[]> {
  const snap = await getDocs(
    query(collectionGroup(firestore, 'participants'), where('uid', '==', uid))
  );

  return snap.docs
    .map((d) => d.ref.parent.parent?.id)
    .filter((id): id is string => Boolean(id));
}

export async function getOrCreateEventQRCodePayload(
  input: EventQRCodeRequestInput
): Promise<string> {
  const { eventId, requesterUid, requesterRole } = input;

  if (!requesterUid) {
    throw new Error('Usuario logado nao identificado.');
  }

  if (requesterRole !== 'ADMIN') {
    throw new Error('Apenas administradores podem apresentar o QR Code.');
  }

  const eventRef = doc(firestore, 'dial_events', eventId);
  const eventSnap = await getDoc(eventRef);

  if (!eventSnap.exists()) {
    throw new Error('Evento não encontrado.');
  }

  const eventData = eventSnap.data() as DialEventDoc;
  const creatorUid = eventData.creatorUid?.trim();

  if (!creatorUid || creatorUid !== requesterUid) {
    throw new Error(
      'Somente o administrador criador do evento pode apresentar o QR Code.'
    );
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
}
