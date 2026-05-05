import { useCallback, useEffect, useState } from 'react';
import type { EventData } from '../components/EventCard/EventCard';
import { auth, onAuthStateChanged } from '../libs/firebase';
import {
  createDialEvent,
  getEventParticipants,
  getUserCheckedEventIds,
  registerParticipant,
  subscribeDialEvents,
  type CreateDialEventInput,
  type ParticipantData,
  type RegisterParticipantResult
} from '../services/eventService';

export function useDialEvents(onLoadError?: () => void) {
  const [events, setEvents] = useState<EventData[]>([]);
  const [checkedEventIds, setCheckedEventIds] = useState<Set<string>>(
    new Set()
  );

  useEffect(() => {
    return subscribeDialEvents(setEvents, () => {
      onLoadError?.();
    });
  }, [onLoadError]);

  useEffect(() => {
    return onAuthStateChanged(auth, (user) => {
      if (!user) {
        setCheckedEventIds(new Set());
        return;
      }

      getUserCheckedEventIds(user.uid)
        .then((ids) => setCheckedEventIds(new Set(ids)))
        .catch(() => {});
    });
  }, []);

  const createEvent = useCallback(
    async (input: CreateDialEventInput): Promise<string> => {
      return createDialEvent(input);
    },
    []
  );

  const registerEventParticipant = useCallback(
    async (eventId: string): Promise<RegisterParticipantResult> => {
      const uid = auth.currentUser?.uid;
      if (!uid) {
        return {
          success: false,
          code: 'USER_NOT_AUTHENTICATED',
          error: 'Usuário não autenticado.'
        };
      }

      const result = await registerParticipant(eventId, uid);
      if (result.success) {
        setCheckedEventIds((prev) => new Set(prev).add(eventId));
      }

      return result;
    },
    []
  );

  const getParticipants = useCallback(
    (eventId: string): Promise<ParticipantData[]> => {
      return getEventParticipants(eventId);
    },
    []
  );

  return {
    events,
    checkedEventIds,
    createEvent,
    registerEventParticipant,
    getParticipants
  };
}
