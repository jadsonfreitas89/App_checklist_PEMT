import { doc, getDoc, setDoc, collection, getDocs } from 'firebase/firestore';
import { firestoreInstance } from './firebaseApp';
import type { User } from '../types/user';

const USERS_COLLECTION = 'usuarios';

export interface UserProfile {
  uid: string;
  nome: string;
  email: string;
  telefone?: string;
  cpf?: string | null;
  cargo?: string;
  perfil?: string;
  fotoPerfil?: string | null;
  crea?: string | null;
  ativo?: boolean;
  emailVerificado?: boolean;
  tipoLogin?: string;
  ultimoLogin?: number;
  criadoEm?: number;
  atualizadoEm?: number;
  deviceId?: string;
  versaoApp?: string;
  empresaId: string;
  empresaNome: string;
}

export function mapProfileToUser(profile: UserProfile): User {
  return {
    uid: profile.uid,
    email: profile.email,
    name: profile.nome || '',
    companyId: profile.empresaId,
    companyName: profile.empresaNome
  };
}

export function isProfileComplete(profile: UserProfile | null): boolean {
  if (!profile) return false;
  const companyId = profile.empresaId?.trim();
  return (
    Boolean(profile.nome?.trim()) &&
    Boolean(companyId) &&
    companyId !== 'GOOGLE_PENDING' &&
    companyId !== 'EMAIL_PENDING'
  );
}

export async function getUserProfile(uid: string): Promise<UserProfile | null> {
  if (!firestoreInstance) return null;
  const profileRef = doc(firestoreInstance, USERS_COLLECTION, uid);
  const snapshot = await getDoc(profileRef);
  return snapshot.exists() ? (snapshot.data() as UserProfile) : null;
}

export async function saveUserProfile(profile: UserProfile) {
  if (!firestoreInstance) {
    throw new Error('Firebase não está configurado. Verifique as variáveis de ambiente.');
  }
  const profileRef = doc(firestoreInstance, USERS_COLLECTION, profile.uid);
  await setDoc(profileRef, profile, { merge: true });
}

export async function getCompanies(): Promise<Array<{ id: string; name: string }>> {
  if (!firestoreInstance) return [];
  const empresasQuery = collection(firestoreInstance, 'empresas');
  const snapshot = await getDocs(empresasQuery);
  return snapshot.docs.map((doc) => ({ id: doc.id, name: String(doc.data().nome || '') }));
}
