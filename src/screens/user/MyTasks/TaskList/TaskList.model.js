import { apiGet } from "@/lib/api/client";
import { normalizeTask } from "@/lib/utils/normalize";

export async function getMyTasksRequest() {
  const data = await apiGet("/tasks?mine=true");
  return data.tasks.map(normalizeTask);
}
