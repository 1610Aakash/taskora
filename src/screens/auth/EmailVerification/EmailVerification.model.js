import { apiPost } from "@/lib/api/client";

export async function verifyEmailRequest(token) {
  return apiPost("/auth/verify-email", { token });
}

export async function resendVerificationRequest(email) {
  return apiPost("/auth/resend-verification", { email });
}
