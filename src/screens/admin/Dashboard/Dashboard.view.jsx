"use client";

import { DashboardSkeleton } from "@/components/common/Skeleton";
import StatsGrid from "./components/StatsGrid";
import RecentProjectsCard from "./components/RecentProjectsCard";
import RecentTasksCard from "./components/RecentTasksCard";
import RecentUsersCard from "./components/RecentUsersCard";
import { useAdminDashboardViewModel } from "./Dashboard.viewmodel";
import { MotionItem, MotionPage } from "@/components/animations/Motion";

export default function AdminDashboardView() {
  const { admin, data, loading } = useAdminDashboardViewModel();

  if (loading || !data) {
    return <DashboardSkeleton />;
  }

  return (
    <MotionPage className="space-y-7">
      <MotionItem>
        <h1 className="text-2xl font-bold text-foreground">
          Welcome back, {admin?.fullName?.split(" ")[0]} 👋
        </h1>
        <p className="mt-1 text-sm text-muted">
          Here&apos;s an overview of your workspace.
        </p>
      </MotionItem>

      <MotionItem><StatsGrid stats={data.stats} /></MotionItem>

      <MotionItem><div className="grid gap-6 md:grid-cols-2">
        <RecentProjectsCard projects={data.recentProjects} />
        <RecentTasksCard tasks={data.recentTasks} />
      </div></MotionItem>

      <MotionItem><RecentUsersCard users={data.recentUsers} /></MotionItem>
    </MotionPage>
  );
}
