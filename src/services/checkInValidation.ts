import {
  CHECKIN_VALIDATE_EVENT_INACTIVE,
  CHECKIN_VALIDATE_INVALID_DATE,
  CHECKIN_VALIDATE_INVALID_TIME_WINDOW,
  CHECKIN_VALIDATE_OUTSIDE_DATE,
  CHECKIN_VALIDATE_OUTSIDE_TIME_WINDOW
} from '../config/messages';
import { isWithinEventTimeWindowAt } from '../utils/parseEventTimeRange';

export type CheckInErrorCode =
  | 'USER_NOT_AUTHENTICATED'
  | 'PERMISSION_DENIED'
  | 'EVENT_NOT_FOUND'
  | 'EVENT_INACTIVE'
  | 'EVENT_INVALID_DATE'
  | 'EVENT_OUTSIDE_EVENT_DATE'
  | 'EVENT_INVALID_TIME_WINDOW'
  | 'EVENT_OUTSIDE_TIME_WINDOW';

export type CheckInValidationResult =
  | { allowed: true }
  | { allowed: false; code: CheckInErrorCode; message: string };

type CheckInValidationInput = {
  isActive: boolean;
  timeRange: string;
  createdAtIso: string;
  nowMs?: number;
};

export function validateCheckInEligibility(
  input: CheckInValidationInput
): CheckInValidationResult {
  if (!input.isActive) {
    return {
      allowed: false,
      code: 'EVENT_INACTIVE',
      message: CHECKIN_VALIDATE_EVENT_INACTIVE
    };
  }

  const createdAtIso = input.createdAtIso.trim();
  if (!createdAtIso) {
    return {
      allowed: false,
      code: 'EVENT_INVALID_DATE',
      message: CHECKIN_VALIDATE_INVALID_DATE
    };
  }

  const eventDate = new Date(createdAtIso);
  if (Number.isNaN(eventDate.getTime())) {
    return {
      allowed: false,
      code: 'EVENT_INVALID_DATE',
      message: CHECKIN_VALIDATE_INVALID_DATE
    };
  }

  if (!isSameLocalCalendarDay(eventDate, input.nowMs ?? Date.now())) {
    return {
      allowed: false,
      code: 'EVENT_OUTSIDE_EVENT_DATE',
      message: CHECKIN_VALIDATE_OUTSIDE_DATE
    };
  }

  const timeRange = input.timeRange.trim();
  if (!timeRange) {
    return {
      allowed: false,
      code: 'EVENT_INVALID_TIME_WINDOW',
      message: CHECKIN_VALIDATE_INVALID_TIME_WINDOW
    };
  }

  const nowMs = input.nowMs ?? Date.now();
  const isAllowed = isWithinEventTimeWindowAt(timeRange, createdAtIso, nowMs);
  if (!isAllowed) {
    return {
      allowed: false,
      code: 'EVENT_OUTSIDE_TIME_WINDOW',
      message: CHECKIN_VALIDATE_OUTSIDE_TIME_WINDOW
    };
  }

  return { allowed: true };
}

function isSameLocalCalendarDay(baseDate: Date, nowMs: number): boolean {
  const nowDate = new Date(nowMs);

  return (
    baseDate.getFullYear() === nowDate.getFullYear() &&
    baseDate.getMonth() === nowDate.getMonth() &&
    baseDate.getDate() === nowDate.getDate()
  );
}
