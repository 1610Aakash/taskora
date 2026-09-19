import { mockProjects } from "@/lib/mock/mockData";

export async function getProjectsRequest() {
  await new Promise((r) => setTimeout(r, 700));
  return [...mockProjects];
}
