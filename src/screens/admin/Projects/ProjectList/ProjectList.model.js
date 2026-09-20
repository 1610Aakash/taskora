import { apiGet } from "@/lib/api/client";
import { normalizeProject } from "@/lib/utils/normalize";

export async function getProjectsRequest() {
  const data = await apiGet("/projects");
  return data.projects.map(normalizeProject);
}
