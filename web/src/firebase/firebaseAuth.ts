import {
  Auth,
  GoogleAuthProvider,
  User as FirebaseUser,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  sendPasswordResetEmail,
  signOut,
  onAuthStateChanged
} from 'firebase/auth';
import { authInstance } from './firebaseApp';
import type { User } from '../types/user';

const provider = new GoogleAuthProvider();

function mapFirebaseUser(user: FirebaseUser | null): User | null {
  if (!user) return null;
  return {
    uid: user.uid,
    email: user.email ?? '',
    name: user.displayName ?? '',
    companyId: '',
    companyName: ''
  };
}

async function login(email: string, password: string) {
  if (!authInstance) {
    throw new Error('Firebase não está configurado. Verifique as variáveis de ambiente.');
  }
  await signInWithEmailAndPassword(authInstance, email, password);
}

async function register(email: string, password: string) {
  if (!authInstance) {
    throw new Error('Firebase não está configurado. Verifique as variáveis de ambiente.');
  }
  await createUserWithEmailAndPassword(authInstance, email, password);
}

async function loginWithGoogle() {
  if (!authInstance) {
    throw new Error('Firebase não está configurado. Verifique as variáveis de ambiente.');
  }
  await signInWithPopup(authInstance, provider);
}

async function resetPassword(email: string) {
  if (!authInstance) {
    throw new Error('Firebase não está configurado. Verifique as variáveis de ambiente.');
  }
  await sendPasswordResetEmail(authInstance, email);
}

async function logout() {
  if (!authInstance) return;
  await signOut(authInstance);
}

function onAuthStateChangedListener(callback: (user: User | null) => void) {
  if (!authInstance) {
    callback(null);
    return () => {};
  }
  return onAuthStateChanged(authInstance, (firebaseUser) => callback(mapFirebaseUser(firebaseUser)));
}

export default {
  login,
  register,
  loginWithGoogle,
  resetPassword,
  logout,
  onAuthStateChanged: onAuthStateChangedListener
};
