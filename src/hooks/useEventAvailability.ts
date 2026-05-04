import { useMemo } from 'react';
import type { EventData } from '../components/EventCard/EventCard';
import { validateCheckInEligibility } from '../services/checkInValidation';

export type EventAvailability = {
  isAvailable: boolean;
  reason?:
    | 'outside_time_window'
    | 'outside_event_date'
    | 'event_expired'
    | 'event_inactive'
    | 'invalid_event_date'
    | 'invalid_time_window';
};

export function useEventAvailability(
  event: EventData | null
): EventAvailability {
  return useMemo(() => {
    if (!event) {
      return { isAvailable: false, reason: 'event_expired' };
    }

    const validation = validateCheckInEligibility({
      isActive: event.isActive !== false,
      timeRange: event.timeRange,
      createdAtIso: event.createdAt
    });

    if (validation.allowed) {
      return { isAvailable: true };
    }

    return {
      isAvailable: false,
      reason:
        validation.code === 'EVENT_INACTIVE'
          ? 'event_inactive'
          : validation.code === 'EVENT_OUTSIDE_EVENT_DATE'
            ? 'outside_event_date'
            : validation.code === 'EVENT_INVALID_DATE'
              ? 'invalid_event_date'
              : validation.code === 'EVENT_INVALID_TIME_WINDOW'
                ? 'invalid_time_window'
                : 'outside_time_window'
    };
  }, [event]);
}
