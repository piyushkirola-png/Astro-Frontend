import { useQuery } from "@tanstack/react-query";
import apiClient from "../../lib/api-client";
import type { ApiResponse, UserResponse } from "../../types/auth";

// ============================================================
// useGetUser — fetch a user by id (protected)
// ============================================================
export function useGetUser(userId?: number) {
  return useQuery({
    queryKey: ["user", userId],
    queryFn: async () => {
      const res = await apiClient.get<ApiResponse<UserResponse>>(
        `/users/${userId}`,
      );
      return res.data.data;
    },
    enabled: !!userId,
  });
}
