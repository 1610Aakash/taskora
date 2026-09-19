import Link from "next/link";
import { ArrowRight, ListChecks } from "lucide-react";
import StatusBadge from "@/components/common/StatusBadge";
import PriorityTag from "@/components/common/PriorityTag";

export default function RecentTasksCard({ tasks }) {
  return (
    <div className="rounded-xl border border-border bg-card p-6">
      <div className="flex items-center justify-between">
        <h2 className="flex items-center gap-2 text-sm font-semibold text-foreground">
          <ListChecks className="h-4 w-4 text-primary" />
          My Recent Tasks
        </h2>
        <Link
          href="/user/my-tasks"
          className="flex items-center gap-1 text-xs text-primary hover:underline"
        >
          View all <ArrowRight className="h-3 w-3" />
        </Link>
      </div>

      <div className="mt-4 space-y-3">
        {tasks.map((t) => (
          <Link
            key={t.id}
            href={`/user/my-tasks/${t.id}`}
            className="flex items-center justify-between gap-3 rounded-lg border border-border p-3 transition-colors hover:border-primary/50"
          >
            <div className="min-w-0">
              <p className="truncate text-sm font-medium text-foreground">
                {t.name}
              </p>
              <p className="mt-0.5 text-xs text-muted">{t.projectName}</p>
            </div>
            <div className="flex shrink-0 flex-col items-end gap-1.5">
              <StatusBadge status={t.status} />
              <PriorityTag priority={t.priority} />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
