import connectDB from "@/lib/db/connectDB";
import Task from "@/models/Task";
import { requireAuth } from "@/lib/auth/requireAuth";
import { success, error } from "@/lib/utils/apiResponse";
import { TASK_STATUS_FLOW } from "@/lib/constants/status";

export async function GET(request, { params }) {
  const { error: authError, status: authStatus } = await requireAuth([
    "admin",
    "user",
  ]);
  if (authError) return error(authError, authStatus);

  const { taskId } = await params;
  await connectDB();

  const task = await Task.findById(taskId)
    .populate("project", "name")
    .populate("assignedUser", "fullName");
  if (!task) return error("Task not found.", 404);

  return success({ task });
}

export async function PATCH(request, { params }) {
  const {
    user,
    error: authError,
    status: authStatus,
  } = await requireAuth(["admin", "user"]);
  if (authError) return error(authError, authStatus);

  const { taskId } = await params;
  const body = await request.json();

  await connectDB();

  const task = await Task.findById(taskId);
  if (!task) return error("Task not found.", 404);

  if (user.role === "admin") {
    const allowedFields = [
      "name",
      "description",
      "project",
      "assignedUser",
      "priority",
      "status",
      "dueDate",
    ];
    for (const field of allowedFields) {
      if (body[field] !== undefined) task[field] = body[field];
    }
  } else {
    // Regular users can only advance their own task's status, one step at a time — enforced here, not just in the UI.
    if (task.assignedUser.toString() !== user._id.toString()) {
      return error("You can only update tasks assigned to you.", 403);
    }
    if (body.status === undefined) {
      return error("Only status updates are allowed.", 403);
    }
    const currentIndex = TASK_STATUS_FLOW.indexOf(task.status);
    const nextStatus = TASK_STATUS_FLOW[currentIndex + 1];
    if (body.status !== nextStatus) {
      return error(
        `Status can only move forward: ${task.status} → ${nextStatus || "—"}.`,
        400,
      );
    }
    task.status = body.status;
  }

  await task.save();
  return success({ task });
}

export async function DELETE(request, { params }) {
  const { error: authError, status: authStatus } = await requireAuth(["admin"]);
  if (authError) return error(authError, authStatus);

  const { taskId } = await params;
  await connectDB();

  const task = await Task.findById(taskId);
  if (!task) return error("Task not found.", 404);

  await task.deleteOne();
  return success({ message: "Task deleted." });
}
