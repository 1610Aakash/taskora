import connectDB from "@/lib/db/connectDB";
import Project from "@/models/Project";
import Task from "@/models/Task";
import { requireAuth } from "@/lib/auth/requireAuth";
import { success, error } from "@/lib/utils/apiResponse";
import { getProjectTaskCounts } from "@/lib/projects/getProjectTaskCounts";

export async function GET(request) {
  const {
    user,
    error: authError,
    status,
  } = await requireAuth(["admin", "user"]);
  if (authError) return error(authError, status);

  await connectDB();

  const { searchParams } = new URL(request.url);
  const rawLimit = searchParams.get("limit");
  let limit;
  if (rawLimit !== null) {
    limit = Number(rawLimit);
    if (!Number.isInteger(limit) || limit < 1 || limit > 100) {
      return error("Limit must be an integer between 1 and 100.");
    }
  }

  let query = {};

  if (user.role === "user") {
    // A user is only "on" a project if the admin has assigned them at least one task in it.
    const assignedProjectIds = await Task.distinct("project", {
      assignedUser: user._id,
    });
    query = { _id: { $in: assignedProjectIds } };
  }
  // admin: no filter — sees every project

  const projectsQuery = Project.find(query).sort({ createdAt: -1 });
  if (limit) projectsQuery.limit(limit);
  const projects = await projectsQuery.lean();

  const countsByProject = await getProjectTaskCounts(
    projects.map((project) => project._id),
  );
  const withCounts = projects.map((project) => ({
    ...project,
    taskCount: countsByProject[project._id.toString()]?.taskCount ?? 0,
    completedCount:
      countsByProject[project._id.toString()]?.completedCount ?? 0,
  }));

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
