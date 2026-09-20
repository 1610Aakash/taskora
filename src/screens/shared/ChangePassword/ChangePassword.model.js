import { apiPost } from "@/lib/api/client";

export async function changePasswordRequest({ currentPassword, newPassword }) {
  return apiPost("/profile/change-password", { currentPassword, newPassword });
}
