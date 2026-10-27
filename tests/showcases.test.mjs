import test from "node:test";
import assert from "node:assert/strict";
import {
  showcases,
  canEmbed,
  showcaseFor,
} from "../src/content/project-showcases.ts";

test("all prepared guest scenarios are embedded without owner authentication", () => {
  assert.equal(canEmbed(showcaseFor("english-lab")), true);
  assert.equal(canEmbed(showcaseFor("gastro")), true);
  assert.equal(canEmbed(showcaseFor("edcrm")), true);
  assert.equal(canEmbed(showcaseFor("rehab")), true);
});

test("viewers resolve only the fixed catalog and HTTPS destinations", () => {
  assert.equal(showcaseFor("https://evil.invalid"), undefined);
  assert.equal(showcaseFor("unknown"), undefined);
  for (const item of showcases) {
    const url = new URL(item.url, "https://portfolio.example");
    assert.equal(url.origin, "https://portfolio.example");
    assert.ok(url.pathname.startsWith("/showcase/"));
    assert.equal(url.protocol, "https:");
    assert.equal(url.username, "");
    assert.equal(url.password, "");
    assert.ok(item.context.length > 0);
  }
});
