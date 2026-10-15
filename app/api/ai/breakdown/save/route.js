import mongoose from "mongoose";
import connectDB from "@/lib/db/connectDB";
import Project from "@/models/Project";
import User from "@/models/User";
import { requireAuth } from "@/lib/auth/requireAuth";
import { success, error } from "@/lib/utils/apiResponse";
import { createTaskWithNotification } from "@/lib/tasks/createTaskWithNotification";
import {
  MAX_TASK_COUNT,
  PRIORITIES,
  isPlainObject,
  isValidDateOnly,
} from "@/lib/ai/taskBreakdown";
import { readJsonBody } from "@/lib/utils/readJsonBody";

export const runtime = "nodejs";

const REQUEST_LIMIT_BYTES = 32 * 1024;

function isObjectId(value) {
  return typeof value === "string" && /^[a-f\d]{24}$/i.test(value);
}

function validateTask(task) {
  if (!isPlainObject(task)) return false;

  return (
    typeof task.name === "string" &&
    task.name.trim().length >= 3 &&
    task.name.trim().length <= 120 &&
    typeof task.description === "string" &&
    task.description.trim().length <= 1600 &&
    PRIORITIES.includes(task.priority) &&
    isValidDateOnly(task.dueDate) &&
    isObjectId(task.assignedUserId) &&
    mongoose.Types.ObjectId.isValid(task.assignedUserId)
  );
}

export async function POST(request) {
  try {
    const { user, error: authError, status: authStatus } =
      await requireAuth(["admin"]);
    if (authError) return error(authError, authStatus);

    const { body, error: bodyError } = await readJsonBody(
      request,
      REQUEST_LIMIT_BYTES,
    );
    if (bodyError) return error(bodyError, 400);

    const { projectId, tasks } = body;
    if (!isObjectId(projectId) || !mongoose.Types.ObjectId.isValid(projectId)) {
      return error("A valid project ID is required.", 400);
    }
    if (
      !Array.isArray(tasks) ||
      tasks.length < 1 ||
      tasks.length > MAX_TASK_COUNT ||
      tasks.some((task) => !validateTask(task))
    ) {
      return error("One or more selected tasks are invalid.", 400);
    }

    await connectDB();
    const project = await Project.findById(projectId).select("name dueDate");
    if (!project) return error("Project not found.", 404);

    const deadline = new Date(project.dueDate).toISOString().slice(0, 10);
    if (tasks.some((task) => task.dueDate > deadline)) {
      return error("Task due dates must not be later than the project deadline.", 400);
    }

    const assignedUserIds = [...new Set(tasks.map((task) => task.assignedUserId))];
    const eligibleUsers = await User.find({
      _id: { $in: assignedUserIds },
    }).select("_id");
    if (eligibleUsers.length !== assignedUserIds.length) {
      return error("Choose an existing user account for every selected task.", 400);
    }

    const created = [];
    const failed = [];
    for (let index = 0; index < tasks.length; index += 1) {
      const task = tasks[index];
      try {
        const result = await createTaskWithNotification({
          name: task.name.trim(),
          description: task.description.trim(),
          project: project._id,
          projectName: project.name,
          assignedUser: task.assignedUserId,
          priority: task.priority,
          status: "todo",
          dueDate: new Date(`${task.dueDate}T00:00:00.000Z`),
          createdBy: user._id,
        });
        created.push({ index, notificationSent: result.notificationSent });
      } catch {
        failed.push({ index, error: "This task could not be created." });
      }
    }

    return success({ created, failed }, created.length > 0 ? 201 : 200);
  } catch {
    return error("Could not save the selected tasks right now.", 500);
  }
}
