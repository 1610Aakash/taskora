import { apiPost } from "@/lib/api/client";

export async function loginRequest({ email, password }) {
  return apiPost("/auth/login", { email, password }); // { user: { id, fullName, email, role } }
}
