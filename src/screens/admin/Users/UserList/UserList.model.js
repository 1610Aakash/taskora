import { mockUsers } from "@/lib/mock/mockData";

export async function getUsersRequest() {
  await new Promise((r) => setTimeout(r, 700));
  return [...mockUsers];
}
