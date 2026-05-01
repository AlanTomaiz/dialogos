import AsyncStorage from '@react-native-async-storage/async-storage';
import { Platform } from 'react-native';

export type CachedUserProfile = {
  uid: string;
  fullName: string;
  photoURL: string | null;
};

const USER_PROFILE_STORAGE_KEY = 'dial_logged_user_profile';

export async function getCachedUserProfile(): Promise<CachedUserProfile | null> {
  if (Platform.OS === 'web') {
    const rawProfile = window.localStorage.getItem(USER_PROFILE_STORAGE_KEY);

    if (!rawProfile) {
      return null;
    }

    return JSON.parse(rawProfile) as CachedUserProfile;
  }

  const rawProfile = await AsyncStorage.getItem(USER_PROFILE_STORAGE_KEY);

  if (!rawProfile) {
    return null;
  }

  return JSON.parse(rawProfile) as CachedUserProfile;
}

export async function cacheUserProfile(
  profile: CachedUserProfile
): Promise<void> {
  const serialized = JSON.stringify(profile);

  if (Platform.OS === 'web') {
    window.localStorage.setItem(USER_PROFILE_STORAGE_KEY, serialized);
    return;
  }

  await AsyncStorage.setItem(USER_PROFILE_STORAGE_KEY, serialized);
}
