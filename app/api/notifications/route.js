import connectDB from "@/lib/db/connectDB";
import Notification from "@/models/Notification";
import { requireAuth } from "@/lib/auth/requireAuth";
import { success, error } from "@/lib/utils/apiResponse";

export async function GET() {
  const {
    user,
    error: authError,
    status,
  } = await requireAuth(["admin", "user"]);
  if (authError) return error(authError, status);

  await connectDB();

  const query =
    user.role === "admin"
      ? { audience: "admin" }
      : { audience: "user", user: user._id };
  const notifications = await Notification.find(query).sort({ createdAt: -1 });

  return success({ notifications });
}

export async function PATCH() {
  // Mark every notification in the current scope as read.
  const {
    user,
    error: authError,
    status,
  } = await requireAuth(["admin", "user"]);
  if (authError) return error(authError, status);

  await connectDB();

  const query =
    user.role === "admin"
      ? { audience: "admin" }
      : { audience: "user", user: user._id };
  await Notification.updateMany(query, { read: true });

  return success({ message: "All notifications marked as read." });
}
