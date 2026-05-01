import {
  collection,
  doc,
  firestore,
  getDocs,
  updateDoc
} from '../libs/firebase';

const EXPO_PUSH_API = 'https://exp.host/api/v2/push/send';

export async function saveUserPushToken(
  uid: string,
  token: string
): Promise<void> {
  await updateDoc(doc(firestore, 'dial_users', uid), { pushToken: token });
}

export async function broadcastNewEventNotification(
  eventTitle: string
): Promise<void> {
  const snapshot = await getDocs(collection(firestore, 'dial_users'));

  const tokens: string[] = [];

  snapshot.forEach((userDoc) => {
    const data = userDoc.data() as { pushToken?: string };
    if (data.pushToken) {
      tokens.push(data.pushToken);
    }
  });

  if (tokens.length === 0) return;

  const messages = tokens.map((token) => ({
    to: token,
    sound: 'default',
    title: 'Novo encontro criado',
    body: eventTitle
  }));

  await fetch(EXPO_PUSH_API, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(messages)
  });
}
