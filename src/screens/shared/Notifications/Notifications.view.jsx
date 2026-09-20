"use client";

import { Loader2, Bell, CheckCheck } from "lucide-react";
import SectionLayout from "@/components/layout/SectionLayout";
import NotificationItem from "./components/NotificationItem";
import { useNotificationsViewModel } from "./Notifications.viewmodel";

export default function NotificationsView() {
  const {
    role,
    notifications,
    loading,
    unreadCount,
    markingAll,
    onMarkRead,
    onMarkAllRead,
  } = useNotificationsViewModel();
  const backHref = role === "admin" ? "/admin/dashboard" : "/user/dashboard";

  return (
    <SectionLayout
      title="Notifications"
      subtitle={
        unreadCount > 0 ? `${unreadCount} unread` : "You're all caught up."
      }
      backHref={backHref}
      backLabel="Back to dashboard"
    >
      {!loading && unreadCount > 0 && (
        <button
          onClick={onMarkAllRead}
          disabled={markingAll}
          className="mb-4 flex items-center gap-1.5 text-sm text-primary hover:underline disabled:opacity-60"
        >
          <CheckCheck className="h-4 w-4" />
          Mark all as read
        </button>
      )}

      {loading ? (
        <div className="flex justify-center py-10">
          <Loader2 className="h-6 w-6 animate-spin text-primary" />
        </div>
      ) : notifications.length === 0 ? (
        <div className="flex flex-col items-center gap-2 py-12 text-center">
          <Bell className="h-8 w-8 text-muted" />
          <p className="text-sm text-muted">No notifications yet.</p>
        </div>
      ) : (
        <div className="divide-y divide-border overflow-hidden rounded-xl border border-border">
          {notifications.map((n) => (
            <NotificationItem
              key={n.id}
              notification={n}
              onMarkRead={onMarkRead}
            />
          ))}
        </div>
      )}
    </SectionLayout>
  );
}
