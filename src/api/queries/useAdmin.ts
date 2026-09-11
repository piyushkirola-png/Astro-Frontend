import { useQuery } from '@tanstack/react-query';
import apiClient from '../../lib/api-client';
import type { ApiResponse } from '../../types/auth';
import type { UserProfile } from '../../types/user';
import type { AdminStats } from '../../types/admin';

// useAdminUsers — GET /api/users (admin only)
export function useAdminUsers() {
  return useQuery({
    queryKey: ['admin', 'users'],
    queryFn: async (): Promise<UserProfile[]> => {
      const res = await apiClient.get<ApiResponse<UserProfile[]>>('/users');
      return res.data.data;
    },
    staleTime: 30 * 1000,
  });
}

// useAdminStats — GET /api/admin/stats (admin only)
export function useAdminStats() {
  return useQuery({
    queryKey: ['admin', 'stats'],
    queryFn: async (): Promise<AdminStats> => {
      const res = await apiClient.get<ApiResponse<AdminStats>>('/admin/stats');
      return res.data.data;
    },
    staleTime: 60 * 1000,
  });
}