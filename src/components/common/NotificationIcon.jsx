import {
  UserPlus,
  AlertTriangle,
  CheckCircle2,
  UserX,
  ClipboardList,
  Clock,
  ArrowUpCircle,
  FolderKanban,
  Bell,
} from "lucide-react";

const CONFIG = {
  user_created: { icon: UserPlus, color: "text-primary bg-primary/15" },
  task_overdue: { icon: AlertTriangle, color: "text-danger bg-danger/15" },
  project_completed: {
    icon: CheckCircle2,
    color: "text-success bg-success/15",
  },
  task_completed: { icon: CheckCircle2, color: "text-success bg-success/15" },
  user_deactivated: { icon: UserX, color: "text-muted bg-muted/15" },
  task_assigned: { icon: ClipboardList, color: "text-primary bg-primary/15" },
  due_soon: { icon: Clock, color: "text-warning bg-warning/15" },
  task_updated: { icon: ArrowUpCircle, color: "text-info bg-info/15" },
  project_update: { icon: FolderKanban, color: "text-info bg-info/15" },
};

export default function NotificationIcon({ type }) {
  const { icon: Icon, color } = CONFIG[type] || {
    icon: Bell,
    color: "text-muted bg-muted/15",
  };
  return (
    <div
      className={`flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full ${color}`}
    >
      <Icon className="h-4.5 w-4.5" />
    </div>
  );
}
