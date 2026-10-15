import Task from "@/models/Task";
import { notifyUser } from "@/lib/utils/notify";

export async function createTaskWithNotification({
  name,
  description,
  project,
  projectName,
  assignedUser,
  priority,
  status = "todo",
  dueDate,
  createdBy,
}) {
  const task = await Task.create({
    name,
    description,
    project,
    assignedUser,
    priority,
    status,
    dueDate,
    createdBy,
  });

  let notificationSent = true;
  try {
    await notifyUser({
      userId: assignedUser,
      type: "task_assigned",
      title: "New task assigned",
      message: `You were assigned "${name}" on ${projectName || "a project"}.`,
      link: `/user/my-tasks/${task._id}`,
    });
  } catch {
    notificationSent = false;
  }

  return { task, notificationSent };
}
