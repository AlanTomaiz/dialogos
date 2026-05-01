import type { EventData } from '../components/EventCard/EventCard';
import {
  addDoc,
  collection,
  firestore,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  type Unsubscribe
} from '../libs/firebase';
import {
  mapDialEventToEventData,
  type DialEventDoc
} from '../utils/dialEventMapper';

export type CreateDialEventInput = {
  title: string;
  timeRange: string;
  duration: string;
  location: string;
  creatorUid: string;
  creatorName: string;
  creatorPhotoUrl: string | null;
  description: string;
  checked?: boolean;
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
): Promise<void> {
  await addDoc(collection(firestore, 'dial_events'), {
    title: input.title,
    timeRange: input.timeRange,
    duration: input.duration,
    location: input.location,
    creatorUid: input.creatorUid,
    creatorName: input.creatorName,
    creatorPhotoUrl: input.creatorPhotoUrl,
    description: input.description,
    checked: false,
    createdAt: serverTimestamp()
  });
}
