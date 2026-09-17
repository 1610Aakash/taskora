const priorityStyles = {
  low: 'bg-success/20 text-success',
  medium: 'bg-warning/20 text-warning',
  high: 'bg-danger/20 text-danger',
};

export default function PriorityTag({ priority }) {
  const style = priorityStyles[priority] || 'bg-muted/20 text-muted';
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize ${style}`}>
      {priority}
    </span>
  );
}
