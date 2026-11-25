import assert from "node:assert/strict";
import { test } from "node:test";
import { ALL } from "./src/pages/api/[...path].ts";

test("the proxy keeps JSON and discards stale upstream framing", async (t) => {
  t.mock.method(globalThis, "fetch", async () => new Response('{"ok":true}', {
    status: 201,
    headers: {
      "cache-control": "no-store",
      "connection": "x-hop",
      "content-encoding": "br",
      "content-length": "20",
      "content-type": "application/json",
      "transfer-encoding": "chunked",
      "x-hop": "temporary",
    },
  }));

  const response = await ALL({ request: new Request("https://site.test/api/votes") });
  assert.equal(response.status, 201);
  assert.deepEqual(await response.json(), { ok: true });
  assert.deepEqual(Object.fromEntries(response.headers), {
    "cache-control": "no-store",
    "content-type": "application/json",
  });
});
