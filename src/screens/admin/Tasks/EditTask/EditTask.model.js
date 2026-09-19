import { mockTasks, mockProjects, mockUsers } from "@/lib/mock/mockData";

export async function getTaskRequest(taskId) {
  await new Promise((r) => setTimeout(r, 700));
  const task = mockTasks.find((t) => t.id === taskId);
  if (!task) throw new Error("Task not found.");
  return task;
}

export async function getTaskFormOptionsRequest() {
  await new Promise((r) => setTimeout(r, 500));
  return {
    projects: mockProjects.map((p) => ({ value: p.id, label: p.name })),
    users: mockUsers.map((u) => ({ value: u.id, label: u.fullName })),
  };
}

export async function updateTaskRequest(taskId, data) {
  await new Promise((r) => setTimeout(r, 900));
  const task = mockTasks.find((t) => t.id === taskId);
  if (!task) throw new Error("Task not found.");

  const project = mockProjects.find((p) => p.id === data.projectId);
  const user = mockUsers.find((u) => u.id === data.assignedUserId);

  Object.assign(task, data, {
    projectName: project?.name || task.projectName,
    assignedUserName: user?.fullName || task.assignedUserName,
  });
  return task;
}

export async function deleteTaskRequest(taskId) {
  await new Promise((r) => setTimeout(r, 700));
  const index = mockTasks.findIndex((t) => t.id === taskId);
  if (index === -1) throw new Error("Task not found.");
  mockTasks.splice(index, 1);
}
