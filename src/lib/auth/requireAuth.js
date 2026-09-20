import { getAuthToken } from "./cookies";
import { verifyToken } from "./jwt";
import connectDB from "@/lib/db/connectDB";
import User from "@/models/User";

// Call this at the top of any protected route handler.
// Usage: const { user, error, status } = await requireAuth(["admin"]);
export async function requireAuth(allowedRoles = null) {
  const token = await getAuthToken();
  if (!token) return { error: "Not authenticated", status: 401 };

  const payload = verifyToken(token);
  if (!payload) return { error: "Invalid or expired session", status: 401 };

  await connectDB();
  const user = await User.findById(payload.userId).select("-password");
  if (!user) return { error: "User not found", status: 401 };
  if (user.status !== "active")
    return { error: "Account is inactive", status: 403 };

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return {
      error: "You do not have permission to perform this action",
      status: 403,
    };
  }

  return { user };
}
