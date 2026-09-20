import Notification from "@/models/Notification";

export async function notifyAdmin({ type, title, message, link }) {
  await Notification.create({ audience: "admin", type, title, message, link });
}

export async function notifyUser({ userId, type, title, message, link }) {
  await Notification.create({
    audience: "user",
    user: userId,
    type,
    title,
    message,
    link,
  });
}
