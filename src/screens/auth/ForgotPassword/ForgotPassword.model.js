import { apiPost } from "@/lib/api/client";

export async function forgotPasswordRequest({ email }) {
  return apiPost("/auth/forgot-password", { email });
}
