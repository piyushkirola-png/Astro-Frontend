import apiClient from '../../lib/api-client';
import type { ApiResponse } from '../../types/auth';
import type { UserProfile } from '../../types/user';

export const adminService = {
  // PATCH /api/users/{id}/status
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

  // DELETE /api/users/{id}
  deleteUser: async (id: number): Promise<void> => {
    await apiClient.delete(`/users/${id}`);
  },
};

export default adminService;