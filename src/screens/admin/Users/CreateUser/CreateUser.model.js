import { apiPost } from "@/lib/api/client";
import { normalizeUser } from "@/lib/utils/normalize";

export async function createUserRequest({ fullName, email, password }) {
  const data = await apiPost("/users", { fullName, email, password });
  return normalizeUser(data.user);
}
