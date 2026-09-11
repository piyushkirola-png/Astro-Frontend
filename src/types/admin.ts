export interface DayPoint {
  date: string;
  value: number;
}

export interface AdminStats {
  totalUsers: number;
  totalRevenue: number;
  activeSessions: number;
  revenueByDay: DayPoint[];
  aiUsageByDay: DayPoint[];
}