export async function signupRequest({ fullName, email, password }) {
  await new Promise((r) => setTimeout(r, 900));

  if (email === "taken@test.com") {
    throw new Error("An account with this email already exists.");
  }

  return { message: "Account created.", email };
}