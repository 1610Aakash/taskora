const BASE_URL = "/api";

async function request(path, options = {}) {
  const res = await fetch(`${BASE_URL}${path}`, {
    credentials: "include", // sends the httpOnly cookie automatically
    headers: { "Content-Type": "application/json", ...(options.headers || {}) },
    ...options,
  });

  const data = await res.json().catch(() => ({}));

  if (!res.ok || data.success === false) {
    throw new Error(data.error || "Something went wrong. Please try again.");
  }

  return data.data;
}

export const apiGet = (path) => request(path);
export const apiPost = (path, body) =>
  request(path, { method: "POST", body: JSON.stringify(body) });
export const apiPatch = (path, body) =>
  request(path, { method: "PATCH", body: JSON.stringify(body) });
export const apiDelete = (path) => request(path, { method: "DELETE" });
