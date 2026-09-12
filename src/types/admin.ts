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

export interface AdminWalletPackage {
  id: number;
  amount: number;
  secondsCredited: number;
  label: string;
  displayOrder: number;
  isActive: boolean;
}

export interface AdminPaymentRecord {
  id: number;
  categoryCode: string | null;
  packageId: number | null;
  amount: number;
  currency: string;
  status: string;
  gateway: string;
  gatewayOrderId: string;
  gatewayPaymentId: string | null;
  paymentLink: string | null;
  utr: string | null;
  secondsCredited: number | null;
  notes: string | null;
  completedAt: string | null;
  createdAt: string;
}