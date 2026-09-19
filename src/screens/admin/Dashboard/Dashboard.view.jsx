"use client";

import { Loader2 } from "lucide-react";
import StatsGrid from "./components/StatsGrid";
import RecentProjectsCard from "./components/RecentProjectsCard";
import RecentTasksCard from "./components/RecentTasksCard";
import RecentUsersCard from "./components/RecentUsersCard";
import { useAdminDashboardViewModel } from "./Dashboard.viewmodel";

export default function AdminDashboardView() {
  const { data, loading } = useAdminDashboardViewModel();

  if (loading) {
    return (
      <div className="flex justify-center py-16">
        <Loader2 className="h-6 w-6 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">
          Welcome back, {data.admin.fullName.split(" ")[0]} 👋
        </h1>
        <p className="mt-1 text-sm text-muted">
          Here&apos;s an overview of your workspace.
        </p>
      </div>

      <StatsGrid stats={data.stats} />

      <div className="grid gap-6 md:grid-cols-2">
        <RecentProjectsCard projects={data.recentProjects} />
        <RecentTasksCard tasks={data.recentTasks} />
      </div>

      <RecentUsersCard users={data.recentUsers} />
    </div>
  );
}
