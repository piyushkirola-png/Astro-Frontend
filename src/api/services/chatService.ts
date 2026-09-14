import apiClient from "../../lib/api-client";
import type { ApiResponse } from "../../types/auth";
import type {
  ChatMessage,
  ChatSessionDetail,
  ChatSessionSummary,
  HeartbeatResponse,
  SendMessageRequest,
} from "../../types/chat";

export const chatService = {
  createSession: async (): Promise<ChatSessionDetail> => {
    const res =
      await apiClient.post<ApiResponse<ChatSessionDetail>>("/chat/sessions");
    return res.data.data;
  },

  listSessions: async (): Promise<ChatSessionSummary[]> => {
    const res =
      await apiClient.get<ApiResponse<ChatSessionSummary[]>>("/chat/sessions");
    return res.data.data;
  },

  getSession: async (id: number): Promise<ChatSessionDetail> => {
    const res = await apiClient.get<ApiResponse<ChatSessionDetail>>(
      `/chat/sessions/${id}`,
    );
    return res.data.data;
  },

  sendMessage: async (
    sessionId: number,
    payload: SendMessageRequest,
  ): Promise<ChatMessage> => {
    const res = await apiClient.post<ApiResponse<ChatMessage>>(
      `/chat/sessions/${sessionId}/messages`,
      payload,
    );
    return res.data.data;
  },

  deleteSession: async (id: number): Promise<void> => {
    await apiClient.delete(`/chat/sessions/${id}`);
  },

  renameSession: async (id: number, title: string): Promise<void> => {
    await apiClient.patch(`/chat/sessions/${id}`, { title });
  },

  togglePin: async (id: number): Promise<void> => {
    await apiClient.patch(`/chat/sessions/${id}/pin`);
  },

  bulkDelete: async (ids: number[]): Promise<void> => {
    await apiClient.post(`/chat/sessions/bulk-delete`, { ids });
  },

  bulkPin: async (ids: number[], pinned: boolean): Promise<void> => {
    await apiClient.post(`/chat/sessions/bulk-pin`, { ids, pinned });
  },

  heartbeat: async (
    seconds: number = 10,
    sessionId?: number | null,
  ): Promise<HeartbeatResponse> => {
    const res = await apiClient.post<ApiResponse<HeartbeatResponse>>(
      "/chat/heartbeat",
      { seconds, sessionId: sessionId ?? null },
    );
    return res.data.data;
  },
};

export default chatService;
