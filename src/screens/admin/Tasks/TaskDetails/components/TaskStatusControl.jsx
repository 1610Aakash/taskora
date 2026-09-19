"use client";

import { Loader2 } from "lucide-react";
import Select from "@/components/ui/Select";
import { TASK_STATUS_OPTIONS } from "@/lib/constants/options";

export default function TaskStatusControl({
  status,
  updating,
  onStatusChange,
}) {
  return (
    <div className="rounded-xl border border-border bg-card p-6">
      <h2 className="text-sm font-semibold text-foreground">Status</h2>
      <div className="mt-3 flex items-center gap-3">
        <Select
          id="status"
          options={TASK_STATUS_OPTIONS}
          value={status}
          onChange={(e) => onStatusChange(e.target.value)}
          disabled={updating}
        />
        {updating && (
          <Loader2 className="h-4 w-4 shrink-0 animate-spin text-primary" />
        )}
      </div>
    </div>
  );
}
