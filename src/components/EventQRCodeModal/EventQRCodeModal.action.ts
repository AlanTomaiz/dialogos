import { Share } from 'react-native';
import { buildSignedQRPayload } from '../../utils/qrCodeSigning';

export async function buildQRCodeValue(eventId: string): Promise<string> {
  return buildSignedQRPayload(eventId);
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
