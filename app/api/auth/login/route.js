import bcrypt from "bcryptjs";
import connectDB from "@/lib/db/connectDB";
import User from "@/models/User";
import { signToken } from "@/lib/auth/jwt";
import { setAuthCookie } from "@/lib/auth/cookies";
import { success, error } from "@/lib/utils/apiResponse";

export async function POST(request) {
  try {
    const { email, password } = await request.json();
    if (!email || !password) return error("Email and password are required.");

    await connectDB();

    const user = await User.findOne({ email: email.toLowerCase() }).select(
      "+password",
    );
    if (!user) return error("Invalid email or password.", 401);

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return error("Invalid email or password.", 401);
    if (user.status !== "active")
      return error("Your account has been deactivated. Contact an admin.", 403);

    const token = signToken({ userId: user._id.toString(), role: user.role });
    await setAuthCookie(token);

    return success({
      user: {
        id: user._id,
        fullName: user.fullName,
        email: user.email,
        role: user.role,
      },
    });
  } catch (err) {
    return error(err.message, 500);
  }
}
