import { useMemo } from 'react';
import type { EventData } from '../components/EventCard/EventCard';
import { isWithinEventTimeWindow } from '../utils/parseEventTimeRange';

export type EventAvailability = {
  isAvailable: boolean;
  reason?: 'outside_time_window' | 'event_expired' | 'not_started';
};

export function useEventAvailability(
  event: EventData | null
): EventAvailability {
  return useMemo(() => {
    if (!event) {
      return { isAvailable: false, reason: 'event_expired' };
    }

    const isValid = isWithinEventTimeWindow(event.timeRange, event.createdAt);

    return {
      isAvailable: isValid,
      reason: isValid ? undefined : 'outside_time_window'
    };
  }, [event]);
}
