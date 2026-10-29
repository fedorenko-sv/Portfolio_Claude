import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
test("contact keeps allowlisted context and provides an editable Telegram draft", async ({
  page,
}) => {
  await page.goto("/contact?type=training&project=edcrm");
  const draft = page.getByLabel("Можно отредактировать перед переходом");
  await expect(draft).toContainText("");
  await expect(draft).toHaveValue(/обучение по ИИ/);
  await draft.fill("Моя задача & сроки?");
  const link = page.getByRole("link", {
    name: "Открыть Telegram с этим текстом",
  });
  expect(
    new URL((await link.getAttribute("href"))!).searchParams.get("text"),
  ).toBe("Моя задача & сроки?");
  await page.getByRole("radio", { name: "Выступление", exact: true }).check();
  await expect(draft).toHaveValue(/мероприятии/);
  await page.addInitScript(() => {
    Object.defineProperty(navigator, "clipboard", {
      value: { writeText: () => Promise.reject(new Error("denied")) },
      configurable: true,
    });
  });
  await page.reload();
  await page.getByRole("button", { name: "Скопировать текст" }).click();
  await expect(page.getByRole("status")).toContainText("Текст выделен");
});
test("films are lazy, play, close with Escape and return focus", async ({
  page,
}) => {
  await page.goto("/");
  await expect(page.locator("video")).toHaveCount(0);
  const button = page.getByRole("button", {
    name: "Смотреть видео: От заявки к ученику",
  });
  await button.click();
  const dialog = page.getByRole("dialog");
  const film = dialog.locator("video");
  await expect(film).toBeVisible();
  await expect
    .poll(() => film.evaluate((e: HTMLVideoElement) => e.currentTime))
    .toBeGreaterThan(0.1);
  await page.keyboard.press("Escape");
  await expect(dialog).not.toBeVisible();
  await expect(button).toBeFocused();
  await expect(page.locator("video")).toHaveCount(0);
});
test("failed film leaves a useful route and keyboard close", async ({
  page,
}) => {
  await page.route("**/media/projects/rehab.mp4", (r) => r.abort());
  await page.goto("/cases/rehab");
  await page
    .getByRole("button", { name: "Смотреть видео: От брони к размещению" })
    .click();
  await expect(
    page.getByRole("heading", { name: "Видео сейчас недоступно" }),
  ).toBeVisible();
  await expect(
    page.getByRole("link", { name: "Перейти к проекту" }),
  ).toHaveAttribute("href", "/cases/rehab");
  await page.keyboard.press("Escape");
  await expect(page.getByRole("dialog")).not.toBeVisible();
});
for (const width of [390, 1024, 1440])
  test(`author pages fit ${width}px with readable controls`, async ({
    page,
  }) => {
    await page.setViewportSize({ width, height: 900 });
    await page.emulateMedia({ reducedMotion: "reduce" });
    for (const route of [
      "/",
      "/training",
      "/speaking",
      "/contact?type=speaking",
    ]) {
      await page.goto(route);
      expect(
        await page.evaluate(
          () => document.documentElement.scrollWidth <= innerWidth,
        ),
      ).toBe(true);
      const result = await new AxeBuilder({ page })
        .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
        .analyze();
      expect(
        result.violations.filter((v) =>
          ["serious", "critical"].includes(v.impact || ""),
        ),
      ).toEqual([]);
    }
  });
