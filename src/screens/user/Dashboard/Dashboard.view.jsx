"use client";

import { Loader2 } from "lucide-react";
import WelcomeHeader from "./components/WelcomeHeader";
import RecentProjectsCard from "./components/RecentProjectsCard";
import RecentTasksCard from "./components/RecentTasksCard";
import { useDashboardViewModel } from "./Dashboard.viewmodel";

export default function DashboardView() {
  const { data, loading } = useDashboardViewModel();

  if (loading) {
    return (
      <div className="flex justify-center py-16">
        <Loader2 className="h-6 w-6 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <WelcomeHeader name={data.user.fullName} />
      <div className="grid gap-6 md:grid-cols-2">
        <RecentProjectsCard projects={data.recentProjects} />
        <RecentTasksCard tasks={data.recentTasks} />
      </div>
    </div>
  );
}
