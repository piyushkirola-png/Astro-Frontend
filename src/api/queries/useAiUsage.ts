import { useQuery } from "@tanstack/react-query";
import apiClient from "../../lib/api-client";
import type { ApiResponse } from "../../types/auth";
import type { AiUsageLog } from "../../types/aiUsage";

export function useAiUsage() {
  return useQuery({
    queryKey: ["user", "ai-usage"],
    queryFn: async (): Promise<AiUsageLog[]> => {
      const res =
        await apiClient.get<ApiResponse<AiUsageLog[]>>("/user/ai-usage");
      return res.data.data;
    },
    staleTime: 30 * 1000,
  });
}
