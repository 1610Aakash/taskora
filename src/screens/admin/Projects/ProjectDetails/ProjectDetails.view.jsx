"use client";

import Link from "next/link";
import { Loader2, Pencil, CalendarDays } from "lucide-react";
import StatusBadge from "@/components/common/StatusBadge";
import ProjectTaskList from "./components/ProjectTaskList";
import { useAdminProjectDetailsViewModel } from "./ProjectDetails.viewmodel";

export default function AdminProjectDetailsView({ projectId }) {
  const { project, tasks, loading, error } =
    useAdminProjectDetailsViewModel(projectId);

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

  const pct = Math.round((project.completedCount / project.taskCount) * 100);

  return (
    <div className="space-y-6">
      <div className="rounded-xl border border-border bg-card p-6">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h1 className="text-xl font-bold text-foreground">
              {project.name}
            </h1>
            <p className="mt-1 text-sm text-muted">{project.description}</p>
          </div>
          <div className="flex flex-shrink-0 items-center gap-3">
            <StatusBadge status={project.status} />
            <Link
              href={`/admin/projects/${project.id}/edit`}
              className="text-muted hover:text-primary"
            >
              <Pencil className="h-4 w-4" />
            </Link>
          </div>
        </div>

        <div className="mt-5 flex items-center gap-6 text-sm">
          <div className="flex items-center gap-1.5 text-muted">
            <CalendarDays className="h-4 w-4" />
            Due{" "}
            {new Date(project.dueDate).toLocaleDateString("en-IN", {
              month: "short",
              day: "numeric",
              year: "numeric",
            })}
          </div>
          <div className="text-muted">
            <span className="font-medium text-foreground">
              {project.completedCount}/{project.taskCount}
            </span>{" "}
            tasks completed
          </div>
        </div>

        <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-background">
          <div
            className="h-full rounded-full bg-primary"
            style={{ width: `${pct}%` }}
          />
        </div>
      </div>

      <div>
        <h2 className="mb-3 text-sm font-semibold text-foreground">
          Tasks in this project
        </h2>
        <ProjectTaskList tasks={tasks} />
      </div>
    </div>
  );
}
