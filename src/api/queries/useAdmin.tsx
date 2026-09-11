import { useQuery } from '@tanstack/react-query';
import apiClient from '../../lib/api-client';
import type { ApiResponse } from '../../types/auth';
import type { UserProfile } from '../../types/user';

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