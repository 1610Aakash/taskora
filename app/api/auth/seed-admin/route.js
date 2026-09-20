import bcrypt from "bcryptjs";
import connectDB from "@/lib/db/connectDB";
import User from "@/models/User";
import { success, error } from "@/lib/utils/apiResponse";

export async function POST(request) {
  const { secret, fullName, email, password } = await request.json();

  if (secret !== process.env.SEED_SECRET)
    return error("Invalid seed secret.", 403);
  if (!fullName || !email || !password)
    return error("Full name, email, and password are required.");

  await connectDB();

  const existingAdmin = await User.findOne({ role: "admin" });
  if (existingAdmin) return error("An admin account already exists.", 409);

  const hashedPassword = await bcrypt.hash(password, 10);
  const admin = await User.create({
    fullName,
    email: email.toLowerCase(),
    password: hashedPassword,
    role: "admin",
    isVerified: true,
  });

  return success({ message: "Admin created.", email: admin.email }, 201);
}
