import { useEffect, useRef } from 'react';
import { USER_DEACTIVATED_MESSAGE } from '../config/messages';
import { doc, firestore, onSnapshot } from '../libs/firebase';
import { signOutCurrentUser } from '../services/authService';
import { clearCachedUserProfile } from '../utils/userProfileStorage';
import { useToast } from './useToast';

export function useUserStatusWatcher(
  uid: string | null,
  onDeactivated: () => void
): void {
  const { show: showToast } = useToast();
  const onDeactivatedRef = useRef(onDeactivated);
  const hasTriggeredRef = useRef(false);

  useEffect(() => {
    onDeactivatedRef.current = onDeactivated;
  });

  useEffect(() => {
    if (!uid) return;

    hasTriggeredRef.current = false;

    const userRef = doc(firestore, 'dial_users', uid);

    const unsubscribe = onSnapshot(userRef, (snapshot) => {
      const status = snapshot.data()?.status as string | undefined;

      if (status === 'INACTIVE' && !hasTriggeredRef.current) {
        hasTriggeredRef.current = true;
        onDeactivatedRef.current();
        showToast(USER_DEACTIVATED_MESSAGE, 'error');
        signOutCurrentUser().catch(() => {});
        clearCachedUserProfile().catch(() => {});
      }
    });

    return unsubscribe;
  }, [uid, showToast]);
}
