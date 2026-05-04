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
      message: 'Preencha titulo, descricao, horario e local.',
      severity: 'warning'
    };
  }

  if (
    !TIME_PATTERN.test(input.timeStart.trim()) ||
    !TIME_PATTERN.test(input.timeEnd.trim())
  ) {
    return {
      valid: false,
      message: 'Informe horario valido no formato HH:MM.',
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
      message: 'Horario final deve ser maior que o inicial no mesmo dia.',
      severity: 'warning'
    };
  }

  return { valid: true };
}
