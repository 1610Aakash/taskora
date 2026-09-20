import { apiGet, apiPatch } from "@/lib/api/client";
import { normalizeTask } from "@/lib/utils/normalize";

export async function getTaskRequest(taskId) {
  const data = await apiGet(`/tasks/${taskId}`);
  return normalizeTask(data.task);
}

export async function updateTaskStatusRequest(taskId, status) {
  const data = await apiPatch(`/tasks/${taskId}`, { status });
  return normalizeTask(data.task);
}
