import { Share } from 'react-native';
import {
  getOrCreateEventQRCodePayload,
  type EventQRCodeRequestInput
} from '../../services/eventService';

export async function buildQRCodeValue(
  input: EventQRCodeRequestInput
): Promise<string> {
  return getOrCreateEventQRCodePayload(input);
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
