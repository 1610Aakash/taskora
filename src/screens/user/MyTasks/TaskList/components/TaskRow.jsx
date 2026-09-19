import Link from "next/link";
import { CalendarDays } from "lucide-react";
import StatusBadge from "@/components/common/StatusBadge";
import PriorityTag from "@/components/common/PriorityTag";

export default function TaskRow({ task }) {
  return (
    <Link
      href={`/user/my-tasks/${task.id}`}
      className="flex items-center justify-between gap-3 p-4 transition-colors hover:bg-background"
    >
      <div className="min-w-0">
        <p className="truncate text-sm font-medium text-foreground">
          {task.name}
        </p>
        <p className="mt-0.5 text-xs text-muted">{task.projectName}</p>
      </div>
      <div className="flex shrink-0 items-center gap-4">
        <span className="flex items-center gap-1 text-xs text-muted">
          <CalendarDays className="h-3.5 w-3.5" />
          {new Date(task.dueDate).toLocaleDateString("en-IN", {
            month: "short",
            day: "numeric",
          })}
        </span>
        <PriorityTag priority={task.priority} />
        <StatusBadge status={task.status} />
      </div>
    </Link>
  );
}
