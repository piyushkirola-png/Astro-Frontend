import { useMutation, useQueryClient } from "@tanstack/react-query";
import chatService from "../services/chatService";
import type { SendMessageRequest } from "../../types/chat";

export function useCreateSession() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: () => chatService.createSession(),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["chat", "sessions"] });
    },
  });
}

export function useSendMessage(sessionId: number) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: SendMessageRequest) =>
      chatService.sendMessage(sessionId, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["chat", "session", sessionId],
      });
      queryClient.invalidateQueries({ queryKey: ["chat", "sessions"] });
    },
  });
}

export function useDeleteSession() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (sessionId: number) => chatService.deleteSession(sessionId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["chat", "sessions"] });
    },
  });
}

// ============================================================
// useRenameSession — PATCH /chat/sessions/{id}
// ============================================================
export function useRenameSession() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, title }: { id: number; title: string }) =>
      chatService.renameSession(id, title),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["chat", "sessions"] });
    },
  });
}
