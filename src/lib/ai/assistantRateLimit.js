const WINDOW_MS = 10 * 60 * 1000;
const MAX_REQUESTS = 12;
const requestsByUser = new Map();

export function checkAssistantRateLimit(userId, now = Date.now()) {
  const key = userId.toString();
  const recentRequests = (requestsByUser.get(key) || []).filter(
    (timestamp) => now - timestamp < WINDOW_MS,
  );

  if (recentRequests.length >= MAX_REQUESTS) {
    requestsByUser.set(key, recentRequests);
    return false;
  }

  recentRequests.push(now);
  requestsByUser.set(key, recentRequests);

  if (requestsByUser.size > 10_000) {
    for (const [user, timestamps] of requestsByUser) {
      if (timestamps.every((timestamp) => now - timestamp >= WINDOW_MS)) {
        requestsByUser.delete(user);
      }
    }
  }

  return true;
}
