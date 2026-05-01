import { useEffect, useState } from 'react';
import { auth } from '../libs/firebase';
import { getCurrentDialUserProfile } from '../services/authService';
import {
    cacheUserProfile,
    getCachedUserProfile
} from '../utils/userProfileStorage';

type LoggedUserProfile = {
  uid: string;
  fullName: string;
  photoURL: string | null;
};

const FALLBACK_PROFILE: LoggedUserProfile = {
  uid: '',
  fullName: 'Usuario',
  photoURL: null
};

export function useLoggedUserProfile() {
  const [profile, setProfile] = useState<LoggedUserProfile>(FALLBACK_PROFILE);

  useEffect(() => {
    let isMounted = true;

    async function loadProfile(): Promise<void> {
      try {
        const authUid = auth.currentUser?.uid;
        const cachedProfile = await getCachedUserProfile();

        if (
          isMounted &&
          cachedProfile &&
          (!authUid || cachedProfile.uid === authUid)
        ) {
          setProfile(cachedProfile);
          return;
        }

        const currentProfile = await getCurrentDialUserProfile();

        if (!isMounted || !currentProfile) {
          return;
        }

        const nextProfile: LoggedUserProfile = {
          uid: currentProfile.uid,
          fullName: currentProfile.fullName,
          photoURL: currentProfile.photoURL
        };

        setProfile(nextProfile);
        await cacheUserProfile(nextProfile);
      } catch {
        if (!isMounted) {
          return;
        }

        setProfile(FALLBACK_PROFILE);
      }
    }

    loadProfile();

    return () => {
      isMounted = false;
    };
  }, []);

  return profile;
}
