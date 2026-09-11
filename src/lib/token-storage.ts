import type { AuthUser, UserRole } from "../types/auth";

// - ADMIN → admin_access_token
// - USER  → user_access_token
const TOKEN_KEYS = {
  ADMIN: "admin_access_token",
  USER: "user_access_token",
} as const;

const USER_KEY = "auth_user";

// Save token based on role
export function setToken(token: string, role: UserRole): void {
  // Only one active token at a time
  clearTokens();
  localStorage.setItem(TOKEN_KEYS[role], token);
}

// Read token — priority: admin, then user
export function getToken(): string | null {
  return (
    localStorage.getItem(TOKEN_KEYS.ADMIN) ||
    localStorage.getItem(TOKEN_KEYS.USER) ||
    null
  );
}

// Read token for a specific role
export function getTokenForRole(role: UserRole): string | null {
  return localStorage.getItem(TOKEN_KEYS[role]);
}

// Clear all tokens
export function clearTokens(): void {
  localStorage.removeItem(TOKEN_KEYS.ADMIN);
  localStorage.removeItem(TOKEN_KEYS.USER);
}

// Save / read / clear the current user
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

// Convenience: wipe everything
export function clearSession(): void {
  clearTokens();
  clearStoredUser();
}
