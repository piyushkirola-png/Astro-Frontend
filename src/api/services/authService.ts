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
};

export default authService;
