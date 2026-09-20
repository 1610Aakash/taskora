"use client";

import { DashboardSkeleton } from "@/components/common/Skeleton";
import WelcomeHeader from "./components/WelcomeHeader";
import RecentProjectsCard from "./components/RecentProjectsCard";
import RecentTasksCard from "./components/RecentTasksCard";
import { useDashboardViewModel } from "./Dashboard.viewmodel";
import { MotionItem, MotionPage } from "@/components/animations/Motion";

export default function DashboardView() {
  const { user, data, loading } = useDashboardViewModel();

  if (loading || !data) {
    return <DashboardSkeleton />;
  }

  return (
    <MotionPage className="space-y-7">
      <MotionItem><WelcomeHeader name={user?.fullName} /></MotionItem>
      <MotionItem><div className="grid gap-6 md:grid-cols-2">
        <RecentProjectsCard projects={data.recentProjects} />
        <RecentTasksCard tasks={data.recentTasks} />
      </div></MotionItem>
    </MotionPage>
  );
}
