import Link from "next/link";
import { ArrowRight, FolderKanban } from "lucide-react";
import StatusBadge from "@/components/common/StatusBadge";

export default function RecentProjectsCard({ projects }) {
  return (
    <div className="rounded-xl border border-border bg-card p-6">
      <div className="flex items-center justify-between">
        <h2 className="flex items-center gap-2 text-sm font-semibold text-foreground">
          <FolderKanban className="h-4 w-4 text-primary" />
          Recent Projects
        </h2>
        <Link
          href="/user/projects"
          className="flex items-center gap-1 text-xs text-primary hover:underline"
        >
          View all <ArrowRight className="h-3 w-3" />
        </Link>
      </div>

      <div className="mt-4 space-y-3">
        {projects.map((p) => (
          <Link
            key={p.id}
            href={`/user/projects/${p.id}`}
            className="block rounded-lg border border-border p-3 transition-colors hover:border-primary/50"
          >
            <div className="flex items-center justify-between gap-3">
              <p className="text-sm font-medium text-foreground">{p.name}</p>
              <StatusBadge status={p.status} />
            </div>
            <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-background">
              <div
                className="h-full rounded-full bg-primary"
                style={{
                  width: `${Math.round((p.completedCount / p.taskCount) * 100)}%`,
                }}
              />
            </div>
            <p className="mt-1.5 text-xs text-muted">
              {p.completedCount}/{p.taskCount} tasks completed
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}
