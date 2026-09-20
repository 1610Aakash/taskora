import { apiGet } from "@/lib/api/client";
import { normalizeTask } from "@/lib/utils/normalize";

export async function getAllTasksRequest() {
  const data = await apiGet("/tasks");
  return data.tasks.map(normalizeTask);
}
