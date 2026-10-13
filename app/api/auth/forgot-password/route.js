import crypto from "crypto";
import connectDB from "@/lib/db/connectDB";
import User from "@/models/User";
import { success, error } from "@/lib/utils/apiResponse";
import { sendEmail, getAppUrl } from "@/lib/email/resend";
import { resetPasswordEmail } from "@/lib/email/templates";

export async function POST(request) {
  try {
    const { email } = await request.json();
    if (!email) return error("Email is required.");

    await connectDB();
    const user = await User.findOne({ email: email.toLowerCase() });

    // Same response whether or not the account exists, so registered emails can't be probed.
        if (user) {
      const resetToken = crypto.randomBytes(32).toString("hex");
      user.resetPasswordToken = resetToken;
      user.resetPasswordExpiry = Date.now() + 60 * 60 * 1000; // 1 hour
      await user.save();

      const resetUrl = `${getAppUrl()}/reset-password?token=${resetToken}`;
      const result = await sendEmail({
        to: user.email,
        ...resetPasswordEmail({ fullName: user.fullName, resetUrl }),
      });
      console.log("[forgot-password] email result:", result);
    } else {
      console.log("[forgot-password] no user found for:", email);
    }

    return success({
      message:
        "If an account exists for this email, a reset link has been sent.",
    });
  } catch (err) {
    return error(err.message, 500);
  }
}
