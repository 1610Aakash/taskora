import Link from "next/link";
import StatusBadge from "@/components/common/StatusBadge";
import PriorityTag from "@/components/common/PriorityTag";

export default function ProjectTaskList({ tasks }) {
  if (tasks.length === 0) {
    return (
      <p className="text-sm text-muted">
        No tasks have been added to this project yet.
      </p>
    );
  }

  return (
    <div className="divide-y divide-border overflow-hidden rounded-xl border border-border bg-card">
      {tasks.map((t) => (
        <Link
          key={t.id}
          href={`/admin/tasks/${t.id}`}
          className="flex items-center justify-between gap-3 p-4 transition-colors hover:bg-background"
        >
          <div className="min-w-0">
            <p className="truncate text-sm font-medium text-foreground">
              {t.name}
            </p>
            <p className="mt-0.5 truncate text-xs text-muted">
              Assigned to {t.assignedUserName}
            </p>
          </div>
          <div className="flex shrink-0 flex-col items-end gap-1.5">
            <StatusBadge status={t.status} />
            <PriorityTag priority={t.priority} />
          </div>
        </Link>
      ))}
    </div>
  );
}
