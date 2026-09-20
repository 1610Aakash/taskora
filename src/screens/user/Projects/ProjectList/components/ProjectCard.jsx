import Link from "next/link";
import { CalendarDays } from "lucide-react";
import StatusBadge from "@/components/common/StatusBadge";

export default function ProjectCard({ project }) {
  const pct = Math.round((project.completedCount / project.taskCount) * 100);

  return (
    <Link
      href={`/user/projects/${project.id}`}
      className="interactive-surface surface block rounded-2xl p-5"
    >
      <div className="flex items-start justify-between gap-3">
        <p className="font-semibold text-foreground">{project.name}</p>
        <StatusBadge status={project.status} />
      </div>
      <p className="mt-1.5 line-clamp-2 text-sm text-muted">
        {project.description}
      </p>

      <div className="mt-5 h-2 w-full overflow-hidden rounded-full bg-background">
        <div
          className="h-full rounded-full bg-primary"
          style={{ width: `${pct}%` }}
        />
      </div>
      <div className="mt-2 flex items-center justify-between text-xs text-muted">
        <span>
          {project.completedCount}/{project.taskCount} tasks
        </span>
        <span className="flex items-center gap-1">
          <CalendarDays className="h-3.5 w-3.5" />
          {new Date(project.dueDate).toLocaleDateString("en-IN", {
            month: "short",
            day: "numeric",
          })}
        </span>
      </div>
    </Link>
  );
}
