import { apiGet, apiPatch } from "@/lib/api/client";
import { normalizeUser } from "@/lib/utils/normalize";

export async function getUserRequest(userId) {
  const data = await apiGet(`/users/${userId}`);
  return normalizeUser(data.user);
}

export async function toggleUserStatusRequest(userId, currentStatus) {
  const nextStatus = currentStatus === "active" ? "inactive" : "active";
  const data = await apiPatch(`/users/${userId}`, { status: nextStatus });
  return normalizeUser(data.user);
}
