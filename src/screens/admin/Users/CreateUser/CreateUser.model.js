import { mockUsers } from "@/lib/mock/mockData";

export async function createUserRequest({ fullName, email }) {
  await new Promise((r) => setTimeout(r, 900));

  if (mockUsers.some((u) => u.email === email)) {
    throw new Error("A user with this email already exists.");
  }

  const newUser = {
    id: `u${mockUsers.length + 1}`,
    fullName,
    email,
    role: "user",
    status: "active",
    joinedAt: new Date().toISOString().slice(0, 10),
  };
  mockUsers.push(newUser);
  return newUser;
}
