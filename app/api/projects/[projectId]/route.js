import connectDB from "@/lib/db/connectDB";
import Project from "@/models/Project";
import Task from "@/models/Task";
import { requireAuth } from "@/lib/auth/requireAuth";
import { success, error } from "@/lib/utils/apiResponse";

export async function GET(request, { params }) {
  const {
    user,
    error: authError,
    status,
  } = await requireAuth(["admin", "user"]);
  if (authError) return error(authError, status);

  const { projectId } = await params;
  await connectDB();

  const project = await Project.findById(projectId).lean();
  if (!project) return error("Project not found.", 404);

  if (user.role === "user") {
    const hasTaskHere = await Task.exists({
      project: projectId,
      assignedUser: user._id,
    });
    if (!hasTaskHere)
      return error("You do not have access to this project.", 403);
  }

  const taskCount = await Task.countDocuments({ project: projectId });
  const completedCount = await Task.countDocuments({
    project: projectId,
    status: "completed",
  });

  return success({ project: { ...project, taskCount, completedCount } });
}

export async function PATCH(request, { params }) {
  const { error: authError, status } = await requireAuth(["admin"]);
  if (authError) return error(authError, status);

  const { projectId } = await params;
  const body = await request.json();

  await connectDB();

  const project = await Project.findById(projectId);
  if (!project) return error("Project not found.", 404);

  const allowedFields = ["name", "description", "status", "dueDate"];
  for (const field of allowedFields) {
    if (body[field] !== undefined) project[field] = body[field];
  }

  await project.save();
  return success({ project });
}

export async function DELETE(request, { params }) {
  const { error: authError, status } = await requireAuth(["admin"]);
  if (authError) return error(authError, status);

  const { projectId } = await params;
  await connectDB();

  const project = await Project.findById(projectId);
  if (!project) return error("Project not found.", 404);

  await Task.deleteMany({ project: projectId });
  await project.deleteOne();

  return success({ message: "Project deleted." });
}
