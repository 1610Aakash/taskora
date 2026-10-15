export async function readJsonBody(request, maxBytes) {
  const contentLength = Number(request.headers.get("content-length"));
  if (Number.isFinite(contentLength) && contentLength > maxBytes) {
    return { error: "Request is too large." };
  }

  if (!request.body) return { error: "A JSON request body is required." };

  const reader = request.body.getReader();
  const chunks = [];
  let totalBytes = 0;

  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      totalBytes += value.byteLength;
      if (totalBytes > maxBytes) {
        await reader.cancel();
        return { error: "Request is too large." };
      }
      chunks.push(value);
    }
  } catch {
    return { error: "Could not read the request body." };
  }

  const bytes = new Uint8Array(totalBytes);
  let offset = 0;
  for (const chunk of chunks) {
    bytes.set(chunk, offset);
    offset += chunk.byteLength;
  }

  try {
    const body = JSON.parse(new TextDecoder().decode(bytes));
    if (!body || typeof body !== "object" || Array.isArray(body)) {
      return { error: "Request body must be a JSON object." };
    }
    return { body };
  } catch {
    return { error: "Request body must contain valid JSON." };
  }
}
