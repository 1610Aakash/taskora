import { mockUser, mockProjects, mockTasks } from "@/lib/mock/mockData";

export async function getDashboardDataRequest() {
  await new Promise((r) => setTimeout(r, 700));
  return {
    user: mockUser,
    recentProjects: mockProjects.slice(0, 3),
    recentTasks: mockTasks.slice(0, 4),
  };
}
