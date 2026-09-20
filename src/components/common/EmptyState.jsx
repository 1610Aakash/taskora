import { Inbox } from "lucide-react";

export default function EmptyState({ title = "Nothing here yet", description, action, icon: Icon = Inbox }) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 rounded-xl border border-dashed border-border bg-background/30 px-6 py-16 text-center">
      <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-border bg-card text-primary"><Icon className="h-5 w-5" /></div>
      <h3 className="text-lg font-semibold text-foreground">{title}</h3>
      {description && <p className="max-w-sm text-sm leading-6 text-muted">{description}</p>}
      {action && <div className="mt-2">{action}</div>}
    </div>
  );
}
