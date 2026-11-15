import { launcherDownloadPath } from "../app/distribution";

const defaultOrigin = "https://de-bots6.h1cloud.net:25237";
const attachment = 'attachment; filename="ArtemikDLCLauncher.exe"';
const headers = {
  "Cache-Control": "no-store",
  "X-Content-Type-Options": "nosniff",
};

function errorResponse(method: string, status: number, text: string, extra?: Record<string, string>) {
  return new Response(method === "HEAD" ? null : text, {
    status,
    headers: { ...headers, "Content-Type": "text/plain; charset=utf-8", ...extra },
  });
}

export async function downloadLauncher(request: Request, configuredOrigin?: string, localPreview = false) {
  const { method } = request;
  if (method !== "GET" && method !== "HEAD") {
    return errorResponse(method, 405, "Допустимы только GET и HEAD.", { Allow: "GET, HEAD" });
  }

  const unavailable = () => errorResponse(method, 503, "Лаунчер временно недоступен. Попробуй скачать его позже.");
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 8_000);
  let upstream: Response;
  try {
    const origin = new URL(configuredOrigin || defaultOrigin);
    const loopback = origin.hostname === "127.0.0.1" || origin.hostname === "localhost";
    if (origin.username || origin.password ||
        (origin.protocol !== "https:" && !(localPreview && loopback && origin.protocol === "http:"))) {
      return unavailable();
    }
    upstream = await fetch(new URL(launcherDownloadPath, origin), {
      method,
      redirect: "manual",
      cache: "no-store",
      signal: controller.signal,
      headers: { "Accept-Encoding": "identity" },
    });
  } catch {
    return unavailable();
  } finally {
    // The timeout covers connection and headers; a slow download can still finish.
    clearTimeout(timeout);
  }

  const length = upstream.headers.get("Content-Length");
  if (upstream.status !== 200 ||
      upstream.headers.get("Content-Type") !== "application/octet-stream" ||
      !length || !/^[1-9]\d*$/.test(length) ||
      (method === "GET" && !upstream.body)) {
    await upstream.body?.cancel().catch(() => {});
    return unavailable();
  }

  return new Response(method === "HEAD" ? null : upstream.body, {
    headers: {
      ...headers,
      "Content-Type": "application/octet-stream",
      "Content-Length": length,
      "Content-Disposition": attachment,
    },
  });
}
