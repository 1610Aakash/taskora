import { apiGet, apiPatch } from "@/lib/api/client";
import { normalizeUser } from "@/lib/utils/normalize";

export async function getUserRequest(userId) {
  const data = await apiGet(`/users/${userId}`);
  return normalizeUser(data.user);
}

export async function updateUserRequest(userId, { fullName, email }) {
  const data = await apiPatch(`/users/${userId}`, { fullName, email });
  return normalizeUser(data.user);
}
