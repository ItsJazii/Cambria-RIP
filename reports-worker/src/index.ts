interface Env {
  DB: D1Database;
  ADMIN_PASSWORD: string;
}

const LIMITS = { name: 80, offense: 2000, discord: 40 };
const MAX_PER_HOUR = 5;

const json = (data: unknown, status = 200) =>
  new Response(JSON.stringify(data), {
    status,
    headers: { "content-type": "application/json", "cache-control": "no-store" },
  });

async function sha256(text: string) {
  const buf = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(text));
  return [...new Uint8Array(buf)].map((b) => b.toString(16).padStart(2, "0")).join("");
}

async function isAdmin(req: Request, env: Env) {
  const given = req.headers.get("authorization")?.replace(/^Bearer\s+/i, "") ?? "";
  if (!env.ADMIN_PASSWORD || !given) return false;
  const [a, b] = await Promise.all([sha256(given), sha256(env.ADMIN_PASSWORD)]);
  return a === b;
}

async function createReport(req: Request, env: Env) {
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return json({ error: "Invalid request" }, 400);
  }
  if (typeof body.website === "string" && body.website) return json({ ok: true });

  const field = (k: keyof typeof LIMITS) => (typeof body[k] === "string" ? (body[k] as string).trim() : "");
  const name = field("name");
  const offense = field("offense");
  const discord = field("discord").replace(/^@/, "");

  if (!name || !offense || !discord) return json({ error: "All fields are required" }, 400);
  for (const [k, max] of Object.entries(LIMITS)) {
    if (field(k as keyof typeof LIMITS).length > max) return json({ error: `${k} is too long` }, 400);
  }
  if (!/^[a-z0-9._]{2,32}$/i.test(discord)) return json({ error: "Enter a valid Discord username" }, 400);

  const ip = req.headers.get("cf-connecting-ip") ?? req.headers.get("x-forwarded-for") ?? "unknown";
  const ipHash = await sha256(`cambria-reports:${ip}`);
  const recent = await env.DB.prepare(
    "SELECT COUNT(*) AS n FROM reports WHERE ip_hash = ? AND created_at > datetime('now', '-1 hour')",
  )
    .bind(ipHash)
    .first<{ n: number }>();
  if ((recent?.n ?? 0) >= MAX_PER_HOUR) return json({ error: "Too many reports, try again later" }, 429);

  await env.DB.prepare("INSERT INTO reports (name, offense, discord, ip_hash) VALUES (?, ?, ?, ?)")
    .bind(name, offense, discord, ipHash)
    .run();
  return json({ ok: true }, 201);
}

export default {
  async fetch(req: Request, env: Env): Promise<Response> {
    const { pathname } = new URL(req.url);

    if (pathname === "/api/report" && req.method === "POST") return createReport(req, env);

    if (pathname === "/api/reports" || pathname.startsWith("/api/reports/")) {
      if (!(await isAdmin(req, env))) return json({ error: "Unauthorized" }, 401);
      if (req.method === "GET") {
        const { results } = await env.DB.prepare(
          "SELECT id, name, offense, discord, created_at FROM reports ORDER BY id DESC LIMIT 500",
        ).all();
        return json({ reports: results });
      }
      const id = Number(pathname.split("/")[3]);
      if (req.method === "DELETE" && Number.isInteger(id) && id > 0) {
        await env.DB.prepare("DELETE FROM reports WHERE id = ?").bind(id).run();
        return json({ ok: true });
      }
    }

    return json({ error: "Not found" }, 404);
  },
};
