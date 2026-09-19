"use client";

import { Loader2 } from "lucide-react";
import TaskInfoCard from "./components/TaskInfoCard";
import TaskStatusUpdater from "./components/TaskStatusUpdater";
import { useTaskDetailsViewModel } from "./TaskDetails.viewmodel";

export default function TaskDetailsView({ taskId }) {
  const { task, loading, error, updating, nextStatus, advanceStatus } =
    useTaskDetailsViewModel(taskId);

  if (loading) {
    return (
      <div className="flex justify-center py-16">
        <Loader2 className="h-6 w-6 animate-spin text-primary" />
      </div>
    );
  }

  if (error) {
    return <p className="py-16 text-center text-sm text-danger">{error}</p>;
  }

  return (
    <div className="space-y-6">
      <TaskInfoCard task={task} />
      <TaskStatusUpdater
        status={task.status}
        nextStatus={nextStatus}
        updating={updating}
        onAdvance={advanceStatus}
      />
    </div>
  );
}
