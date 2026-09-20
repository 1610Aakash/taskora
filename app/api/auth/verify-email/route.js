import connectDB from "@/lib/db/connectDB";
import User from "@/models/User";
import { success, error } from "@/lib/utils/apiResponse";

export async function POST(request) {
  try {
    const { token } = await request.json();
    if (!token) return error("Verification token is required.");

    await connectDB();

    const user = await User.findOne({
      verificationToken: token,
      verificationTokenExpiry: { $gt: Date.now() },
    }).select("+verificationToken +verificationTokenExpiry");

    if (!user) return error("Invalid or expired verification link.", 400);

    user.isVerified = true;
    user.verificationToken = undefined;
    user.verificationTokenExpiry = undefined;
    await user.save();

    return success({ message: "Email verified." });
  } catch (err) {
    return error(err.message, 500);
  }
}
