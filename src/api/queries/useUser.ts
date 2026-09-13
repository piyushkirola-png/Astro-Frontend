import { useQuery } from "@tanstack/react-query";
import userService from "../services/userService";

export function useGetMe(options?: { enabled?: boolean }) {
  return useQuery({
    queryKey: ["me"],
    queryFn: () => userService.getMe(),
    staleTime: 60 * 1000,
    enabled: options?.enabled ?? true,
  });
}
