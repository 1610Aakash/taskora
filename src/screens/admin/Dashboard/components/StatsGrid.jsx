import {
  Users,
  FolderKanban,
  ListChecks,
  CheckCircle2,
  AlertTriangle,
} from "lucide-react";

export default function StatsGrid({ stats }) {
  const items = [
    {
      label: "Total Users",
      value: stats.totalUsers,
      icon: Users,
      color: "text-primary",
    },
    {
      label: "Active Users",
      value: stats.activeUsers,
      icon: Users,
      color: "text-info",
    },
    {
      label: "Total Projects",
      value: stats.totalProjects,
      icon: FolderKanban,
      color: "text-primary",
    },
    {
      label: "Total Tasks",
      value: stats.totalTasks,
      icon: ListChecks,
      color: "text-info",
    },
    {
      label: "Completed",
      value: stats.completedTasks,
      icon: CheckCircle2,
      color: "text-success",
    },
    {
      label: "Overdue",
      value: stats.overdueTasks,
      icon: AlertTriangle,
      color: "text-danger",
    },
  ];

  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
      {items.map(({ label, value, icon: Icon, color }) => (
        <div
          key={label}
          className="rounded-xl border border-border bg-card p-4"
        >
          <Icon className={`h-4.5 w-4.5 ${color}`} />
          <p className="mt-2 text-xl font-bold text-foreground">{value}</p>
          <p className="text-xs text-muted">{label}</p>
        </div>
      ))}
    </div>
  );
}
