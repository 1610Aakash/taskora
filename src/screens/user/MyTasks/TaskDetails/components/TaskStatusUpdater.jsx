import { CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";
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

      <div className="relative mt-4 px-0.5">
        <div className="absolute left-3.5 right-3.5 top-3.5 h-0.5 bg-border" />
        <motion.div
          initial={{ scaleX: 0, transformOrigin: "left" }}
          animate={{ scaleX: TASK_STATUS_FLOW.indexOf(status) / (TASK_STATUS_FLOW.length - 1) }}
          transition={{ duration: 0.45, ease: "easeOut" }}
          className="absolute left-3.5 right-3.5 top-3.5 h-0.5 bg-primary"
        />
        <div className="relative grid grid-cols-3 items-center">
          {TASK_STATUS_FLOW.map((s, i) => {
            const isDone = TASK_STATUS_FLOW.indexOf(status) >= i;
            return (
              <div
                key={s}
                className={`flex ${i === 0 ? "justify-start" : i === TASK_STATUS_FLOW.length - 1 ? "justify-end" : "justify-center"}`}
              >
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: i * 0.08, duration: 0.25 }}
                  className={`flex h-7 w-7 items-center justify-center rounded-full text-xs font-semibold ring-4 ring-card ${
                    isDone
                      ? "bg-primary text-primary-foreground"
                      : "border border-border bg-card text-muted"
                  }`}
                >
                  {isDone ? <CheckCircle2 className="h-4 w-4" /> : i + 1}
                </motion.div>
              </div>
            );
          })}
        </div>
      </div>
      <div className="mt-2 grid grid-cols-3 text-xs text-muted">
        {TASK_STATUS_FLOW.map((s) => (
          <span key={s} className="text-center first:text-left last:text-right">
            {TASK_STATUS_LABEL[s]}
          </span>
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
