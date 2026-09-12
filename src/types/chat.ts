export type ChatRole = 'USER' | 'ASSISTANT' | 'SYSTEM';

export interface ChatMessage {
  id: number;
  role: ChatRole;
  content: string;
  createdAt: string;
}

export interface ChatSessionSummary {
  id: number;
  title: string;
  createdAt: string;
  updatedAt: string;
  lastMessagePreview: string;
}

export interface ChatSessionDetail {
  id: number;
  title: string;
  createdAt: string;
  updatedAt: string;
  messages: ChatMessage[];
  chatSecondsBalance: number;
}

export interface SendMessageRequest {
  content: string;
}

export interface HeartbeatResponse {
  chatSecondsBalance: number;
}