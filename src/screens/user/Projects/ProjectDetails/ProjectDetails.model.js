import { mockProjects, mockTasks } from "@/lib/mock/mockData";

export async function getProjectDetailsRequest(projectId) {
  await new Promise((r) => setTimeout(r, 700));
  const project = mockProjects.find((p) => p.id === projectId);
  if (!project) throw new Error("Project not found.");
  const tasks = mockTasks.filter((t) => t.projectId === projectId);
  return { project, tasks };
}
