const statusStyles = {
  todo: 'bg-muted/20 text-muted',
  in_progress: 'bg-info/20 text-info',
  done: 'bg-success/20 text-success',
  cancelled: 'bg-danger/20 text-danger',
};

const statusLabels = {
  todo: 'To Do',
  in_progress: 'In Progress',
  done: 'Done',
  cancelled: 'Cancelled',
};

export default function StatusBadge({ status }) {
  const style = statusStyles[status] || 'bg-muted/20 text-muted';
  const label = statusLabels[status] || status;
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${style}`}>
      {label}
    </span>
  );
}
