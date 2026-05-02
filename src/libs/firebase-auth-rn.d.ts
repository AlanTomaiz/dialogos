import type AsyncStorage from '@react-native-async-storage/async-storage';
import type { Persistence } from 'firebase/auth';

// getReactNativePersistence is exported by the react-native bundle of firebase/auth
// (Metro resolves firebase/auth → dist/rn/index.js at build time), but the
// public auth-public.d.ts used by TypeScript omits it. This augmentation makes
// the type available without using `any` or `require`.
declare module 'firebase/auth' {
  export function getReactNativePersistence(
    storage: typeof AsyncStorage
  ): Persistence;
}
