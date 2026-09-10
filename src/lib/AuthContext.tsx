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
  setSession: (auth: AuthResponse) => void;
  clearUser: () => void;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Hydrate on mount
  useEffect(() => {
    const token = getToken();
    const storedUser = getStoredUser();
    if (token && storedUser) {
      setUser(storedUser);
    } else {
      setUser(null);
    }
    setIsLoading(false);
  }, []);

  // Listen for 401 events from api-client
  useEffect(() => {
    const handleUnauthorized = () => {
      clearSession();
      setUser(null);
    };
    window.addEventListener('auth:unauthorized', handleUnauthorized);
    return () =>
      window.removeEventListener('auth:unauthorized', handleUnauthorized);
  }, []);

  // Save a full session (called after login/register)
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

  // Clear session (logout)
  const clearUser = useCallback(() => {
    clearSession();
    setUser(null);
  }, []);

  const value = useMemo<AuthContextValue>(
    () => ({
      user,
      isAuthenticated: !!user,
      isLoading,
      setSession,
      clearUser,
    }),
    [user, isLoading, setSession, clearUser]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}