export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

export type UserRole = 'ADMIN' | 'USER';

export interface AuthUser {
  userId: number;
  name: string;
  email: string;
  role: UserRole;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  name: string;
  email: string;
  password: string;
  dateOfBirth?: string;
}

export interface AuthResponse {
  token: string;
  type: string;
  userId: number;
  name: string;
  email: string;
  role: UserRole;
  message: string;
}

export interface UserResponse {
  id: number;
  name: string;
  email: string;
  role: UserRole;
  zodiacSign?: string | null;
  createdAt?: string;
}