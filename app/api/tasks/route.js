import connectDB from "@/lib/db/connectDB";
import Task from "@/models/Task";
import Project from "@/models/Project";
import { requireAuth } from "@/lib/auth/requireAuth";
import { success, error } from "@/lib/utils/apiResponse";
import { notifyUser } from "@/lib/utils/notify";

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

  const query = {};
  if (projectId) {
    query.project = projectId; // both roles can see every task inside a project they're viewing
  } else if (mine === "true" || user.role === "user") {
    query.assignedUser = user._id; // "My Tasks" — also the default scope for a plain user
  }
  // admin with no filters: sees every task across every project

  const tasks = await Task.find(query)
    .populate("project", "name")
    .populate("assignedUser", "fullName")
    .sort({ createdAt: -1 });

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

    const task = await Task.create({
      name,
      description,
      project,
      assignedUser,
      priority: priority || "medium",
      status: taskStatus || "todo",
      dueDate,
      createdBy: user._id,
    });

    const projectDoc = await Project.findById(project);
    await notifyUser({
      userId: assignedUser,
      type: "task_assigned",
      title: "New task assigned",
      message: `You were assigned "${name}" on ${projectDoc?.name || "a project"}.`,
      link: `/user/my-tasks/${task._id}`,
    });

    return success({ task }, 201);
  } catch (err) {
    return error(err.message, 500);
  }
}
