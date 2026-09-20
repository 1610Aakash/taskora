import Link from "next/link";
import { CalendarDays, Pencil } from "lucide-react";
import StatusBadge from "@/components/common/StatusBadge";

export default function AdminProjectCard({ project }) {
  const pct = Math.round((project.completedCount / project.taskCount) * 100);

  return (
    <div className="interactive-surface surface relative rounded-2xl p-5">
      <Link
        href={`/admin/projects/${project.id}/edit`}
        className="absolute right-4 top-4 text-muted hover:text-primary"
      >
        <Pencil className="h-4 w-4" />
      </Link>

      <Link href={`/admin/projects/${project.id}`} className="block pr-6">
        <div className="flex items-start justify-between gap-3">
          <p className="font-semibold text-foreground">{project.name}</p>
          <StatusBadge status={project.status} />
        </div>
        <p className="mt-1.5 line-clamp-2 text-sm text-muted">
          {project.description}
        </p>

        <div className="mt-5 h-2 w-full overflow-hidden rounded-full bg-background">
          <div
            className="h-full rounded-full bg-primary transition-all duration-500"
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
    </div>
  );
}
