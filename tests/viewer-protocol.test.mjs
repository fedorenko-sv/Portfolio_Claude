import test from "node:test";
import assert from "node:assert/strict";
import { acceptsShowcaseMessage } from "../src/lib/showcase-protocol.ts";
test("viewer only accepts ready from its own frame and exact expected origin", () => {
  const frame = {};
  const valid = {
    origin: "https://portfolio.example",
    source: frame,
    data: { type: "showcase:ready", version: 1 },
  };
  assert.equal(
    acceptsShowcaseMessage(valid, frame, "https://portfolio.example"),
    true,
  );
  assert.equal(
    acceptsShowcaseMessage(
      { ...valid, origin: "https://evil.example" },
      frame,
      "https://portfolio.example",
    ),
    false,
  );
  assert.equal(
    acceptsShowcaseMessage(
      { ...valid, source: {} },
      frame,
      "https://portfolio.example",
    ),
    false,
  );
  assert.equal(
    acceptsShowcaseMessage(
      { ...valid, data: { type: "showcase:ready", version: 2 } },
      frame,
      "https://portfolio.example",
    ),
    false,
  );
  assert.equal(
    acceptsShowcaseMessage(
      { ...valid, data: null },
      frame,
      "https://portfolio.example",
    ),
    false,
  );
});
