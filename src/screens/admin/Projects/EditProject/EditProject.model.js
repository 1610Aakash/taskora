import { apiGet, apiPatch, apiDelete } from "@/lib/api/client";
import { normalizeProject } from "@/lib/utils/normalize";

export async function getProjectRequest(projectId) {
  const data = await apiGet(`/projects/${projectId}`);
  return normalizeProject(data.project);
}

export async function updateProjectRequest(
  projectId,
  { name, description, status, dueDate },
) {
  const data = await apiPatch(`/projects/${projectId}`, {
    name,
    description,
    status,
    dueDate,
  });
  return normalizeProject(data.project);
}

export async function deleteProjectRequest(projectId) {
  return apiDelete(`/projects/${projectId}`);
}
