import { getApps, initializeApp, type FirebaseApp } from 'firebase/app';
import { getAuth, browserLocalPersistence, setPersistence, type Auth } from 'firebase/auth';
import { getFirestore, type Firestore } from 'firebase/firestore';
import { getFirebaseConfig } from './firebaseConfig';

let firebaseApp: FirebaseApp | null = null;
let authInstance: Auth | null = null;
let firestoreInstance: Firestore | null = null;

const firebaseConfig = getFirebaseConfig();

if (firebaseConfig) {
  firebaseApp = getApps().length ? getApps()[0] : initializeApp(firebaseConfig);
  authInstance = getAuth(firebaseApp);
  setPersistence(authInstance, browserLocalPersistence).catch(() => {
    // Se a persistência local não estiver disponível, mantém a configuração padrão.
  });
  firestoreInstance = getFirestore(firebaseApp);
}

export { firebaseApp, authInstance, firestoreInstance };