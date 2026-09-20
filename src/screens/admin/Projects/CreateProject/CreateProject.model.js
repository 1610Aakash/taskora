import { apiPost } from "@/lib/api/client";
import { normalizeProject } from "@/lib/utils/normalize";

export async function createProjectRequest({
  name,
  description,
  status,
  dueDate,
}) {
  const data = await apiPost("/projects", {
    name,
    description,
    status,
    dueDate,
  });
  return normalizeProject(data.project);
}
