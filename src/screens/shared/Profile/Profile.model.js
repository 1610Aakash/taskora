import { apiGet } from "@/lib/api/client";
import { normalizeUser } from "@/lib/utils/normalize";

export async function getProfileRequest() {
  const data = await apiGet("/profile");
  return normalizeUser(data.user);
}
