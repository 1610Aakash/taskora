import { mockTasks } from "@/lib/mock/mockData";

export async function getMyTasksRequest() {
  await new Promise((r) => setTimeout(r, 700));
  return mockTasks;
}
