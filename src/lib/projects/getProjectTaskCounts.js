import Task from "@/models/Task";

export async function getProjectTaskCounts(projectIds) {
  if (projectIds.length === 0) return {};

  const counts = await Task.aggregate([
    { $match: { project: { $in: projectIds } } },
    {
      $group: {
        _id: "$project",
        taskCount: { $sum: 1 },
        completedCount: {
          $sum: { $cond: [{ $eq: ["$status", "completed"] }, 1, 0] },
        },
      },
    },
  ]);

  return Object.fromEntries(
    counts.map(({ _id, taskCount, completedCount }) => [
      _id.toString(),
      { taskCount, completedCount },
    ]),
  );
}
