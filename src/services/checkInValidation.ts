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
      message: 'Check-in indisponível: evento inativo.'
    };
  }

  const createdAtIso = input.createdAtIso.trim();
  if (!createdAtIso) {
    return {
      allowed: false,
      code: 'EVENT_INVALID_DATE',
      message: 'Check-in indisponível: data do evento inválida.'
    };
  }

  const eventDate = new Date(createdAtIso);
  if (Number.isNaN(eventDate.getTime())) {
    return {
      allowed: false,
      code: 'EVENT_INVALID_DATE',
      message: 'Check-in indisponível: data do evento inválida.'
    };
  }

  if (!isSameLocalCalendarDay(eventDate, input.nowMs ?? Date.now())) {
    return {
      allowed: false,
      code: 'EVENT_OUTSIDE_EVENT_DATE',
      message: 'Check-in indisponível: evento válido apenas na data de criação.'
    };
  }

  const timeRange = input.timeRange.trim();
  if (!timeRange) {
    return {
      allowed: false,
      code: 'EVENT_INVALID_TIME_WINDOW',
      message: 'Check-in indisponível: janela de horário inválida.'
    };
  }

  const nowMs = input.nowMs ?? Date.now();
  const isAllowed = isWithinEventTimeWindowAt(timeRange, createdAtIso, nowMs);
  if (!isAllowed) {
    return {
      allowed: false,
      code: 'EVENT_OUTSIDE_TIME_WINDOW',
      message: 'Check-in indisponível: fora da janela de horário do evento.'
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
