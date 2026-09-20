"use client";

import Link from "next/link";
import NotificationIcon from "@/components/common/NotificationIcon";
import { formatRelativeTime } from "@/lib/utils/formatRelativeTime";

export default function NotificationItem({ notification, onMarkRead }) {
  return (
    <Link
      href={notification.link}
      onClick={() => !notification.read && onMarkRead(notification.id)}
      className={`group flex items-start gap-3 p-4 transition-colors hover:bg-card-elevated ${
        !notification.read ? "bg-primary/[0.07]" : ""
      }`}
    >
      <NotificationIcon type={notification.type} />
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2">
          <p className="text-sm font-medium text-foreground">
            {notification.title}
          </p>
          {!notification.read && (
            <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
          )}
        </div>
        <p className="mt-0.5 text-sm text-muted">{notification.message}</p>
        <p className="mt-1 text-xs text-muted">
          {formatRelativeTime(notification.createdAt)}
        </p>
      </div>
    </Link>
  );
}
