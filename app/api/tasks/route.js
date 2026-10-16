import connectDB from "@/lib/db/connectDB";
import Task from "@/models/Task";
import Project from "@/models/Project";
import { requireAuth } from "@/lib/auth/requireAuth";
import { success, error } from "@/lib/utils/apiResponse";
import { createTaskWithNotification } from "@/lib/tasks/createTaskWithNotification";

export async function GET(request) {
  const {
    user,
    error: authError,
    status,
  } = await requireAuth(["admin", "user"]);
  if (authError) return error(authError, status);

  await connectDB();

  const { searchParams } = new URL(request.url);
  const projectId = searchParams.get("projectId");
  const mine = searchParams.get("mine");
  const rawLimit = searchParams.get("limit");
  let limit;
  if (rawLimit !== null) {
    limit = Number(rawLimit);
    if (!Number.isInteger(limit) || limit < 1 || limit > 100) {
      return error("Limit must be an integer between 1 and 100.");
    }
  }

  const query = {};
  if (projectId) {
    query.project = projectId; // both roles can see every task inside a project they're viewing
  } else if (mine === "true" || user.role === "user") {
    query.assignedUser = user._id; // "My Tasks" — also the default scope for a plain user
  }
  // admin with no filters: sees every task across every project

  const tasksQuery = Task.find(query)
    .populate("project", "name")
    .populate("assignedUser", "fullName")
    .sort({ createdAt: -1 });
  if (limit) tasksQuery.limit(limit);
  const tasks = await tasksQuery.lean();

  return success({ tasks });
}

export async function POST(request) {
  const { user, error: authError, status } = await requireAuth(["admin"]);
  if (authError) return error(authError, status);

  try {
    const {
      name,
      description,
      project,
      assignedUser,
      priority,
      status: taskStatus,
      dueDate,
    } = await request.json();
    if (!name || !project || !assignedUser || !dueDate) {
      return error(
        "Task name, project, assigned user, and due date are required.",
      );
    }

    await connectDB();

    const projectDoc = await Project.findById(project).select("name");
    const { task, notificationSent } = await createTaskWithNotification({
      name,
      description,
      project,
      projectName: projectDoc?.name,
      assignedUser,
      priority: priority || "medium",
      status: taskStatus || "todo",
      dueDate,
      createdBy: user._id,
    });

    return success({ task, notificationSent }, 201);
  } catch (err) {
    return error(err.message, 500);
  }
}
