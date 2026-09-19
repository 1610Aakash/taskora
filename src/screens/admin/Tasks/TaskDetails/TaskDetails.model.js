import { mockTasks } from "@/lib/mock/mockData";

export async function getTaskRequest(taskId) {
  await new Promise((r) => setTimeout(r, 700));
  const task = mockTasks.find((t) => t.id === taskId);
  if (!task) throw new Error("Task not found.");
  return task;
}

export async function updateTaskStatusRequest(taskId, status) {
  await new Promise((r) => setTimeout(r, 600));
  const task = mockTasks.find((t) => t.id === taskId);
  if (!task) throw new Error("Task not found.");
  task.status = status;
  return task;
}
