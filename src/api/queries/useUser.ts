import { useQuery } from "@tanstack/react-query";
import userService from "../services/userService";

export function useGetMe() {
  return useQuery({
    queryKey: ["me"],
    queryFn: () => userService.getMe(),
    staleTime: 60 * 1000, // 1 minute
  });
}
