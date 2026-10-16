import connectDB from "@/lib/db/connectDB";
import User from "@/models/User";
import Project from "@/models/Project";
import Task from "@/models/Task";
import { requireAuth } from "@/lib/auth/requireAuth";
import { success, error } from "@/lib/utils/apiResponse";
import { getProjectTaskCounts } from "@/lib/projects/getProjectTaskCounts";

export async function GET() {
  const { error: authError, status } = await requireAuth(["admin"]);
  if (authError) return error(authError, status);

  await connectDB();

  const now = new Date();
  const [
    totalUsers,
    activeUsers,
    totalProjects,
    taskStats,
    recentTasks,
    projects,
    recentUsers,
  ] = await Promise.all([
    User.countDocuments(),
    User.countDocuments({ status: "active" }),
    Project.countDocuments(),
    Task.aggregate([
      {
        $group: {
          _id: null,
          totalTasks: { $sum: 1 },
          completedTasks: {
            $sum: { $cond: [{ $eq: ["$status", "completed"] }, 1, 0] },
          },
          overdueTasks: {
            $sum: {
              $cond: [
                {
                  $and: [
                    { $ne: ["$status", "completed"] },
                    { $lt: ["$dueDate", now] },
                  ],
                },
                1,
                0,
              ],
            },
          },
        },
      },
    ]),
    Task.find()
      .select(
        "_id name description project assignedUser priority status dueDate createdAt updatedAt",
      )
      .populate("project", "name")
      .populate("assignedUser", "fullName")
      .sort({ createdAt: -1 })
      .limit(4)
      .lean(),
    Project.find().sort({ createdAt: -1 }).limit(3).lean(),
    User.find()
      .select("fullName email role status phone avatarUrl createdAt")
      .sort({ createdAt: -1 })
      .limit(4)
      .lean(),
  ]);

  const {
    totalTasks = 0,
    completedTasks = 0,
    overdueTasks = 0,
  } = taskStats[0] || {};

  const countsByProject = await getProjectTaskCounts(
    projects.map((project) => project._id),
  );
  const recentProjects = projects.map((project) => ({
    ...project,
    taskCount: countsByProject[project._id.toString()]?.taskCount ?? 0,
    completedCount:
      countsByProject[project._id.toString()]?.completedCount ?? 0,
  }));

  return success({
    stats: {
      totalUsers,
      activeUsers,
      totalProjects,
      totalTasks,
      completedTasks,
      overdueTasks,
    },
    recentProjects,
    recentTasks,
    recentUsers,
  });
}
