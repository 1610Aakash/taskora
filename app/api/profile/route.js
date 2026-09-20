import connectDB from "@/lib/db/connectDB";
import { requireAuth } from "@/lib/auth/requireAuth";
import { success, error } from "@/lib/utils/apiResponse";

export async function GET() {
  const {
    user,
    error: authError,
    status,
  } = await requireAuth(["admin", "user"]);
  if (authError) return error(authError, status);
  return success({ user });
}

export async function PATCH(request) {
  const {
    user,
    error: authError,
    status,
  } = await requireAuth(["admin", "user"]);
  if (authError) return error(authError, status);

  const body = await request.json();
  await connectDB();

  const allowedFields = ["fullName", "phone", "avatarUrl"];
  for (const field of allowedFields) {
    if (body[field] !== undefined) user[field] = body[field];
  }
  // Email changes would need a separate re-verification flow — not allowed here for now.

  await user.save();
  return success({ user });
}
