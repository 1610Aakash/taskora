import bcrypt from "bcryptjs";
import connectDB from "@/lib/db/connectDB";
import User from "@/models/User";
import { requireAuth } from "@/lib/auth/requireAuth";
import { success, error } from "@/lib/utils/apiResponse";

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
    const { fullName, email, password } = await request.json();
    if (!fullName || !email || !password)
      return error("Full name, email, and password are required.");
    if (password.length < 8)
      return error("Password must be at least 8 characters.");

    await connectDB();

    const existing = await User.findOne({ email: email.toLowerCase() });
    if (existing) return error("A user with this email already exists.", 409);

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      fullName,
      email: email.toLowerCase(),
      password: hashedPassword,
      role: "user",
    });

    return success({ user: newUser }, 201);
  } catch (err) {
    return error(err.message, 500);
  }
}
