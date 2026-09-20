import { apiGet, apiPatch } from "@/lib/api/client";
import { normalizeUser } from "@/lib/utils/normalize";

export async function getProfileRequest() {
  const data = await apiGet("/profile");
  return normalizeUser(data.user);
}

export async function updateProfileRequest({ fullName, phone, avatarUrl }) {
  const data = await apiPatch("/profile", { fullName, phone, avatarUrl });
  return normalizeUser(data.user);
}
