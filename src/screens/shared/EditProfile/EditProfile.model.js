export async function getProfileRequest() {
  await new Promise((r) => setTimeout(r, 700));
  return {
    fullName: "Aakash Sharma",
    email: "aakash@example.com",
    phone: "+91 98765 43210",
    avatarUrl: "",
  };
}

export async function updateProfileRequest(data) {
  await new Promise((r) => setTimeout(r, 900));
  return { message: "Profile updated.", data };
}