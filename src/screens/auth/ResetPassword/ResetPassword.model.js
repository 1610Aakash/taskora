import { apiPost } from "@/lib/api/client";

export async function resetPasswordRequest({ token, password }) {
  return apiPost("/auth/reset-password", { token, password });
}
