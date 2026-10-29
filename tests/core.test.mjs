import test from "node:test";
import assert from "node:assert/strict";
import * as practice from "../src/lib/practice.ts";
import * as content from "../src/content/catalog.ts";
import * as links from "../src/lib/deeplinks.ts";

test("Mini App links stay local until a valid bot is configured and allowlist launch targets", () => {
  assert.equal(typeof links.miniAppLink, "function");
  assert.equal(links.miniAppLink(undefined, "verify-ai"), "/app/materials/verify-ai");
  assert.equal(links.miniAppLink("https://evil.test", "verify-ai"), "/app/materials/verify-ai");
  assert.equal(links.miniAppLink("@FedorenkoPracticeBot", "verify-ai"), "https://t.me/FedorenkoPracticeBot?startapp=verify-ai");
  assert.equal(links.miniAppLink("FedorenkoPracticeBot", "https://evil.test"), "https://t.me/FedorenkoPracticeBot?startapp=home");
});

test("high-risk task always requires specialist review", () => {
  assert.equal(typeof practice.recommend, "function");
  assert.match(practice.recommend({ risk: "high" }), /специалист/);
});
test("task card includes user answers and is deterministic", () => {
  const answers = {
    kind: "text",
    frequency: "weekly",
    input: "Учебные заметки",
    result: "План",
    verification: "Сравнить с заметками",
    risk: "low",
  };
  assert.equal(typeof practice.taskCard, "function");
  assert.match(practice.taskCard(answers), /Учебные заметки/);
  assert.equal(practice.taskCard(answers), practice.taskCard(answers));
});
test("progress expires at thirty days and rejects malformed or future data", () => {
  assert.equal(typeof practice.readProgress, "function");
  const now = Date.now();
  const state = {
    version: 1,
    updatedAt: now,
    step: 2,
    answers: {
      kind: "text",
      frequency: "weekly",
      input: "",
      result: "",
      verification: "",
      risk: "low",
    },
  };
  assert.equal(practice.readProgress(JSON.stringify(state), now).step, 2);
  assert.equal(
    practice.readProgress(
      JSON.stringify({ ...state, updatedAt: now - 30 * 86400000 }),
      now,
    ),
    null,
  );
  assert.equal(
    practice.readProgress(
      JSON.stringify({ ...state, updatedAt: now + 1000 }),
      now,
    ),
    null,
  );
  assert.equal(practice.readProgress("{broken", now), null);
  assert.equal(
    practice.readProgress(JSON.stringify({ ...state, step: 90 }), now),
    null,
  );
});
test("incomplete task cannot finish, valid answers can", () => {
  assert.equal(typeof practice.canFinish, "function");
  assert.equal(
    practice.canFinish({ input: " ", result: "План", verification: "" }),
    false,
  );
  assert.equal(
    practice.canFinish({
      input: "Заметки",
      result: "План",
      verification: "Сверка",
    }),
    true,
  );
});
test("production never publishes draft programs", () => {
  assert.equal(typeof content.catalogFor, "function");
  assert.equal(content.catalogFor("production").programs.length, 0);
  assert.equal(content.catalogFor("preview").programs.length, 3);
  assert.equal(content.catalogFor("production").materials.length, 3);
});
test("content validation rejects duplicate slugs and invalid URLs", () => {
  assert.equal(typeof content.validateCatalog, "function");
  const valid = content.catalogFor("preview");
  assert.doesNotThrow(() => content.validateCatalog(valid));
  assert.throws(
    () =>
      content.validateCatalog({
        ...valid,
        materials: [...valid.materials, valid.materials[0]],
      }),
    /slug/,
  );
  assert.throws(
    () =>
      content.validateCatalog({
        ...valid,
        materials: [
          { ...valid.materials[0], sourceUrls: ["javascript:alert(1)"] },
        ],
      }),
    /URL/,
  );
  assert.throws(
    () =>
      content.validateCatalog({
        ...valid,
        materials: [
          { ...valid.materials[0], sourceUrls: ["https://bad host"] },
        ],
      }),
    /URL/,
  );
});
test("deep links only resolve known published IDs and reject user-supplied URLs", () => {
  assert.equal(typeof links.resolveStart, "function");
  assert.equal(
    links.resolveStart("first-ai-task"),
    "/app/practice/first-ai-task",
  );
  assert.equal(
    links.resolveStart("crm-checklist"),
    "/app/materials/crm-checklist",
  );
  assert.equal(links.resolveStart("https://evil.test"), "/app");
  assert.equal(links.resolveStart("unknown"), "/app");
});
