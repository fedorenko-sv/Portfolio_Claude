import test from "node:test";
import assert from "node:assert/strict";
import {
  showcases,
  canEmbed,
  showcaseFor,
} from "../src/content/project-showcases.ts";

test("a login or protected deployment is never offered as an embedded application", () => {
  assert.equal(canEmbed(showcaseFor("english-lab")), false);
  assert.equal(canEmbed(showcaseFor("gastro")), false);
  assert.equal(canEmbed(showcaseFor("edcrm")), false);
  assert.equal(canEmbed(showcaseFor("rehab")), true);
});

test("viewers resolve only the fixed catalog and HTTPS destinations", () => {
  assert.equal(showcaseFor("https://evil.invalid"), undefined);
  assert.equal(showcaseFor("unknown"), undefined);
  for (const item of showcases) {
    const url = new URL(item.url);
    assert.equal(url.protocol, "https:");
    assert.equal(url.username, "");
    assert.equal(url.password, "");
    assert.ok(item.context.length > 0);
  }
});
