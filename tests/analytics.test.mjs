import test from "node:test";
import assert from "node:assert/strict";
import * as analytics from "../src/lib/analytics.ts";
test("analytics drops arbitrary names and payloads", () => {
  assert.equal(typeof analytics.eventPayload, "function");
  assert.equal(analytics.eventPayload("email_address", {}), null);
  assert.deepEqual(
    analytics.eventPayload("practice_start", {
      contact: "private",
      message: "secret",
      source: "arbitrary",
      id: "first-ai-task",
    }),
    { event: "practice_start", id: "first-ai-task", source: "direct" },
  );
});
