import bcrypt from "bcryptjs";
import connectDB from "@/lib/db/connectDB";
import User from "@/models/User";
import { success, error } from "@/lib/utils/apiResponse";

export async function POST(request) {
  try {
    const { token, password } = await request.json();
    if (!token || !password)
      return error("Token and new password are required.");
    if (password.length < 8)
      return error("Password must be at least 8 characters.");

    await connectDB();

    const user = await User.findOne({
      resetPasswordToken: token,
      resetPasswordExpiry: { $gt: Date.now() },
    }).select("+resetPasswordToken +resetPasswordExpiry");

    if (!user) return error("Invalid or expired reset link.", 400);

    user.password = await bcrypt.hash(password, 10);
    user.resetPasswordToken = undefined;
    user.resetPasswordExpiry = undefined;
    await user.save();

    return success({ message: "Password reset successful." });
  } catch (err) {
    return error(err.message, 500);
  }
}
