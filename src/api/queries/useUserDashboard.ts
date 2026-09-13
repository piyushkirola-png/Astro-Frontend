import { useQuery } from "@tanstack/react-query";
import apiClient from "../../lib/api-client";
import type { ApiResponse } from "../../types/auth";
import type { DailyReading } from "../../types/dashboard";

export function useDailyReading() {
  return useQuery({
    queryKey: ["user", "dashboard", "daily"],
    queryFn: async (): Promise<DailyReading> => {
      const res = await apiClient.get<ApiResponse<DailyReading>>(
        "/user/dashboard/daily",
      );
      return res.data.data;
    },
    staleTime: 5 * 60 * 1000,
  });
}
