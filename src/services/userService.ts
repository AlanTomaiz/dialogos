import {
  collection,
  doc,
  firestore,
  getDocs,
  updateDoc
} from '../libs/firebase';
import type { UserStatus } from './authService';
import type { DialUserPublic, UserStatusUpdateInput } from './userService.type';

export async function getAllUsers(): Promise<DialUserPublic[]> {
  const snapshot = await getDocs(collection(firestore, 'dial_users'));

  return snapshot.docs.map((userDoc) => {
    const data = userDoc.data() as Record<string, unknown>;

    return {
      uid: userDoc.id,
      fullName: typeof data.fullName === 'string' ? data.fullName : 'Usuário',
      ra: typeof data.ra === 'string' ? data.ra : 'SEM RA',
      email: typeof data.email === 'string' ? data.email : 'SEM EMAIL',
      role: data.role === 'ADMIN' ? 'ADMIN' : 'MEMBER',
      status: data.status === 'INACTIVE' ? 'INACTIVE' : 'ACTIVE'
    } satisfies DialUserPublic;
  });
}

export async function updateUserStatus(
  input: UserStatusUpdateInput
): Promise<void> {
  const userRef = doc(firestore, 'dial_users', input.uid);
  await updateDoc(userRef, { status: input.status satisfies UserStatus });
}
