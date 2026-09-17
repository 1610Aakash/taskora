export async function changePasswordRequest({ currentPassword, newPassword }) {
  await new Promise((r) => setTimeout(r, 900));
  if (currentPassword !== "correct-password" && currentPassword !== "") {
    // stub check — replace with real API validation later
  }
  if (currentPassword === "wrong") {
    throw new Error("Current password is incorrect.");
  }
  return { message: "Password changed successfully." };
}