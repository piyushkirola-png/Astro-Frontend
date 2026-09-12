import apiClient from '../../lib/api-client';
import type { ApiResponse } from '../../types/auth';
import type { UserProfile } from '../../types/user';
import type {
  AdminPaymentRecord,
  AdminWalletPackage,
} from '../../types/admin';

export const adminService = {
  setUserStatus: async (
    id: number,
    active: boolean
  ): Promise<UserProfile> => {
    const res = await apiClient.patch<ApiResponse<UserProfile>>(
      `/users/${id}/status`,
      { active }
    );
    return res.data.data;
  },

  deleteUser: async (id: number): Promise<void> => {
    await apiClient.delete(`/users/${id}`);
  },

  listWalletPackages: async (): Promise<AdminWalletPackage[]> => {
    const res = await apiClient.get<ApiResponse<AdminWalletPackage[]>>(
      '/admin/payments/wallet/packages'
    );
    return res.data.data;
  },

  updatePackagePrice: async (
    id: number,
    amount: number
  ): Promise<AdminWalletPackage> => {
    const res = await apiClient.patch<ApiResponse<AdminWalletPackage>>(
      `/admin/payments/wallet/packages/${id}/price`,
      { amount }
    );
    return res.data.data;
  },

  togglePackageActive: async (
    id: number,
    active: boolean
  ): Promise<AdminWalletPackage> => {
    const res = await apiClient.patch<ApiResponse<AdminWalletPackage>>(
      `/admin/payments/wallet/packages/${id}/toggle`,
      { active }
    );
    return res.data.data;
  },

  listAllPayments: async (): Promise<AdminPaymentRecord[]> => {
    const res = await apiClient.get<ApiResponse<AdminPaymentRecord[]>>(
      '/admin/payments/all'
    );
    return res.data.data;
  },
};

export default adminService;