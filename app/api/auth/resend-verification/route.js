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

    if (user && !user.isVerified) {
      const verificationToken = crypto.randomBytes(32).toString("hex");
      user.verificationToken = verificationToken;
      user.verificationTokenExpiry = Date.now() + 24 * 60 * 60 * 1000;
      await user.save();
      console.log(
        `Verification link: /verify-email?token=${verificationToken}&email=${user.email}`,
      );
    }

    return success({
      message:
        "If an account exists and needs verification, a new email has been sent.",
    });
  } catch (err) {
    return error(err.message, 500);
  }
}
