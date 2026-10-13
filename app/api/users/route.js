import bcrypt from "bcryptjs";
import crypto from "crypto";
import connectDB from "@/lib/db/connectDB";
import User from "@/models/User";
import { requireAuth } from "@/lib/auth/requireAuth";
import { success, error } from "@/lib/utils/apiResponse";
import { sendEmail, getAppUrl } from "@/lib/email/resend";
import { accountCreatedEmail } from "@/lib/email/templates";

export async function GET(request) {
  const { error: authError, status } = await requireAuth(["admin"]);
  if (authError) return error(authError, status);

  await connectDB();

  const { searchParams } = new URL(request.url);
  const statusFilter = searchParams.get("status");
  const search = searchParams.get("search");

  const query = {};
  if (statusFilter && statusFilter !== "all") query.status = statusFilter;
  if (search) {
    query.$or = [
      { fullName: { $regex: search, $options: "i" } },
      { email: { $regex: search, $options: "i" } },
    ];
  }

  const users = await User.find(query).sort({ createdAt: -1 });
  return success({ users });
}

export async function POST(request) {
  const { error: authError, status } = await requireAuth(["admin"]);
  if (authError) return error(authError, status);

  try {
    const { fullName, email } = await request.json();
    if (!fullName || !email) return error("Full name and email are required.");

    await connectDB();

    const existing = await User.findOne({ email: email.toLowerCase() });
    if (existing) return error("A user with this email already exists.", 409);

    // Random placeholder password; the user sets their own via the emailed link.
    const placeholderPassword = crypto.randomBytes(24).toString("hex");
    const hashedPassword = await bcrypt.hash(placeholderPassword, 10);
    const setPasswordToken = crypto.randomBytes(32).toString("hex");

    const newUser = await User.create({
      fullName,
      email: email.toLowerCase(),
      password: hashedPassword,
      role: "user",
      isVerified: true, // an admin vouched for this account
      resetPasswordToken: setPasswordToken,
      resetPasswordExpiry: Date.now() + 48 * 60 * 60 * 1000, // 48 hours
    });

    const setPasswordUrl = `${getAppUrl()}/reset-password?token=${setPasswordToken}`;
    await sendEmail({
      to: newUser.email,
      ...accountCreatedEmail({ fullName: newUser.fullName, setPasswordUrl }),
    });

    const safeUser = newUser.toObject();
    delete safeUser.password;
    delete safeUser.resetPasswordToken;
    delete safeUser.resetPasswordExpiry;

    return success({ user: safeUser }, 201);
  } catch (err) {
    return error(err.message, 500);
  }
}
