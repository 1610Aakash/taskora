import connectDB from "@/lib/db/connectDB";
import Notification from "@/models/Notification";
import { requireAuth } from "@/lib/auth/requireAuth";
import { success, error } from "@/lib/utils/apiResponse";

export async function PATCH(request, { params }) {
  const {
    user,
    error: authError,
    status,
  } = await requireAuth(["admin", "user"]);
  if (authError) return error(authError, status);

  const { notificationId } = await params;
  await connectDB();

  const notification = await Notification.findById(notificationId);
  if (!notification) return error("Notification not found.", 404);

  const owns =
    (user.role === "admin" && notification.audience === "admin") ||
    (notification.audience === "user" &&
      notification.user?.toString() === user._id.toString());

  if (!owns)
    return error(
      "You do not have permission to update this notification.",
      403,
    );

  notification.read = true;
  await notification.save();

  return success({ notification });
}
