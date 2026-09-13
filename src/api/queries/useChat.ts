import { useQuery } from "@tanstack/react-query";
import chatService from "../services/chatService";

export function useChatSessions() {
  return useQuery({
    queryKey: ["chat", "sessions"],
    queryFn: () => chatService.listSessions(),
    staleTime: 30 * 1000,
  });
}

export function useChatSession(sessionId: number | null) {
  return useQuery({
    queryKey: ["chat", "session", sessionId],
    queryFn: () => chatService.getSession(sessionId as number),
    enabled: !!sessionId,
    staleTime: 10 * 1000,
  });
}
