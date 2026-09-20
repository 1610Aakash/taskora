import { apiGet } from "@/lib/api/client";
import { normalizeUser } from "@/lib/utils/normalize";

export async function getUsersRequest({ status, search } = {}) {
  const params = new URLSearchParams();
  if (status && status !== "all") params.set("status", status);
  if (search) params.set("search", search);

  const query = params.toString() ? `?${params.toString()}` : "";
  const data = await apiGet(`/users${query}`);
  return data.users.map(normalizeUser);
}