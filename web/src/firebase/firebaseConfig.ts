import type { FirebaseOptions } from 'firebase/app';

function getEnvVariable(key: string): string | undefined {
  const value = import.meta.env[key];
  return typeof value === 'string' && value.length > 0 ? value : undefined;
}

export function getFirebaseConfig(): FirebaseOptions | null {
  const apiKey = getEnvVariable('VITE_FIREBASE_API_KEY');
  const authDomain = getEnvVariable('VITE_FIREBASE_AUTH_DOMAIN');
  const projectId = getEnvVariable('VITE_FIREBASE_PROJECT_ID');
  const storageBucket = getEnvVariable('VITE_FIREBASE_STORAGE_BUCKET');
  const messagingSenderId = getEnvVariable('VITE_FIREBASE_MESSAGING_SENDER_ID');
  const appId = getEnvVariable('VITE_FIREBASE_APP_ID');

  if (!apiKey || !authDomain || !projectId || !storageBucket || !messagingSenderId || !appId) {
    return null;
  }

  return {
    apiKey,
    authDomain,
    projectId,
    storageBucket,
    messagingSenderId,
    appId
  };
}
