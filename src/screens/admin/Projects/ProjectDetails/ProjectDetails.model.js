import { apiGet, apiPost } from "@/lib/api/client";
import { normalizeProject, normalizeTask } from "@/lib/utils/normalize";

export async function getProjectDetailsRequest(projectId) {
  const [projectRes, tasksRes] = await Promise.all([
    apiGet(`/projects/${projectId}`),
    apiGet(`/tasks?projectId=${projectId}`),
  ]);
  return {
    project: normalizeProject(projectRes.project),
    tasks: tasksRes.tasks.map(normalizeTask),
  };
}

export function getBreakdownOptionsRequest() {
  return Promise.all([apiGet("/ai/breakdown"), apiGet("/users")])
    .then(([breakdownRes, usersRes]) => ({
      maxTaskCount: breakdownRes.maxTaskCount,
      users: usersRes.users
        .map((user) => ({
          id: user._id,
          name: user.fullName,
          role: user.role,
          status: user.status,
        })),
    }));
}

export function generateTaskBreakdownRequest({ projectId, instructions, taskCount }) {
  return apiPost("/ai/breakdown", { projectId, instructions, taskCount });
}

export function saveGeneratedTasksRequest({ projectId, tasks }) {
  return apiPost("/ai/breakdown/save", { projectId, tasks });
}
