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

  return { valid: true };
}
