import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  getApp,
  getApps,
  initializeApp,
  type FirebaseError
} from 'firebase/app';
import {
  createUserWithEmailAndPassword,
  getAuth,
  getReactNativePersistence,
  initializeAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
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
  runTransaction,
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

  return initializeAuth(app, {
    persistence: getReactNativePersistence(AsyncStorage)
  });
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
  onAuthStateChanged,
  onSnapshot,
  orderBy,
  query,
  runTransaction,
  serverTimestamp,
  setDoc,
  signInWithEmailAndPassword,
  signOut,
  updateDoc,
  where
};

export type { FirebaseError, Unsubscribe };
