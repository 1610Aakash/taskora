import { CheckCircle2 } from "lucide-react";
import Button from "@/components/ui/Button";
import { TASK_STATUS_FLOW, TASK_STATUS_LABEL } from "@/lib/constants/status";

export default function TaskStatusUpdater({
  status,
  nextStatus,
  updating,
  onAdvance,
}) {
  return (
    <div className="rounded-xl border border-border bg-card p-6">
      <h2 className="text-sm font-semibold text-foreground">Update status</h2>

      <div className="mt-4 flex items-center gap-2">
        {TASK_STATUS_FLOW.map((s, i) => {
          const isDone = TASK_STATUS_FLOW.indexOf(status) >= i;
          return (
            <div key={s} className="flex flex-1 items-center gap-2">
              <div
                className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-semibold ${
                  isDone
                    ? "bg-primary text-primary-foreground"
                    : "border border-border text-muted"
                }`}
              >
                {isDone ? <CheckCircle2 className="h-4 w-4" /> : i + 1}
              </div>
              {i < TASK_STATUS_FLOW.length - 1 && (
                <div
                  className={`h-0.5 flex-1 ${isDone ? "bg-primary" : "bg-border"}`}
                />
              )}
            </div>
          );
        })}
      </div>
      <div className="mt-2 flex justify-between text-xs text-muted">
        {TASK_STATUS_FLOW.map((s) => (
          <span key={s}>{TASK_STATUS_LABEL[s]}</span>
        ))}
      </div>

      {nextStatus ? (
        <Button onClick={onAdvance} loading={updating} className="mt-5">
          Mark as {TASK_STATUS_LABEL[nextStatus]}
        </Button>
      ) : (
        <p className="mt-5 flex items-center justify-center gap-1.5 text-sm text-success">
          <CheckCircle2 className="h-4 w-4" />
          Task completed
        </p>
      )}
    </div>
  );
}
