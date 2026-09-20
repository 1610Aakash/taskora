const STYLES = {
  todo: "bg-muted/15 text-muted",
  "in-progress": "bg-info/15 text-info",
  completed: "bg-success/15 text-success",
  "on-hold": "bg-warning/15 text-warning",
};

const LABELS = {
  todo: "To Do",
  "in-progress": "In Progress",
  completed: "Completed",
  "on-hold": "On Hold",
};

export default function StatusBadge({ status }) {
  return (
    <span
      className={`inline-flex items-center rounded-full border border-current/10 px-2.5 py-1 text-[11px] font-semibold tracking-wide ${STYLES[status] || STYLES.todo}`}
    >
      {LABELS[status] || status}
    </span>
  );
}
