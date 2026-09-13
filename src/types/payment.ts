export interface WalletPackage {
  id: number;
  amount: number;
  secondsCredited: number;
  label: string;
  displayOrder: number;
  isActive: boolean;
}

export interface WalletBalance {
  seconds: number;
  minutes: number;
  remainingSeconds: number;
  formatted: string;
  valueRupees: number;
}

export interface PaymentCategory {
  id: number;
  code: string;
  name: string;
  amount: number;
  description: string | null;
  isActive: boolean;
}

export interface PaymentInitiateResponse {
  paymentId: number;
  gatewayOrderId: string;
  paymentLink: string;
  gateway: string;
  amount: number;
  status: string;
}

export interface PaymentRecord {
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

export interface InitiateReportRequest {
  gateway: string;
  notes?: string;
}

export interface InitiateWalletRequest {
  packageId: number;
  gateway: string;
}

export interface HasPurchasedResponse {
  purchased: boolean;
}
