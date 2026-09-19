import { mockProjects } from "@/lib/mock/mockData";

export async function createProjectRequest({
  name,
  description,
  status,
  dueDate,
}) {
  await new Promise((r) => setTimeout(r, 900));

  const newProject = {
    id: `p${mockProjects.length + 1}`,
    name,
    description,
    status,
    dueDate,
    taskCount: 0,
    completedCount: 0,
  };
  mockProjects.push(newProject);
  return newProject;
}
