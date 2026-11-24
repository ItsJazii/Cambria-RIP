import assert from "node:assert/strict";
import { createHash, timingSafeEqual } from "node:crypto";
import { test } from "node:test";
import worker from "./index.ts";

const edgeIp = "192.0.2.1";
const visitorIp = "198.51.100.2";

for (const [name, configured, supplied, expectedIp] of [
  ["uses the proxy IP with a matching secret", "proxy", "proxy", visitorIp],
  ["uses the edge IP with a nonmatching secret", "proxy", "other", edgeIp],
  ["uses the edge IP without a proxy header", "proxy", undefined, edgeIp],
  ["uses the edge IP without a configured secret", undefined, "proxy", edgeIp],
]) {
  test(name, async (t) => {
    Object.defineProperty(crypto.subtle, "timingSafeEqual", {
      configurable: true,
      value: (a, b) => timingSafeEqual(Buffer.from(a), Buffer.from(b)),
    });
    t.after(() => Reflect.deleteProperty(crypto.subtle, "timingSafeEqual"));

    let voteKey;
    const DB = {
      prepare: () => ({
        all: async () => ({ results: [] }),
        bind: (hash) => {
          voteKey = hash;
          return { all: async () => ({ results: [] }) };
        },
      }),
    };
    const headers = new Headers({
      "cf-connecting-ip": edgeIp,
      "x-forwarded-for": `${visitorIp}, ${edgeIp}`,
    });
    if (supplied) headers.set("x-worker-proxy-secret", supplied);

    const response = await worker.fetch(new Request("https://worker.test/api/votes", { headers }), {
      DB,
      WORKER_PROXY_SECRET: configured,
    });
    assert.equal(response.status, 200);
    assert.equal(voteKey, createHash("sha256").update(`cambria:${expectedIp}`).digest("hex"));
  });
}
