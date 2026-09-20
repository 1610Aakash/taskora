import { adminNotifications, userNotifications } from "@/lib/mock/mockNotifications";

export async function getNotificationsRequest(role) {
  await new Promise((r) => setTimeout(r, 700));
  return role === "admin" ? [...adminNotifications] : [...userNotifications];
}

export async function markNotificationReadRequest(role, notificationId) {
  await new Promise((r) => setTimeout(r, 300));
  const list = role === "admin" ? adminNotifications : userNotifications;
  const notif = list.find((n) => n.id === notificationId);
  if (notif) notif.read = true;
  return notif;
}

export async function markAllNotificationsReadRequest(role) {
  await new Promise((r) => setTimeout(r, 500));
  const list = role === "admin" ? adminNotifications : userNotifications;
  list.forEach((n) => (n.read = true));
  return list;
}