export default function EmptyState({ title = 'Nothing here yet', description, action }) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 py-16 text-center">
      <div className="text-4xl">📭</div>
      <h3 className="text-foreground font-semibold text-lg">{title}</h3>
      {description && <p className="text-muted text-sm max-w-sm">{description}</p>}
      {action && <div className="mt-2">{action}</div>}
    </div>
  );
}
