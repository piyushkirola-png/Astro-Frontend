import { useQuery } from "@tanstack/react-query";
import apiClient from "../../lib/api-client";
import type { ApiResponse } from "../../types/auth";
import type { UserProfile } from "../../types/user";
import type { AdminStats } from "../../types/admin";

export function useAdminUsers() {
  return useQuery({
    queryKey: ["admin", "users"],
    queryFn: async (): Promise<UserProfile[]> => {
      const res = await apiClient.get<ApiResponse<UserProfile[]>>("/users");
      return res.data.data;
    },
    staleTime: 30 * 1000,
  });
}

export function useAdminStats() {
  return useQuery({
    queryKey: ["admin", "stats"],
    queryFn: async (): Promise<AdminStats> => {
      const res = await apiClient.get<ApiResponse<AdminStats>>("/admin/stats");
      return res.data.data;
    },
    refetchInterval: 30 * 1000,
    refetchOnWindowFocus: true,
    staleTime: 10 * 1000,
  });
}
