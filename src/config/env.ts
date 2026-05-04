const rawEnv = {
  EXPO_PUBLIC_FIREBASE_API_KEY: process.env.EXPO_PUBLIC_FIREBASE_API_KEY,
  EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN:
    process.env.EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN,
  EXPO_PUBLIC_FIREBASE_PROJECT_ID: process.env.EXPO_PUBLIC_FIREBASE_PROJECT_ID,
  EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET:
    process.env.EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET,
  EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID:
    process.env.EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  EXPO_PUBLIC_FIREBASE_APP_ID: process.env.EXPO_PUBLIC_FIREBASE_APP_ID,
  EXPO_PUBLIC_QR_SIGNING_SECRET: process.env.EXPO_PUBLIC_QR_SIGNING_SECRET
};

const missingKeys = (Object.keys(rawEnv) as (keyof typeof rawEnv)[]).filter(
  (key) => !rawEnv[key]
);

if (missingKeys.length > 0) {
  throw new Error(`Variáveis de ambiente ausentes:\n${missingKeys.join('\n')}`);
}

export const env = rawEnv as Required<typeof rawEnv>;
