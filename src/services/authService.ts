import {
  AUTH_DEACTIVATE_FAILED,
  AUTH_INVALID_RA_REGISTRATION,
  AUTH_PROVIDE_IDENTIFIER,
  AUTH_RA_ALREADY_REGISTERED,
  AUTH_RA_NOT_FOUND,
  AUTH_REGISTER_FAILED,
  AUTH_SIGN_IN_FAILED,
  AUTH_SIGN_OUT_FAILED,
  AUTH_USER_NOT_FOUND,
  FIREBASE_CONFIG_NOT_FOUND,
  FIREBASE_EMAIL_IN_USE,
  FIREBASE_INVALID_CREDENTIAL,
  FIREBASE_INVALID_EMAIL,
  FIREBASE_NETWORK_FAILED,
  FIREBASE_TOO_MANY_REQUESTS,
  FIREBASE_WEAK_PASSWORD,
  USER_DEACTIVATED_MESSAGE
} from '../config/messages';
import {
  auth,
  createUserWithEmailAndPassword,
  doc,
  firestore,
  getDoc,
  serverTimestamp,
  setDoc,
  signInWithEmailAndPassword,
  signOut,
  updateDoc,
  type FirebaseError
} from '../libs/firebase';
import { clearCachedUserProfile } from '../utils/userProfileStorage';

export type UserRole = 'ADMIN' | 'MEMBER';
export type UserStatus = 'ACTIVE' | 'INACTIVE';
export type UserProfile = {
  uid: string;
  fullName: string;
  photoURL: string | null;
  role: UserRole;
};

const DEFAULT_USER_ROLE: UserRole = 'MEMBER';
const DEFAULT_USER_STATUS: UserStatus = 'ACTIVE';

type RegisterInput = {
  fullName: string;
  ra: string;
  email: string;
  password: string;
};

type DialUser = {
  uid: string;
  fullName: string;
  ra: string;
  email: string;
  role: UserRole;
  status: UserStatus;
  createdAt: unknown;
};

type RaIndex = {
  uid: string;
  email: string;
  ra: string;
  createdAt: unknown;
};

function normalizeRA(ra: string): string {
  return ra.trim().toLowerCase();
}

function isEmailLike(value: string): boolean {
  return value.includes('@');
}

function getFriendlyAuthErrorMessage(
  error: unknown,
  fallbackMessage: string
): string {
  if (!(error instanceof Error)) {
    return fallbackMessage;
  }

  const firebaseError = error as FirebaseError;

  if (error.message.includes('CONFIGURATION_NOT_FOUND')) {
    return FIREBASE_CONFIG_NOT_FOUND;
  }

  switch (firebaseError.code) {
    case 'auth/configuration-not-found':
      return FIREBASE_CONFIG_NOT_FOUND;
    case 'auth/email-already-in-use':
      return FIREBASE_EMAIL_IN_USE;
    case 'auth/invalid-email':
      return FIREBASE_INVALID_EMAIL;
    case 'auth/weak-password':
      return FIREBASE_WEAK_PASSWORD;
    case 'auth/invalid-credential':
    case 'auth/wrong-password':
    case 'auth/user-not-found':
      return FIREBASE_INVALID_CREDENTIAL;
    case 'auth/too-many-requests':
      return FIREBASE_TOO_MANY_REQUESTS;
    case 'auth/network-request-failed':
      return FIREBASE_NETWORK_FAILED;
    default:
      return error.message || fallbackMessage;
  }
}

export async function getUserStatusByUid(
  uid: string
): Promise<UserStatus | null> {
  const userRef = doc(firestore, 'dial_users', uid);
  const userSnap = await getDoc(userRef);

  if (!userSnap.exists()) {
    return null;
  }

  const data = userSnap.data() as { status?: UserStatus };
  return data.status ?? DEFAULT_USER_STATUS;
}

export async function getCurrentUserProfile(): Promise<UserProfile | null> {
  const currentUser = auth.currentUser;

  if (!currentUser) {
    return null;
  }

  const userRef = doc(firestore, 'dial_users', currentUser.uid);
  const userSnap = await getDoc(userRef);

  const fallbackName =
    currentUser.displayName?.trim() ||
    currentUser.email?.split('@')[0] ||
    'Usuario';

  if (!userSnap.exists()) {
    return {
      uid: currentUser.uid,
      fullName: fallbackName,
      photoURL: currentUser.photoURL ?? null,
      role: DEFAULT_USER_ROLE
    };
  }

  const data = userSnap.data() as {
    fullName?: string;
    photoURL?: string | null;
    role?: UserRole;
  };

  return {
    uid: currentUser.uid,
    fullName: data.fullName?.trim() || fallbackName,
    photoURL: data.photoURL ?? currentUser.photoURL ?? null,
    role: data.role ?? DEFAULT_USER_ROLE
  };
}

export async function registerWithRA(input: RegisterInput): Promise<void> {
  try {
    const normalizedRA = normalizeRA(input.ra);
    const raIndexRef = doc(firestore, 'dial_ra_index', normalizedRA);
    const existingRA = await getDoc(raIndexRef);

    if (existingRA.exists()) {
      throw new Error(AUTH_RA_ALREADY_REGISTERED);
    }

    const credential = await createUserWithEmailAndPassword(
      auth,
      input.email.trim(),
      input.password
    );

    const uid = credential.user.uid;

    const userDoc: DialUser = {
      uid,
      fullName: input.fullName.trim(),
      ra: normalizedRA,
      email: input.email.trim().toLowerCase(),
      role: DEFAULT_USER_ROLE,
      status: DEFAULT_USER_STATUS,
      createdAt: serverTimestamp()
    };

    const raIndexDoc: RaIndex = {
      uid,
      email: input.email.trim().toLowerCase(),
      ra: normalizedRA,
      createdAt: serverTimestamp()
    };

    await setDoc(doc(firestore, 'dial_users', uid), userDoc);
    await setDoc(raIndexRef, raIndexDoc);
  } catch (error) {
    throw new Error(getFriendlyAuthErrorMessage(error, AUTH_REGISTER_FAILED));
  }
}

export async function signInWithRA(
  identifier: string,
  password: string
): Promise<void> {
  try {
    const normalizedIdentifier = identifier.trim().toLowerCase();

    if (!normalizedIdentifier) {
      throw new Error(AUTH_PROVIDE_IDENTIFIER);
    }

    let credential;

    if (isEmailLike(normalizedIdentifier)) {
      credential = await signInWithEmailAndPassword(
        auth,
        normalizedIdentifier,
        password
      );
    } else {
      const normalizedRA = normalizeRA(normalizedIdentifier);

      const raIndexRef = doc(firestore, 'dial_ra_index', normalizedRA);
      const raIndexSnap = await getDoc(raIndexRef);

      if (!raIndexSnap.exists()) {
        throw new Error(AUTH_RA_NOT_FOUND);
      }

      const data = raIndexSnap.data() as { email?: string; uid?: string };
      if (!data.email) {
        throw new Error(AUTH_INVALID_RA_REGISTRATION);
      }

      credential = await signInWithEmailAndPassword(auth, data.email, password);
    }

    const userRef = doc(firestore, 'dial_users', credential.user.uid);
    const userSnap = await getDoc(userRef);

    if (userSnap.exists()) {
      const userData = userSnap.data() as {
        role?: UserRole;
        status?: UserStatus;
      };

      if (userData.status === 'INACTIVE') {
        throw new Error(USER_DEACTIVATED_MESSAGE);
      }
    }
  } catch (error) {
    throw new Error(getFriendlyAuthErrorMessage(error, AUTH_SIGN_IN_FAILED));
  }
}

export async function signOutCurrentUser(): Promise<void> {
  try {
    await clearCachedUserProfile();
    await signOut(auth);
  } catch (error) {
    throw new Error(getFriendlyAuthErrorMessage(error, AUTH_SIGN_OUT_FAILED));
  }
}

export async function deactivateCurrentUserAccount(): Promise<void> {
  const currentUser = auth.currentUser;

  if (!currentUser) {
    throw new Error(AUTH_USER_NOT_FOUND);
  }

  try {
    const userRef = doc(firestore, 'dial_users', currentUser.uid);

    await updateDoc(userRef, {
      status: 'INACTIVE'
    });

    await signOutCurrentUser();
  } catch (error) {
    throw new Error(getFriendlyAuthErrorMessage(error, AUTH_DEACTIVATE_FAILED));
  }
}
