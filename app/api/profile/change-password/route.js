import bcrypt from "bcryptjs";
import connectDB from "@/lib/db/connectDB";
import User from "@/models/User";
import { requireAuth } from "@/lib/auth/requireAuth";
import { success, error } from "@/lib/utils/apiResponse";

export async function POST(request) {
  const {
    user,
    error: authError,
    status,
  } = await requireAuth(["admin", "user"]);
  if (authError) return error(authError, status);

  try {
    const { currentPassword, newPassword } = await request.json();
    if (!currentPassword || !newPassword)
      return error("Current and new password are required.");
    if (newPassword.length < 8)
      return error("New password must be at least 8 characters.");

    await connectDB();

    const fullUser = await User.findById(user._id).select("+password");
    const isMatch = await bcrypt.compare(currentPassword, fullUser.password);
    if (!isMatch) return error("Current password is incorrect.", 401);

    fullUser.password = await bcrypt.hash(newPassword, 10);
    await fullUser.save();

    return success({ message: "Password changed successfully." });
  } catch (err) {
    return error(err.message, 500);
  }
}
