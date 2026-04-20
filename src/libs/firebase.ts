import { getApp, getApps, initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { FIREBASE_CONFIG } from '../config/firebase';

const app = getApps().length === 0 ? initializeApp(FIREBASE_CONFIG) : getApp();

export const firestore = getFirestore(app);
