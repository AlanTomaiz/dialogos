import { Share } from 'react-native';
import { EventQRCodePayload } from './EventQRCodeModal.type';

export function buildQRCodeValue(payload: EventQRCodePayload): string {
  return JSON.stringify(payload);
}

export async function shareEventQRCode(
  eventTitle: string,
  eventId: string
): Promise<void> {
  await Share.share({
    message: `Confira o evento "${eventTitle}" no Dialogos. ID: ${eventId}`,
    title: eventTitle
  });
}
