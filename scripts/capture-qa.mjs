import { chromium } from "@playwright/test";
import { mkdir, writeFile } from "node:fs/promises";
import { resolve } from "node:path";
const output = resolve(process.argv[2] || "work/qa");
await mkdir(output, { recursive: true });
const browser = await chromium.launch();
const page = await browser.newPage({
  viewport: { width: 1440, height: 1000 },
  deviceScaleFactor: 1,
});
for (const [name, route, width] of [
  ["home-desktop", "/", 1440],
  ["home-mobile", "/", 390],
  ["case-mobile", "/cases/edcrm", 390],
  ["practice-desktop", "/practice/first-ai-task", 1440],
  ["app-mobile", "/app", 390],
]) {
  await page.setViewportSize({ width, height: width < 500 ? 844 : 1000 });
  await page.goto(`http://127.0.0.1:3200${route}`, {
    waitUntil: "networkidle",
  });
  await page.screenshot({
    path: resolve(output, `${name}.png`),
    fullPage: true,
  });
  if (name.startsWith("home-"))
    await page.screenshot({
      path: resolve(output, `${name}-first-screen.png`),
    });
}
const context = await browser.newContext({
  viewport: { width: 1440, height: 900 },
  recordVideo: {
    dir: resolve(output, "video"),
    size: { width: 1440, height: 900 },
  },
});
const videoPage = await context.newPage();
await videoPage.goto("http://127.0.0.1:3200/practice/first-ai-task");
await videoPage.waitForTimeout(2000);
await videoPage.getByRole("button", { name: "Начать практику" }).click();
await videoPage.waitForTimeout(1500);
await videoPage.getByRole("button", { name: "Далее" }).click();
await videoPage.getByLabel("Исходные данные").fill("Учебные заметки встречи");
await videoPage
  .getByLabel("Желаемый результат")
  .fill("Повестка следующей встречи");
await videoPage
  .getByLabel("Способ проверки")
  .fill("Сопоставить пункты с заметками");
await videoPage.waitForTimeout(2000);
await videoPage.getByRole("button", { name: "Получить карточку" }).click();
await videoPage.waitForTimeout(5000);
await videoPage.screenshot({
  path: resolve(output, "practice-result.png"),
  fullPage: true,
});
const video = videoPage.video();
await context.close();
await video.saveAs(resolve(output, "practice-qa.webm"));
const playback = await browser.newPage();
await playback.goto(
  `file:///${resolve(output, "practice-qa.webm").replaceAll("\\", "/")}`,
);
const dimensions = await playback.locator("video").evaluate((video) => ({
  width: video.videoWidth,
  height: video.videoHeight,
  duration: video.duration,
}));
await writeFile(
  resolve(output, "video-check.json"),
  JSON.stringify(dimensions, null, 2),
);
await browser.close();
console.log(JSON.stringify({ output, dimensions }));
