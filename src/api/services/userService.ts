import apiClient from "../../lib/api-client";
import type { ApiResponse } from "../../types/auth";
import type {
  PlaceSuggestion,
  UpdateProfileRequest,
  UserProfile,
} from "../../types/user";

const BACKEND_ROOT = (
  import.meta.env.VITE_API_BASE_URL || "http://localhost:8080/api"
).replace(/\/api\/?$/, "");

export const userService = {
  getMe: async (): Promise<UserProfile> => {
    const res = await apiClient.get<ApiResponse<UserProfile>>("/users/me");
    return res.data.data;
  },

  updateMe: async (payload: UpdateProfileRequest): Promise<UserProfile> => {
    const res = await apiClient.put<ApiResponse<UserProfile>>(
      "/users/me",
      payload,
    );
    return res.data.data;
  },

  uploadAvatar: async (file: File): Promise<UserProfile> => {
    const formData = new FormData();
    formData.append("file", file);

    const res = await apiClient.post<ApiResponse<UserProfile>>(
      "/users/me/avatar",
      formData,
      { headers: { "Content-Type": "multipart/form-data" } },
    );
    return res.data.data;
  },

  changePassword: async (
    currentPassword: string,
    newPassword: string,
  ): Promise<void> => {
    await apiClient.post("/users/me/password", {
      currentPassword,
      newPassword,
    });
  },

  searchPlaces: async (query: string): Promise<PlaceSuggestion[]> => {
    const res = await apiClient.get<ApiResponse<PlaceSuggestion[]>>(
      "/places/autocomplete",
      { params: { q: query, limit: 8 } },
    );
    return res.data.data;
  },

  absoluteAvatarUrl: (path: string | null | undefined): string | null => {
    if (!path) return null;
    if (path.startsWith("http")) return path;
    return `${BACKEND_ROOT}${path}`;
  },
};

export default userService;
