import { useEffect, useState } from 'react';
import { auth } from '../libs/firebase';
import { getCurrentUserProfile, type UserRole } from '../services/authService';
import {
  cacheUserProfile,
  getCachedUserProfile
} from '../utils/userProfileStorage';

type LoggedUserProfile = {
  uid: string;
  fullName: string;
  photoURL: string | null;
  role: UserRole;
};

const FALLBACK_PROFILE: LoggedUserProfile = {
  uid: '',
  fullName: 'Usuario',
  photoURL: null,
  role: 'MEMBER'
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
          cachedProfile.role &&
          (!authUid || cachedProfile.uid === authUid)
        ) {
          setProfile(cachedProfile);
          return;
        }

        const currentProfile = await getCurrentUserProfile();

        if (!isMounted || !currentProfile) {
          return;
        }

        const nextProfile: LoggedUserProfile = {
          uid: currentProfile.uid,
          fullName: currentProfile.fullName,
          photoURL: currentProfile.photoURL,
          role: currentProfile.role
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
