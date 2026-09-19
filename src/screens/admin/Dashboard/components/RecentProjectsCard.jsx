import Link from "next/link";
import { ArrowRight, FolderKanban, Pencil } from "lucide-react";
import StatusBadge from "@/components/common/StatusBadge";

export default function RecentProjectsCard({ projects }) {
  return (
    <div className="rounded-xl border border-border bg-card p-6">
      <div className="flex items-center justify-between">
        <h2 className="flex items-center gap-2 text-sm font-semibold text-foreground">
          <FolderKanban className="h-4 w-4 text-primary" />
          Ongoing Projects
        </h2>
        <Link
          href="/admin/projects"
          className="flex items-center gap-1 text-xs text-primary hover:underline"
        >
          View all <ArrowRight className="h-3 w-3" />
        </Link>
      </div>

      <div className="mt-4 space-y-3">
        {projects.map((p) => (
          <div key={p.id} className="rounded-lg border border-border p-3">
            <div className="flex items-center justify-between gap-3">
              <Link
                href={`/admin/projects/${p.id}`}
                className="truncate text-sm font-medium text-foreground hover:text-primary"
              >
                {p.name}
              </Link>
              <div className="flex items-center gap-2">
                <StatusBadge status={p.status} />
                <Link
                  href={`/admin/projects/${p.id}/edit`}
                  className="text-muted hover:text-primary"
                >
                  <Pencil className="h-3.5 w-3.5" />
                </Link>
              </div>
            </div>
            <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-background">
              <div
                className="h-full rounded-full bg-primary"
                style={{
                  width: `${Math.round((p.completedCount / p.taskCount) * 100)}%`,
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
