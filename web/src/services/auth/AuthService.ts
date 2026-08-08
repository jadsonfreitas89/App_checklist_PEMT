import { GoogleAuthProvider, createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup, sendPasswordResetEmail, signOut, onAuthStateChanged, type User as FirebaseUser } from 'firebase/auth';
import { authInstance } from '../../firebase/firebaseApp';
import type { User } from '../../types/user';

const googleProvider = new GoogleAuthProvider();

function mapUser(user: FirebaseUser | null): User | null {
  if (!user) return null;
  return {
    uid: user.uid,
    email: user.email ?? '',
    name: user.displayName ?? '',
    companyId: '',
    companyName: ''
  };
}

const AuthService = {
  async login(email: string, password: string) {
    if (!authInstance) {
      throw new Error('Firebase Auth não está configurado. Verifique as variáveis de ambiente.');
    }
    await signInWithEmailAndPassword(authInstance, email, password);
  },

  async register(email: string, password: string) {
    if (!authInstance) {
      throw new Error('Firebase Auth não está configurado. Verifique as variáveis de ambiente.');
    }
    await createUserWithEmailAndPassword(authInstance, email, password);
  },

  async loginWithGoogle() {
    if (!authInstance) {
      throw new Error('Firebase Auth não está configurado. Verifique as variáveis de ambiente.');
    }
    await signInWithPopup(authInstance, googleProvider);
  },

  async resetPassword(email: string) {
    if (!authInstance) {
      throw new Error('Firebase Auth não está configurado. Verifique as variáveis de ambiente.');
    }
    await sendPasswordResetEmail(authInstance, email);
  },

  async logout() {
    if (!authInstance) return;
    await signOut(authInstance);
  },

  onAuthStateChanged(callback: (user: User | null) => void) {
    if (!authInstance) {
      callback(null);
      return () => {};
    }
    return onAuthStateChanged(authInstance, (firebaseUser) => callback(mapUser(firebaseUser)));
  }
};

export default AuthService;
