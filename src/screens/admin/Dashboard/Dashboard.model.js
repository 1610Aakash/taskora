import {
  mockAdmin,
  mockUsers,
  mockProjects,
  mockTasks,
} from "@/lib/mock/mockData";

export async function getAdminDashboardDataRequest() {
  await new Promise((r) => setTimeout(r, 700));

  const today = new Date();
  const overdueTasks = mockTasks.filter(
    (t) => t.status !== "completed" && new Date(t.dueDate) < today,
  ).length;

  return {
    admin: mockAdmin,
    stats: {
      totalUsers: mockUsers.length,
      activeUsers: mockUsers.filter((u) => u.status === "active").length,
      totalProjects: mockProjects.length,
      totalTasks: mockTasks.length,
      completedTasks: mockTasks.filter((t) => t.status === "completed").length,
      overdueTasks,
    },
    recentProjects: mockProjects.slice(0, 3),
    recentTasks: mockTasks.slice(0, 4),
    recentUsers: [...mockUsers]
      .sort((a, b) => new Date(b.joinedAt) - new Date(a.joinedAt))
      .slice(0, 4),
  };
}
