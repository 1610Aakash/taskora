import crypto from "crypto";
import connectDB from "@/lib/db/connectDB";
import User from "@/models/User";
import { success, error } from "@/lib/utils/apiResponse";

export async function POST(request) {
  try {
    const { email } = await request.json();
    if (!email) return error("Email is required.");

    await connectDB();
    const user = await User.findOne({ email: email.toLowerCase() });

    // Always respond the same way, whether or not the account exists — avoids leaking registered emails.
    if (user) {
      const resetToken = crypto.randomBytes(32).toString("hex");
      user.resetPasswordToken = resetToken;
      user.resetPasswordExpiry = Date.now() + 60 * 60 * 1000; // 1 hour
      await user.save();

      // TODO: email this link once a provider is wired up.
      console.log(`Reset link: /reset-password?token=${resetToken}`);
    }

    return success({
      message:
        "If an account exists for this email, a reset link has been sent.",
    });
  } catch (err) {
    return error(err.message, 500);
  }
}
