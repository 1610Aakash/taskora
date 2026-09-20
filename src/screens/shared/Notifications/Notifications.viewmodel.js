"use client";

import { useState, useEffect, useMemo } from "react";
import { useAuth } from "@/context/AuthContext";
import {
  getNotificationsRequest,
  markNotificationReadRequest,
  markAllNotificationsReadRequest,
} from "./Notifications.model";

export function useNotificationsViewModel() {
  const { user } = useAuth();
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [markingAll, setMarkingAll] = useState(false);

  useEffect(() => {
    let cancelled = false;
    getNotificationsRequest().then((data) => {
      if (!cancelled) {
        setNotifications(data);
        setLoading(false);
      }
    });
    return () => {
      cancelled = true;
    };
  }, []);

  const unreadCount = useMemo(
    () => notifications.filter((n) => !n.read).length,
    [notifications],
  );

  const onMarkRead = async (id) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n)),
    );
    await markNotificationReadRequest(id);
  };

  const onMarkAllRead = async () => {
    setMarkingAll(true);
    try {
      await markAllNotificationsReadRequest();
      setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
    } finally {
      setMarkingAll(false);
    }
  };

  return {
    role: user?.role,
    notifications,
    loading,
    unreadCount,
    markingAll,
    onMarkRead,
    onMarkAllRead,
  };
}
