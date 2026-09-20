import { apiGet } from "@/lib/api/client";
import { normalizeProject, normalizeTask } from "@/lib/utils/normalize";

export async function getDashboardDataRequest() {
  const [projectsRes, tasksRes] = await Promise.all([
    apiGet("/projects"),
    apiGet("/tasks?mine=true"),
  ]);
  return {
    recentProjects: projectsRes.projects.slice(0, 3).map(normalizeProject),
    recentTasks: tasksRes.tasks.slice(0, 4).map(normalizeTask),
  };
}
