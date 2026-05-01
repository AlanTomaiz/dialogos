import { env } from './env';

export const QR_SIGNING_SECRET: string = env.EXPO_PUBLIC_QR_SIGNING_SECRET;

// 24 hours covers same-day events without requiring regeneration.
export const QR_CODE_TTL_MS: number = 24 * 60 * 60 * 1000;

export const QR_PAYLOAD_VERSION = 2 as const;
