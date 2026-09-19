import { mockTasks, mockProjects, mockUsers } from "@/lib/mock/mockData";

export async function getTaskFormOptionsRequest() {
  await new Promise((r) => setTimeout(r, 500));
  return {
    projects: mockProjects.map((p) => ({ value: p.id, label: p.name })),
    users: mockUsers.map((u) => ({ value: u.id, label: u.fullName })),
  };
}

export async function createTaskRequest({
  name,
  description,
  projectId,
  assignedUserId,
  priority,
  status,
  dueDate,
}) {
  await new Promise((r) => setTimeout(r, 900));

  const project = mockProjects.find((p) => p.id === projectId);
  const user = mockUsers.find((u) => u.id === assignedUserId);

  const newTask = {
    id: `t${mockTasks.length + 1}`,
    name,
    description,
    projectId,
    projectName: project?.name || "",
    assignedUserId,
    assignedUserName: user?.fullName || "",
    priority,
    status,
    dueDate,
  };
  mockTasks.push(newTask);

  if (project) {
    project.taskCount += 1;
    if (status === "completed") project.completedCount += 1;
  }

  return newTask;
}
