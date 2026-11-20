import type { AuthUser, UserRole } from "../types/auth";

const TOKEN_KEYS = {
  ADMIN: "admin_access_token",
  USER: "user_access_token",
} as const;

const USER_KEY = "auth_user";

export function setToken(token: string, role: UserRole): void {
  clearTokens();
  localStorage.setItem(TOKEN_KEYS[role], token);
}

export function getToken(): string | null {
  return (
    localStorage.getItem(TOKEN_KEYS.ADMIN) ||
    localStorage.getItem(TOKEN_KEYS.USER) ||
    null
  );
}

export function getTokenForRole(role: UserRole): string | null {
  return localStorage.getItem(TOKEN_KEYS[role]);
}

export function clearTokens(): void {
  localStorage.removeItem(TOKEN_KEYS.ADMIN);
  localStorage.removeItem(TOKEN_KEYS.USER);
}

export function setStoredUser(user: AuthUser): void {
  localStorage.setItem(USER_KEY, JSON.stringify(user));
}

export function getStoredUser(): AuthUser | null {
  const raw = localStorage.getItem(USER_KEY);
  if (!raw) return null;
  try {
    return JSON.parse(raw) as AuthUser;
  } catch {
    return null;
  }
}

export function clearStoredUser(): void {
  localStorage.removeItem(USER_KEY);
}

export function clearSession(): void {
  clearTokens();
  clearStoredUser();
}
