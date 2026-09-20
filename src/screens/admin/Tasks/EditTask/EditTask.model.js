import { apiGet, apiPatch, apiDelete } from "@/lib/api/client";
import { normalizeTask } from "@/lib/utils/normalize";

export async function getTaskRequest(taskId) {
  const data = await apiGet(`/tasks/${taskId}`);
  return normalizeTask(data.task);
}

export async function getTaskFormOptionsRequest() {
  const [projectsRes, usersRes] = await Promise.all([
    apiGet("/projects"),
    apiGet("/users"),
  ]);
  return {
    projects: projectsRes.projects.map((p) => ({
      value: p._id,
      label: p.name,
    })),
    users: usersRes.users.map((u) => ({ value: u._id, label: u.fullName })),
  };
}

export async function updateTaskRequest(
  taskId,
  { name, description, projectId, assignedUserId, priority, status, dueDate },
) {
  const data = await apiPatch(`/tasks/${taskId}`, {
    name,
    description,
    project: projectId,
    assignedUser: assignedUserId,
    priority,
    status,
    dueDate,
  });
  return normalizeTask(data.task);
}

export async function deleteTaskRequest(taskId) {
  return apiDelete(`/tasks/${taskId}`);
}
