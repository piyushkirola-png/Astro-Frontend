export interface AiUsageLog {
  id: number;
  userId: number;
  sessionId: number;
  usageDate: string;
  messageCount: number;
  secondsUsed: number;
  rupeesDeducted: number;
  createdAt: string;
  updatedAt: string;
}
