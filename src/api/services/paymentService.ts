import apiClient from "../../lib/api-client";
import type { ApiResponse } from "../../types/auth";
import type {
  HasPurchasedResponse,
  InitiateReportRequest,
  InitiateWalletRequest,
  PaymentCategory,
  PaymentInitiateResponse,
  PaymentRecord,
  WalletBalance,
  WalletPackage,
} from "../../types/payment";

export const paymentService = {
  getWalletPackages: async (): Promise<WalletPackage[]> => {
    const res = await apiClient.get<ApiResponse<WalletPackage[]>>(
      "/payments/wallet/packages",
    );
    return res.data.data;
  },

  getReportCategory: async (): Promise<PaymentCategory> => {
    const res = await apiClient.get<ApiResponse<PaymentCategory>>(
      "/payments/report/category",
    );
    return res.data.data;
  },

  hasPurchasedReport: async (): Promise<HasPurchasedResponse> => {
    const res = await apiClient.get<ApiResponse<HasPurchasedResponse>>(
      "/payments/has-purchased/REPORT",
    );
    return res.data.data;
  },

  initiateReport: async (
    payload: InitiateReportRequest,
  ): Promise<PaymentInitiateResponse> => {
    const res = await apiClient.post<ApiResponse<PaymentInitiateResponse>>(
      "/payments/initiate/report",
      payload,
    );
    return res.data.data;
  },

  initiateWallet: async (
    payload: InitiateWalletRequest,
  ): Promise<PaymentInitiateResponse> => {
    const res = await apiClient.post<ApiResponse<PaymentInitiateResponse>>(
      "/payments/initiate/wallet",
      payload,
    );
    return res.data.data;
  },

  getWalletBalance: async (): Promise<WalletBalance> => {
    const res = await apiClient.get<ApiResponse<WalletBalance>>(
      "/payments/wallet/balance",
    );
    return res.data.data;
  },

  downloadInvoice: async (orderId: string): Promise<void> => {
    const res = await apiClient.get(`/payments/${orderId}/invoice`, {
      responseType: "blob",
    });

    const url = window.URL.createObjectURL(
      new Blob([res.data], { type: "application/pdf" }),
    );
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `${orderId}.pdf`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
  },

  getHistory: async (): Promise<PaymentRecord[]> => {
    const res =
      await apiClient.get<ApiResponse<PaymentRecord[]>>("/payments/history");
    return res.data.data;
  },
};

export default paymentService;
