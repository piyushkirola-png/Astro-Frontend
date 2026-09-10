import { useMutation, useQueryClient } from "@tanstack/react-query";
import userService from "../services/userService";
import type { UpdateProfileRequest } from "../../types/user";

export function useUpdateProfile() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: UpdateProfileRequest) =>
      userService.updateMe(payload),
    onSuccess: (data) => {
      // refresh cached "me"
      queryClient.setQueryData(["me"], data);
    },
  });
}

export function useUploadAvatar() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (file: File) => userService.uploadAvatar(file),
    onSuccess: (data) => {
      queryClient.setQueryData(["me"], data);
    },
  });
}
