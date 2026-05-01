import { useCallback, useEffect, useState } from 'react';
import type { EventData } from '../components/EventCard/EventCard';
import { auth } from '../libs/firebase';
import {
  createDialEvent,
  getUserCheckedEventIds,
  registerParticipant,
  subscribeDialEvents,
  type CreateDialEventInput,
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
    const uid = auth.currentUser?.uid;
    if (!uid) return;

    getUserCheckedEventIds(uid)
      .then((ids) => setCheckedEventIds(new Set(ids)))
      .catch(() => {});
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
        return { success: false, error: 'Usuário não autenticado.' };
      }

      const result = await registerParticipant(eventId, uid);
      if (result.success) {
        setCheckedEventIds((prev) => new Set(prev).add(eventId));
      }

      return result;
    },
    []
  );

  return {
    events,
    checkedEventIds,
    createEvent,
    registerEventParticipant
  };
}
