import apiClient from "../../lib/api-client";
import type {
  ApiResponse,
  AuthResponse,
  LoginRequest,
  RegisterRequest,
} from "../../types/auth";

export const authService = {
  // POST /api/auth/login
  login: async (payload: LoginRequest): Promise<AuthResponse> => {
    const res = await apiClient.post<ApiResponse<AuthResponse>>(
      "/auth/login",
      payload,
    );
    return res.data.data;
  },

  // POST /api/auth/register
  register: async (payload: RegisterRequest): Promise<AuthResponse> => {
    const res = await apiClient.post<ApiResponse<AuthResponse>>(
      "/auth/register",
      payload,
    );
    return res.data.data;
  },

  // POST /api/auth/logout
  logout: async (): Promise<void> => {
    await apiClient.post("/auth/logout");
  },

  sendLoginOtp: async (email: string): Promise<{ message: string }> => {
    const res = await apiClient.post<ApiResponse<{ message: string }>>(
      "/auth/otp/send-login",
      { email },
    );
    return res.data.data;
  },

  verifyLoginOtp: async (
    email: string,
    code: string,
  ): Promise<AuthResponse> => {
    const res = await apiClient.post<ApiResponse<AuthResponse>>(
      "/auth/otp/verify-login",
      { email, code },
    );
    return res.data.data;
  },

  sendResetOtp: async (email: string): Promise<{ message: string }> => {
    const res = await apiClient.post<ApiResponse<{ message: string }>>(
      "/auth/otp/send-reset",
      { email },
    );
    return res.data.data;
  },

  verifyResetOtp: async (
    email: string,
    code: string,
  ): Promise<{ resetToken: string; email: string }> => {
    const res = await apiClient.post<
      ApiResponse<{ resetToken: string; email: string }>
    >("/auth/otp/verify-reset", { email, code });
    return res.data.data;
  },

  resetPassword: async (
    resetToken: string,
    newPassword: string,
  ): Promise<void> => {
    await apiClient.post("/auth/password/reset", {
      resetToken,
      newPassword,
    });
  },
};

export default authService;
