export function normalizeUser(u) {
  if (!u) return null;
  return {
    id: u._id,
    fullName: u.fullName,
    email: u.email,
    role: u.role,
    status: u.status,
    phone: u.phone || "",
    avatarUrl: u.avatarUrl || "",
    joinedAt: u.createdAt,
  };
}

export function normalizeProject(p) {
  if (!p) return null;
  return {
    id: p._id,
    name: p.name,
    description: p.description,
    status: p.status,
    dueDate: p.dueDate,
    taskCount: p.taskCount ?? 0,
    completedCount: p.completedCount ?? 0,
  };
}

export function normalizeTask(t) {
  if (!t) return null;
  return {
    id: t._id,
    name: t.name,
    description: t.description,
    projectId: t.project?._id || t.project,
    projectName: t.project?.name || "",
    assignedUserId: t.assignedUser?._id || t.assignedUser,
    assignedUserName: t.assignedUser?.fullName || "",
    priority: t.priority,
    status: t.status,
    dueDate: t.dueDate,
  };
}

export function normalizeNotification(n) {
  if (!n) return null;
  return {
    id: n._id,
    type: n.type,
    title: n.title,
    message: n.message,
    read: n.read,
    createdAt: n.createdAt,
    link: n.link,
  };
}
