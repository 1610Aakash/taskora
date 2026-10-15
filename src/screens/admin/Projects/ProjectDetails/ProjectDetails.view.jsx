"use client";

import Link from "next/link";
import { useState } from "react";
import { CalendarDays, Loader2, Pencil, Sparkles } from "lucide-react";
import StatusBadge from "@/components/common/StatusBadge";
import ProjectTaskList from "./components/ProjectTaskList";
import AiTaskBreakdownDialog from "./components/AiTaskBreakdownDialog";
import { useAdminProjectDetailsViewModel } from "./ProjectDetails.viewmodel";

export default function AdminProjectDetailsView({ projectId }) {
  const { project, tasks, loading, error, refresh } =
    useAdminProjectDetailsViewModel(projectId);
  const [breakdownOpen, setBreakdownOpen] = useState(false);

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

  const pct = project.taskCount
    ? Math.round((project.completedCount / project.taskCount) * 100)
    : 0;

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
        <div className="mb-3 flex flex-wrap items-center justify-between gap-3">
          <h2 className="text-sm font-semibold text-foreground">
            Tasks in this project
          </h2>
          <button
            type="button"
            onClick={() => setBreakdownOpen(true)}
            className="inline-flex items-center gap-2 rounded-lg border border-primary/40 bg-primary/10 px-4 py-2 text-sm font-semibold text-primary transition-colors hover:bg-primary/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          >
            <Sparkles className="h-4 w-4" />
            Break Down with AI
          </button>
        </div>
        <ProjectTaskList tasks={tasks} />
      </div>

      <AiTaskBreakdownDialog
        key={project.id}
        open={breakdownOpen}
        onClose={() => setBreakdownOpen(false)}
        project={project}
        onSaved={refresh}
      />
    </div>
  );
}
