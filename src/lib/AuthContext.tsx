import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';
import type { AuthResponse, AuthUser } from '../types/auth';
import {
  clearSession,
  getStoredUser,
  getToken,
  setStoredUser,
  setToken,
} from './token-storage';

interface AuthContextValue {
  user: AuthUser | null;
  isAuthenticated: boolean;
  isLoading: boolean;

  // Global toast
  toast: string | null;
  showToast: (message: string) => void;
  dismissToast: () => void;

  setSession: (auth: AuthResponse) => void;
  clearUser: () => void;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [toast, setToast] = useState<string | null>(null);

  // Hydrate on mount
  useEffect(() => {
    const token = getToken();
    const storedUser = getStoredUser();
    if (token && storedUser) setUser(storedUser);
    setIsLoading(false);
  }, []);

  // Listen for 401 events
  useEffect(() => {
    const onUnauthorized = () => {
      clearSession();
      setUser(null);
    };
    window.addEventListener('auth:unauthorized', onUnauthorized);
    return () =>
      window.removeEventListener('auth:unauthorized', onUnauthorized);
  }, []);

  // Auto-dismiss toast after 1s
  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(null), 1000);
    return () => clearTimeout(t);
  }, [toast]);

  const showToast = useCallback((message: string) => {
    setToast(message);
  }, []);

  const dismissToast = useCallback(() => setToast(null), []);

  const setSession = useCallback((auth: AuthResponse) => {
    const authUser: AuthUser = {
      userId: auth.userId,
      name: auth.name,
      email: auth.email,
      role: auth.role,
    };
    setToken(auth.token, auth.role);
    setStoredUser(authUser);
    setUser(authUser);
  }, []);

  const clearUser = useCallback(() => {
    clearSession();
    setUser(null);
  }, []);

  const value = useMemo<AuthContextValue>(
    () => ({
      user,
      isAuthenticated: !!user,
      isLoading,
      toast,
      showToast,
      dismissToast,
      setSession,
      clearUser,
    }),
    [user, isLoading, toast, showToast, dismissToast, setSession, clearUser]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}