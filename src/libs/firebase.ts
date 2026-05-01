/* eslint-disable @typescript-eslint/no-var-requires */
import {
  getApp,
  getApps,
  initializeApp,
  type FirebaseError
} from 'firebase/app';
import {
  createUserWithEmailAndPassword,
  getAuth,
  initializeAuth,
  signInWithEmailAndPassword,
  type Auth
} from 'firebase/auth';
import {
  addDoc,
  collection,
  collectionGroup,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  setDoc,
  updateDoc,
  where,
  type Unsubscribe
} from 'firebase/firestore';
import { Platform } from 'react-native';
import { FIREBASE_CONFIG } from '../config/firebase';

const app = getApps().length === 0 ? initializeApp(FIREBASE_CONFIG) : getApp();

function createAuthInstance(): Auth {
  if (Platform.OS === 'web') {
    return getAuth(app);
  }

  try {
    const { getReactNativePersistence } = require('firebase/auth/react-native');
    const AsyncStorage =
      require('@react-native-async-storage/async-storage').default;

    return initializeAuth(app, {
      persistence: getReactNativePersistence(AsyncStorage)
    });
  } catch {
    return getAuth(app);
  }
}

export const auth = createAuthInstance();
export const firestore = getFirestore(app);

export {
  addDoc,
  collection,
  collectionGroup,
  createUserWithEmailAndPassword,
  doc,
  getDoc,
  getDocs,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  setDoc,
  signInWithEmailAndPassword,
  updateDoc,
  where
};

export type { FirebaseError, Unsubscribe };
