import Link from "next/link";
import { CalendarDays, Pencil } from "lucide-react";
import StatusBadge from "@/components/common/StatusBadge";
import PriorityTag from "@/components/common/PriorityTag";

export default function AdminTaskRow({ task }) {
  return (
    <div className="group flex items-center justify-between gap-3 p-4 transition-colors hover:bg-card-elevated">
      <Link href={`/admin/tasks/${task.id}`} className="min-w-0 flex-1">
          <p className="truncate text-sm font-semibold text-foreground transition-colors group-hover:text-primary">
          {task.name}
        </p>
        <p className="mt-0.5 text-xs text-muted">
          {task.projectName} · Assigned to {task.assignedUserName}
        </p>
      </Link>
      <div className="flex flex-shrink-0 items-center gap-4">
        <span className="flex items-center gap-1 text-xs text-muted">
          <CalendarDays className="h-3.5 w-3.5" />
          {new Date(task.dueDate).toLocaleDateString("en-IN", {
            month: "short",
            day: "numeric",
          })}
        </span>
        <PriorityTag priority={task.priority} />
        <StatusBadge status={task.status} />
        <Link
          href={`/admin/tasks/${task.id}/edit`}
          className="text-muted hover:text-primary"
        >
          <Pencil className="h-3.5 w-3.5" />
        </Link>
      </div>
    </div>
  );
}
