import test from "node:test";
import assert from "node:assert/strict";
import * as library from "../src/lib/library.ts";

const entries = [
  {
    id: "material:verify-ai",
    title: "Проверка ответа ИИ",
    summary: "Как найти ошибку в результате",
    kind: "material",
    href: "/app/materials/verify-ai",
  },
  {
    id: "project:edcrm",
    title: "CRM для образовательных центров",
    summary: "Ученики и заявки",
    kind: "project",
    href: "/app/solutions/edcrm",
  },
];
test("library searches Russian text, normalizes ё and combines a category with saved items", () => {
  assert.equal(typeof library.searchLibrary, "function");
  assert.equal(library.searchLibrary(entries, "  ПРОВЕРКА  ", "all").length, 1);
  assert.equal(library.searchLibrary(entries, "заявки", "material").length, 0);
  assert.equal(
    library.searchLibrary(entries, "", "saved", ["project:edcrm"])[0].id,
    "project:edcrm",
  );
  assert.equal(
    library.searchLibrary([{ ...entries[0], title: "Учёт" }], "учет", "all")
      .length,
    1,
  );
});
test("saved library rejects malformed, expired and unknown IDs and removes duplicates", () => {
  assert.equal(typeof library.readSaved, "function");
  const now = 10000000000,
    ids = entries.map((e) => e.id);
  const value = {
    version: 1,
    updatedAt: now,
    ids: ["project:edcrm", "project:edcrm", "injected"],
  };
  assert.deepEqual(library.readSaved(JSON.stringify(value), ids, now), [
    "project:edcrm",
  ]);
  for (const raw of [
    "{",
    null,
    JSON.stringify({ ...value, updatedAt: now + 1 }),
    JSON.stringify({ ...value, updatedAt: now - 30 * 86400000 }),
    JSON.stringify({ ...value, ids: {} }),
  ])
    assert.deepEqual(library.readSaved(raw, ids, now), []);
});
