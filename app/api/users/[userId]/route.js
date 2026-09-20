import connectDB from "@/lib/db/connectDB";
import User from "@/models/User";
import { requireAuth } from "@/lib/auth/requireAuth";
import { success, error } from "@/lib/utils/apiResponse";

export async function GET(request, { params }) {
  const { error: authError, status } = await requireAuth(["admin"]);
  if (authError) return error(authError, status);

  const { userId } = await params;
  await connectDB();

  const user = await User.findById(userId);
  if (!user) return error("User not found.", 404);

  return success({ user });
}

export async function PATCH(request, { params }) {
  const { error: authError, status } = await requireAuth(["admin"]);
  if (authError) return error(authError, status);

  const { userId } = await params;
  const body = await request.json();

  await connectDB();

  const user = await User.findById(userId);
  if (!user) return error("User not found.", 404);

  const allowedFields = ["fullName", "email", "status"];
  for (const field of allowedFields) {
    if (body[field] !== undefined) user[field] = body[field];
  }

  await user.save();
  return success({ user });
}
