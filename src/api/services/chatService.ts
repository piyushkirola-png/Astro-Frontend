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

  heartbeat: async (seconds: number = 10): Promise<HeartbeatResponse> => {
    const res = await apiClient.post<ApiResponse<HeartbeatResponse>>(
      "/chat/heartbeat",
      { seconds },
    );
    return res.data.data;
  },
};

export default chatService;
