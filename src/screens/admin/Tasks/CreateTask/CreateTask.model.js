import { apiGet, apiPost } from "@/lib/api/client";

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

export async function createTaskRequest({
  name,
  description,
  projectId,
  assignedUserId,
  priority,
  status,
  dueDate,
}) {
  return apiPost("/tasks", {
    name,
    description,
    project: projectId,
    assignedUser: assignedUserId,
    priority,
    status,
    dueDate,
  });
}
