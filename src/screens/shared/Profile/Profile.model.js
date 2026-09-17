export async function getProfileRequest() {
  await new Promise((r) => setTimeout(r, 700));

  // Stub — replace with a real GET /me call once backend exists.
  return {
    fullName: "Aakash Sharma",
    email: "aakash@example.com",
    role: "admin",
    phone: "+91 98765 43210",
    avatarUrl: "",
    joinedAt: "2025-08-01",
  };
}