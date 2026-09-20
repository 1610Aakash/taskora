import { apiGet } from "@/lib/api/client";
import {
  normalizeProject,
  normalizeTask,
  normalizeUser,
} from "@/lib/utils/normalize";

export async function getAdminDashboardDataRequest() {
  const data = await apiGet("/admin/dashboard");
  return {
    stats: data.stats,
    recentProjects: data.recentProjects.map(normalizeProject),
    recentTasks: data.recentTasks.map(normalizeTask),
    recentUsers: data.recentUsers.map(normalizeUser),
  };
}
