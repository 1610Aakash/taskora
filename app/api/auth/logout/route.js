import { clearAuthCookie } from "@/lib/auth/cookies";
import { success } from "@/lib/utils/apiResponse";

export async function POST() {
  await clearAuthCookie();
  return success({ message: "Logged out." });
}
