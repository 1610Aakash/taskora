export async function resetPasswordRequest({ token, password }) {
  await new Promise((r) => setTimeout(r, 900));
  if (!token) throw new Error("Invalid or expired reset link.");
  return { message: "Password reset successful." };
}