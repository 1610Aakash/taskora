// Stubbed until backend/JWT is wired up.
export async function loginRequest({ email, password }) {
  await new Promise((r) => setTimeout(r, 900));

  if (email === "fail@test.com") {
    throw new Error("Invalid email or password.");
  }

  return {
    token: "mock-jwt-token",
    user: { email, role: email.includes("admin") ? "admin" : "user" },
  };
}