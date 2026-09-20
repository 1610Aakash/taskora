import connectDB from "@/lib/db/connectDB";
import Project from "@/models/Project";
import Task from "@/models/Task";
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

  let query = {};

  if (user.role === "user") {
    // A user is only "on" a project if the admin has assigned them at least one task in it.
    const assignedProjectIds = await Task.distinct("project", {
      assignedUser: user._id,
    });
    query = { _id: { $in: assignedProjectIds } };
  }
  // admin: no filter — sees every project

  const projects = await Project.find(query).sort({ createdAt: -1 }).lean();

  const withCounts = await Promise.all(
    projects.map(async (p) => {
      const taskCount = await Task.countDocuments({ project: p._id });
      const completedCount = await Task.countDocuments({
        project: p._id,
        status: "completed",
      });
      return { ...p, taskCount, completedCount };
    }),
  );

  return success({ projects: withCounts });
}

export async function POST(request) {
  const { user, error: authError, status } = await requireAuth(["admin"]);
  if (authError) return error(authError, status);

  try {
    const {
      name,
      description,
      status: projStatus,
      dueDate,
    } = await request.json();
    if (!name || !dueDate)
      return error("Project name and due date are required.");

    await connectDB();

    const project = await Project.create({
      name,
      description,
      status: projStatus || "in-progress",
      dueDate,
      createdBy: user._id,
    });

    return success({ project }, 201);
  } catch (err) {
    return error(err.message, 500);
  }
}
