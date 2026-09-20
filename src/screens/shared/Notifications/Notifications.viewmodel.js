"use client";

import { useState, useEffect, useMemo } from "react";
import { useSearchParams } from "next/navigation";
import {
  getNotificationsRequest,
  markNotificationReadRequest,
  markAllNotificationsReadRequest,
} from "./Notifications.model";

export function useNotificationsViewModel() {
  const searchParams = useSearchParams();
  const role = searchParams.get("role") === "admin" ? "admin" : "user";

  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [markingAll, setMarkingAll] = useState(false);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    getNotificationsRequest(role).then((data) => {
      if (!cancelled) {
        setNotifications(data);
        setLoading(false);
      }
    });
    return () => {
      cancelled = true;
    };
  }, [role]);

  const unreadCount = useMemo(
    () => notifications.filter((n) => !n.read).length,
    [notifications],
  );

  const onMarkRead = async (id) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n)),
    );
    await markNotificationReadRequest(role, id);
  };

  const onMarkAllRead = async () => {
    setMarkingAll(true);
    try {
      await markAllNotificationsReadRequest(role);
      setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
    } finally {
      setMarkingAll(false);
    }
  };

  return {
    role,
    notifications,
    loading,
    unreadCount,
    markingAll,
    onMarkRead,
    onMarkAllRead,
  };
}
