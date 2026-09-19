import { mockProjects } from "@/lib/mock/mockData";

export async function getProjectRequest(projectId) {
  await new Promise((r) => setTimeout(r, 700));
  const project = mockProjects.find((p) => p.id === projectId);
  if (!project) throw new Error("Project not found.");
  return project;
}

export async function updateProjectRequest(projectId, data) {
  await new Promise((r) => setTimeout(r, 900));
  const project = mockProjects.find((p) => p.id === projectId);
  if (!project) throw new Error("Project not found.");
  Object.assign(project, data);
  return project;
}

export async function deleteProjectRequest(projectId) {
  await new Promise((r) => setTimeout(r, 700));
  const index = mockProjects.findIndex((p) => p.id === projectId);
  if (index === -1) throw new Error("Project not found.");
  mockProjects.splice(index, 1);
}
