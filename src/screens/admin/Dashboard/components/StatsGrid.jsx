import {
  Users,
  FolderKanban,
  ListChecks,
  CheckCircle2,
  AlertTriangle,
} from "lucide-react";
import { motion } from "framer-motion";

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
      {items.map(({ label, value, icon: Icon, color }, index) => (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.05, duration: 0.25 }}
          key={label}
          className="interactive-surface surface rounded-2xl p-4"
        >
          <div className="flex items-center justify-between"><Icon className={`h-4.5 w-4.5 ${color}`} /><span className="h-1.5 w-1.5 rounded-full bg-current opacity-50" /></div>
          <p className="mt-5 text-2xl font-semibold tracking-tight text-foreground">{value}</p>
          <p className="mt-1 text-xs font-medium text-muted">{label}</p>
        </motion.div>
      ))}
    </div>
  );
}
