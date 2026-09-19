import { CalendarDays } from "lucide-react";
import StatusBadge from "@/components/common/StatusBadge";

export default function ProjectSummaryHeader({ project }) {
  const pct = Math.round((project.completedCount / project.taskCount) * 100);

  return (
    <div className="rounded-xl border border-border bg-card p-6">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h1 className="text-xl font-bold text-foreground">{project.name}</h1>
          <p className="mt-1 text-sm text-muted">{project.description}</p>
        </div>
        <StatusBadge status={project.status} />
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
  );
}
