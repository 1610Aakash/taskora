import { apiGet, apiPatch } from "@/lib/api/client";
import { normalizeNotification } from "@/lib/utils/normalize";

export async function getNotificationsRequest() {
  const data = await apiGet("/notifications");
  return data.notifications.map(normalizeNotification);
}

export async function markNotificationReadRequest(notificationId) {
  const data = await apiPatch(`/notifications/${notificationId}`, {});
  return normalizeNotification(data.notification);
}

export async function markAllNotificationsReadRequest() {
  return apiPatch("/notifications", {});
}
