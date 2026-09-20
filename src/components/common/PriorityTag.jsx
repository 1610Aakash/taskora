import { Flag } from "lucide-react";

const STYLES = { low: "text-muted", medium: "text-info", high: "text-warning", urgent: "text-danger" };
const LABELS = { low: "Low", medium: "Medium", high: "High", urgent: "Urgent" };

export default function PriorityTag({ priority }) {
  return (
    <span className={`inline-flex items-center gap-1 text-xs font-semibold ${STYLES[priority] || STYLES.low}`}>
      <Flag className="h-3 w-3" />
      {LABELS[priority] || priority}
    </span>
  );
}