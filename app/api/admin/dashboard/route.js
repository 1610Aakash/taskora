import connectDB from "@/lib/db/connectDB";
import User from "@/models/User";
import Project from "@/models/Project";
import Task from "@/models/Task";
import { requireAuth } from "@/lib/auth/requireAuth";
import { success, error } from "@/lib/utils/apiResponse";

export async function GET() {
  const { error: authError, status } = await requireAuth(["admin"]);
  if (authError) return error(authError, status);

  await connectDB();

  const [
    totalUsers,
    activeUsers,
    totalProjects,
    allTasks,
    projects,
    recentUsers,
  ] = await Promise.all([
    User.countDocuments(),
    User.countDocuments({ status: "active" }),
    Project.countDocuments(),
    Task.find()
      .populate("project", "name")
      .populate("assignedUser", "fullName")
      .sort({ createdAt: -1 }),
    Project.find().sort({ createdAt: -1 }).limit(3).lean(),
    User.find().sort({ createdAt: -1 }).limit(4),
  ]);

  const completedTasks = allTasks.filter(
    (t) => t.status === "completed",
  ).length;
  const overdueTasks = allTasks.filter(
    (t) => t.status !== "completed" && new Date(t.dueDate) < new Date(),
  ).length;

  const recentProjects = await Promise.all(
    projects.map(async (p) => {
      const taskCount = await Task.countDocuments({ project: p._id });
      const completedCount = await Task.countDocuments({
        project: p._id,
        status: "completed",
      });
      return { ...p, taskCount, completedCount };
    }),
  );

  return success({
    stats: {
      totalUsers,
      activeUsers,
      totalProjects,
      totalTasks: allTasks.length,
      completedTasks,
      overdueTasks,
    },
    recentProjects,
    recentTasks: allTasks.slice(0, 4),
    recentUsers,
  });
}
