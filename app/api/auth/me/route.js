import { requireAuth } from "@/lib/auth/requireAuth";
import { success, error } from "@/lib/utils/apiResponse";

export async function GET() {
  const { user, error: authError, status } = await requireAuth();
  if (authError) return error(authError, status);
  return success({ user });
}
