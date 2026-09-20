import { apiGet } from "@/lib/api/client";
import { normalizeProject, normalizeTask } from "@/lib/utils/normalize";

export async function getProjectDetailsRequest(projectId) {
  const [projectRes, tasksRes] = await Promise.all([
    apiGet(`/projects/${projectId}`),
    apiGet(`/tasks?projectId=${projectId}`),
  ]);
  return {
    project: normalizeProject(projectRes.project),
    tasks: tasksRes.tasks.map(normalizeTask),
  };
}
