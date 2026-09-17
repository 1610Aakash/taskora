export async function verifyEmailRequest(token) {
  await new Promise((r) => setTimeout(r, 1200));
  if (!token) throw new Error("Invalid or missing verification token.");
  return { message: "Email verified." };
}

export async function resendVerificationRequest(email) {
  await new Promise((r) => setTimeout(r, 900));
  return { message: `Verification email resent to ${email}` };
}