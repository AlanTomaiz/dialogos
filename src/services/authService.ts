import {
  auth,
  createUserWithEmailAndPassword,
  doc,
  firestore,
  getDoc,
  serverTimestamp,
  setDoc,
  signInWithEmailAndPassword,
  type FirebaseError
} from '../libs/firebase';

export type UserRole = 'ADMIN' | 'MEMBER';
export type UserStatus = 'ACTIVE' | 'INACTIVE';
export type DialUserProfile = {
  uid: string;
  fullName: string;
  photoURL: string | null;
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
    return 'Configuracao do Firebase Auth nao encontrada. Verifique se o projeto, a API key e o provedor Email/Senha estao configurados corretamente.';
  }

  switch (firebaseError.code) {
    case 'auth/configuration-not-found':
      return 'Configuracao do Firebase Auth nao encontrada. Verifique se o projeto, a API key e o provedor Email/Senha estao configurados corretamente.';
    case 'auth/email-already-in-use':
      return 'Este e-mail ja esta em uso.';
    case 'auth/invalid-email':
      return 'Informe um e-mail valido.';
    case 'auth/weak-password':
      return 'A senha deve ter pelo menos 6 caracteres.';
    case 'auth/invalid-credential':
    case 'auth/wrong-password':
    case 'auth/user-not-found':
      return 'E-mail/RA ou senha invalidos.';
    case 'auth/too-many-requests':
      return 'Muitas tentativas. Tente novamente em instantes.';
    case 'auth/network-request-failed':
      return 'Falha de conexao. Verifique sua internet.';
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

export async function getCurrentDialUserProfile(): Promise<DialUserProfile | null> {
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
      photoURL: currentUser.photoURL ?? null
    };
  }

  const data = userSnap.data() as {
    fullName?: string;
    photoURL?: string | null;
  };

  return {
    uid: currentUser.uid,
    fullName: data.fullName?.trim() || fallbackName,
    photoURL: data.photoURL ?? currentUser.photoURL ?? null
  };
}

export async function registerWithRA(input: RegisterInput): Promise<void> {
  try {
    const normalizedRA = normalizeRA(input.ra);
    const raIndexRef = doc(firestore, 'dial_ra_index', normalizedRA);
    const existingRA = await getDoc(raIndexRef);

    if (existingRA.exists()) {
      throw new Error('RA ja cadastrado.');
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
    throw new Error(
      getFriendlyAuthErrorMessage(error, 'Falha ao criar conta.')
    );
  }
}

export async function signInWithRA(
  identifier: string,
  password: string
): Promise<void> {
  try {
    const normalizedIdentifier = identifier.trim().toLowerCase();

    if (!normalizedIdentifier) {
      throw new Error('Informe o RA ou e-mail para entrar.');
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
        throw new Error('RA nao encontrado.');
      }

      const data = raIndexSnap.data() as { email?: string; uid?: string };
      if (!data.email) {
        throw new Error('Cadastro de RA invalido.');
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
        throw new Error('Usuario inativo. Contate um administrador.');
      }
    }
  } catch (error) {
    throw new Error(getFriendlyAuthErrorMessage(error, 'Falha ao entrar.'));
  }
}
