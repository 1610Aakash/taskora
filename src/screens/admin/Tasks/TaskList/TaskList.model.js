import { mockTasks } from "@/lib/mock/mockData";

export async function getAllTasksRequest() {
  await new Promise((r) => setTimeout(r, 700));
  return [...mockTasks];
}