import { chromium } from "@playwright/test";
import assert from "node:assert/strict";
import { writeFile } from "node:fs/promises";
const url = new URL(process.argv[2]);
const origin = url.origin;
const browser = await chromium.launch();
const context = await browser.newContext({
  viewport: { width: 1440, height: 1000 },
});
const page = await context.newPage();
await page.goto(url.href, { waitUntil: "networkidle" });
assert.match(await page.locator("h1").innerText(), /Создаю цифровые/);
assert.match(
  await page.locator("meta[name=robots]").getAttribute("content"),
  /noindex/,
);
await page.screenshot({ path: "../../outputs/qa/preview-desktop.png" });
await page.setViewportSize({ width: 390, height: 844 });
await page.screenshot({ path: "../../outputs/qa/preview-mobile.png" });
assert.equal(
  await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth),
  true,
);
await page.goto(`${origin}/practice/first-ai-task`);
await page.getByRole("button", { name: "Начать практику" }).click();
await page.getByRole("button", { name: "Далее" }).click();
await page.getByLabel("Исходные данные").fill("Учебные заметки встречи");
await page.getByLabel("Желаемый результат").fill("План следующей встречи");
await page.getByLabel("Способ проверки").fill("Сравнить с исходными заметками");
await page.getByRole("button", { name: "Получить карточку" }).click();
assert.match(
  await page.getByTestId("task-card").innerText(),
  /Учебные заметки встречи/,
);
await page.screenshot({
  path: "../../outputs/qa/preview-practice-result.png",
  fullPage: true,
});
await page.goto(`${origin}/app/materials/crm-checklist`);
assert.equal(
  await page.locator("h1").innerText(),
  "Что описать перед внедрением CRM",
);
const draft = await page.goto(`${origin}/training/everyday-ai`);
assert.equal(draft.status(), 200);
assert.match(await page.locator("h1").innerText(), /ИИ в повседневной работе/);
const unknown = await page.goto(`${origin}/materials/not-a-real-material`);
assert.equal(unknown.status(), 404);
const leads = await context.request.post(`${origin}/api/leads`, {
  data: { contact: "qa@example.invalid", message: "synthetic" },
});
assert.equal(leads.status(), 503);
const report = {
  origin,
  home: 200,
  previewNoindex: true,
  responsive390: true,
  practice: "completed",
  sharedMaterial: "passed",
  draftVisibleInPreview: true,
  unknownSlug: 404,
  leads: 503,
};
await writeFile(
  "../../outputs/qa/preview-check.json",
  JSON.stringify(report, null, 2),
);
await browser.close();
console.log(JSON.stringify(report));
