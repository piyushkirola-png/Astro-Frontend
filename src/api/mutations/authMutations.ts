import { useMutation, useQueryClient } from '@tanstack/react-query';
import authService from '../services/authService';
import type { LoginRequest, RegisterRequest } from '../../types/auth';

// ============================================================
// useLogin
// ============================================================
export function useLogin() {
  return useMutation({
    mutationFn: (payload: LoginRequest) => authService.login(payload),
  });
}

// ============================================================
// useRegister
// ============================================================
export function useRegister() {
  return useMutation({
    mutationFn: (payload: RegisterRequest) => authService.register(payload),
  });
}

// ============================================================
// useLogout
// ============================================================
export function useLogout() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: () => authService.logout(),
    onSettled: () => {
      // Always clear cache — even if backend call failed
      queryClient.clear();
    },
  });
}