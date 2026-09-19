import { mockUsers } from "@/lib/mock/mockData";

export async function getUserRequest(userId) {
  await new Promise((r) => setTimeout(r, 700));
  const user = mockUsers.find((u) => u.id === userId);
  if (!user) throw new Error("User not found.");
  return user;
}

export async function updateUserRequest(userId, data) {
  await new Promise((r) => setTimeout(r, 900));
  const user = mockUsers.find((u) => u.id === userId);
  if (!user) throw new Error("User not found.");
  Object.assign(user, data);
  return user;
}