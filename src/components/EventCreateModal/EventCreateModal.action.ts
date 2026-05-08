import {
  EVENT_FORM_END_AFTER_START,
  EVENT_FORM_FILL_REQUIRED,
  EVENT_FORM_INVALID_TIME_FORMAT
} from '../../config/messages';
import type { EventCreateInput } from './EventCreateModal.type';

const TIME_PATTERN = /^([01]\d|2[0-3]):([0-5]\d)$/;

type ValidationResult =
  | { valid: true }
  | { valid: false; message: string; severity: 'warning' | 'error' };

export function validateEventCreateInput(
  input: EventCreateInput
): ValidationResult {
  if (
    !input.title ||
    !input.description ||
    !input.timeStart ||
    !input.timeEnd ||
    !input.location
  ) {
    return {
      valid: false,
      message: EVENT_FORM_FILL_REQUIRED,
      severity: 'warning'
    };
  }

  if (
    !TIME_PATTERN.test(input.timeStart.trim()) ||
    !TIME_PATTERN.test(input.timeEnd.trim())
  ) {
    return {
      valid: false,
      message: EVENT_FORM_INVALID_TIME_FORMAT,
      severity: 'warning'
    };
  }

  const [startHour, startMinute] = input.timeStart
    .trim()
    .split(':')
    .map(Number);

  const [endHour, endMinute] = input.timeEnd.trim().split(':').map(Number);
  const startInMinutes = startHour * 60 + startMinute;
  const endInMinutes = endHour * 60 + endMinute;

  if (endInMinutes <= startInMinutes) {
    return {
      valid: false,
      message: EVENT_FORM_END_AFTER_START,
      severity: 'warning'
    };
  }

  return { valid: true };
}
