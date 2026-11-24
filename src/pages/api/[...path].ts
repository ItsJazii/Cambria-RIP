import { env } from "node:process";
import type { APIRoute } from "astro";

export const prerender = false;

export const ALL: APIRoute = async ({ request }) => {
  const incoming = new URL(request.url);
  const upstream = new URL("https://cambria-reports.jazib5876.workers.dev");
  upstream.pathname = incoming.pathname;
  upstream.search = incoming.search;

  const headers = new Headers();
  for (const name of ["authorization", "content-type"]) {
    const value = request.headers.get(name);
    if (value !== null) headers.set(name, value);
  }

  const ip = request.headers.get("x-vercel-forwarded-for");
  const secret = env.WORKER_PROXY_SECRET;
  if (ip && secret) {
    headers.set("x-forwarded-for", ip);
    headers.set("x-worker-proxy-secret", secret);
  }

  const init = {
    method: request.method,
    body: request.body,
    headers,
    duplex: "half",
    redirect: "manual",
  } as const;
  const response = await fetch(upstream, init);
  const responseHeaders = new Headers(response.headers);
  for (const name of responseHeaders.get("connection")?.split(",") ?? []) {
    if (name.trim()) responseHeaders.delete(name.trim());
  }
  for (const name of [
    "connection",
    "content-encoding",
    "content-length",
    "keep-alive",
    "proxy-authenticate",
    "proxy-authorization",
    "proxy-connection",
    "te",
    "trailer",
    "transfer-encoding",
    "upgrade",
  ]) {
    responseHeaders.delete(name);
  }
  return new Response(response.body, { status: response.status, headers: responseHeaders });
};
