import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';
import AuthService from './AuthService';
import { getUserProfile, isProfileComplete, mapProfileToUser } from '../../firebase/firebaseProfile';
import type { User } from '../../types/user';
import type { UserProfile } from '../../firebase/firebaseProfile';

interface AuthState {
  user: User | null;
  loading: boolean;
  profile: UserProfile | null;
  profileComplete: boolean;
}

interface AuthContextValue extends AuthState {
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string) => Promise<void>;
  loginWithGoogle: () => Promise<void>;
  logout: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  refreshProfile: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [profileComplete, setProfileComplete] = useState(false);

  const loadProfile = async (uid: string, firebaseUser: User | null) => {
    const profileData = await getUserProfile(uid);
    setProfile(profileData);
    setProfileComplete(isProfileComplete(profileData));
    if (profileData) {
      setUser(mapProfileToUser(profileData));
    } else if (firebaseUser) {
      setUser(firebaseUser);
    }
  };

  useEffect(() => {
    const unsubscribe = AuthService.onAuthStateChanged(async (nextUser) => {
      setLoading(true);
      if (!nextUser) {
        setUser(null);
        setProfile(null);
        setProfileComplete(false);
        setLoading(false);
        return;
      }

      await loadProfile(nextUser.uid, nextUser);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const login = async (email: string, password: string) => {
    await AuthService.login(email, password);
  };

  const register = async (email: string, password: string) => {
    await AuthService.register(email, password);
  };

  const loginWithGoogle = async () => {
    await AuthService.loginWithGoogle();
  };

  const logout = async () => {
    await AuthService.logout();
  };

  const resetPassword = async (email: string) => {
    await AuthService.resetPassword(email);
  };

  const refreshProfile = async () => {
    if (!user) return;
    setLoading(true);
    await loadProfile(user.uid, user);
    setLoading(false);
  };

  const value = useMemo(
    () => ({ user, loading, profile, profileComplete, login, register, loginWithGoogle, logout, resetPassword, refreshProfile }),
    [user, loading, profile, profileComplete]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
}
