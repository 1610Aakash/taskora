"use client";

import { Loader2, Bell, CheckCheck } from "lucide-react";
import SectionLayout from "@/components/layout/SectionLayout";
import NotificationItem from "./components/NotificationItem";
import { useNotificationsViewModel } from "./Notifications.viewmodel";
import EmptyState from "@/components/common/EmptyState";
import { MotionItem, MotionPage } from "@/components/animations/Motion";

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
      <MotionPage>
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
        <EmptyState icon={Bell} title="You are all caught up" description="New assignments and project updates will appear here." />
      ) : (
        <div className="surface divide-y divide-border-subtle overflow-hidden rounded-2xl">
          {notifications.map((n) => (
            <MotionItem key={n.id}><NotificationItem
              notification={n}
              onMarkRead={onMarkRead}
            /></MotionItem>
          ))}
        </div>
      )}
      </MotionPage>
    </SectionLayout>
  );
}
