"use client";

import Link from "next/link";
import {
  Loader2,
  Pencil,
  CalendarDays,
  FolderKanban,
  User,
} from "lucide-react";
import PriorityTag from "@/components/common/PriorityTag";
import TaskStatusControl from "./components/TaskStatusControl";
import { useAdminTaskDetailsViewModel } from "./TaskDetails.viewmodel";

export default function AdminTaskDetailsView({ taskId }) {
  const { task, loading, error, updating, onStatusChange } =
    useAdminTaskDetailsViewModel(taskId);

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
      <div className="rounded-xl border border-border bg-card p-6">
        <div className="flex items-start justify-between gap-3">
          <h1 className="text-xl font-bold text-foreground">{task.name}</h1>
          <Link
            href={`/admin/tasks/${task.id}/edit`}
            className="text-muted hover:text-primary"
          >
            <Pencil className="h-4 w-4" />
          </Link>
        </div>
        <p className="mt-2 text-sm text-muted">{task.description}</p>

        <div className="mt-5 flex flex-wrap items-center gap-5 text-sm text-muted">
          <span className="flex items-center gap-1.5">
            <FolderKanban className="h-4 w-4" />
            {task.projectName}
          </span>
          <span className="flex items-center gap-1.5">
            <User className="h-4 w-4" />
            {task.assignedUserName}
          </span>
          <span className="flex items-center gap-1.5">
            <CalendarDays className="h-4 w-4" />
            Due{" "}
            {new Date(task.dueDate).toLocaleDateString("en-IN", {
              month: "short",
              day: "numeric",
              year: "numeric",
            })}
          </span>
          <PriorityTag priority={task.priority} />
        </div>
      </div>

      <TaskStatusControl
        status={task.status}
        updating={updating}
        onStatusChange={onStatusChange}
      />
    </div>
  );
}
