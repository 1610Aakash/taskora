import { CalendarDays, FolderKanban } from "lucide-react";
import StatusBadge from "@/components/common/StatusBadge";
import PriorityTag from "@/components/common/PriorityTag";

export default function TaskInfoCard({ task }) {
  return (
    <div className="rounded-xl border border-border bg-card p-6">
      <div className="flex items-start justify-between gap-3">
        <h1 className="text-xl font-bold text-foreground">{task.name}</h1>
        <StatusBadge status={task.status} />
      </div>
      <p className="mt-2 text-sm text-muted">{task.description}</p>

      <div className="mt-5 flex flex-wrap items-center gap-5 text-sm text-muted">
        <span className="flex items-center gap-1.5">
          <FolderKanban className="h-4 w-4" />
          {task.projectName}
        </span>
        <span className="flex items-center gap-1.5">
          <CalendarDays className="h-4 w-4" />
          Due{" "}
          {new Date(task.dueDate).toLocaleDateString("en-IN", {
            month: "short",
            day: "numeric",
            year: "numeric",
          })}
        </span>
        <PriorityTag priority={task.priority} />
      </div>
    </div>
  );
}
