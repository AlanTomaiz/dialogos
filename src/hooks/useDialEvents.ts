import { useCallback, useEffect, useState } from 'react';
import type { EventData } from '../components/EventCard/EventCard';
import {
  createDialEvent,
  type CreateDialEventInput,
  subscribeDialEvents
} from '../services/eventService';

export function useDialEvents(onLoadError?: () => void) {
  const [events, setEvents] = useState<EventData[]>([]);

  useEffect(() => {
    return subscribeDialEvents(setEvents, () => {
      onLoadError?.();
    });
  }, [onLoadError]);

  const createEvent = useCallback(
    async (input: CreateDialEventInput): Promise<void> => {
      await createDialEvent(input);
    },
    []
  );

  return {
    events,
    createEvent
  };
}
