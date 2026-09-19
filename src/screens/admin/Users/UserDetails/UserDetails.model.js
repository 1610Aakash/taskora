import { mockUsers } from "@/lib/mock/mockData";

export async function getUserRequest(userId) {
  await new Promise((r) => setTimeout(r, 700));
  const user = mockUsers.find((u) => u.id === userId);
  if (!user) throw new Error("User not found.");
  return user;
}

export async function toggleUserStatusRequest(userId) {
  await new Promise((r) => setTimeout(r, 600));
  const user = mockUsers.find((u) => u.id === userId);
  if (!user) throw new Error("User not found.");
  user.status = user.status === "active" ? "inactive" : "active";
  return user;
}