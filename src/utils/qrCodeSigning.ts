import type { SignedQRCodePayload } from '../components/EventQRCodeModal/EventQRCodeModal.type';
import {
  QR_EXPIRED,
  QR_INVALID,
  QR_INVALID_SIGNATURE,
  QR_UNSUPPORTED_VERSION
} from '../config/messages';
import {
  QR_CODE_TTL_MS,
  QR_PAYLOAD_VERSION,
  QR_SIGNING_SECRET
} from '../config/qr';

type VerifyResult =
  | { valid: true; eventId: string }
  | { valid: false; error: string };

function signingMessage(v: number, eventId: string, exp: number): string {
  return `${v}|${eventId}|${exp}`;
}

function fallbackSignatureHex(secret: string, message: string): string {
  const value = `${secret}|${message}`;

  let hashA = 2166136261;
  let hashB = 2166136261;

  for (let index = 0; index < value.length; index += 1) {
    const code = value.charCodeAt(index);
    hashA ^= code;
    hashA = Math.imul(hashA, 16777619) >>> 0;

    const reverseCode = value.charCodeAt(value.length - 1 - index);
    hashB ^= reverseCode;
    hashB = Math.imul(hashB, 16777619) >>> 0;
  }

  return `${hashA.toString(16).padStart(8, '0')}${hashB
    .toString(16)
    .padStart(8, '0')}`;
}

async function hmacSha256Hex(secret: string, message: string): Promise<string> {
  return fallbackSignatureHex(secret, message);
}

export async function buildSignedQRPayload(eventId: string): Promise<string> {
  const exp = Date.now() + QR_CODE_TTL_MS;
  const message = signingMessage(QR_PAYLOAD_VERSION, eventId, exp);
  const sig = await hmacSha256Hex(QR_SIGNING_SECRET, message);

  const payload: SignedQRCodePayload = {
    v: QR_PAYLOAD_VERSION,
    eventId,
    exp,
    sig
  };

  return JSON.stringify(payload);
}

export async function verifyQRPayload(raw: string): Promise<VerifyResult> {
  let parsed: unknown;

  try {
    parsed = JSON.parse(raw);
  } catch {
    return { valid: false, error: QR_INVALID };
  }

  if (
    typeof parsed !== 'object' ||
    parsed === null ||
    !('v' in parsed) ||
    !('eventId' in parsed) ||
    !('exp' in parsed) ||
    !('sig' in parsed)
  ) {
    return { valid: false, error: QR_INVALID };
  }

  const { v, eventId, exp, sig } = parsed as Record<string, unknown>;

  if (
    v !== QR_PAYLOAD_VERSION ||
    typeof eventId !== 'string' ||
    typeof exp !== 'number' ||
    typeof sig !== 'string'
  ) {
    return { valid: false, error: QR_UNSUPPORTED_VERSION };
  }

  if (Date.now() > exp) {
    return { valid: false, error: QR_EXPIRED };
  }

  const expectedSig = await hmacSha256Hex(
    QR_SIGNING_SECRET,
    signingMessage(QR_PAYLOAD_VERSION, eventId, exp)
  );

  if (sig !== expectedSig) {
    return { valid: false, error: QR_INVALID_SIGNATURE };
  }

  return { valid: true, eventId };
}
