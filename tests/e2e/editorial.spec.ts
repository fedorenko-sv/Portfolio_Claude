import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

test("the immediately visible menu has readable labels and keyboard-accessible galleries", async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 775 });
  await page.goto("/showcase/menu/index.html");
  await expect(page.getByRole("heading", { name: /^меню$/i })).toBeVisible();
  const galleries = page.getByRole("group", { name: /Фото и видео:/ });
  await expect(galleries.first()).toHaveAttribute("tabindex", "0");
  expect((await new AxeBuilder({ page }).analyze()).violations).toEqual([]);
});

test("a second tap on the selected desk object opens its section", async ({
  browser,
}) => {
  const context = await browser.newContext({
    viewport: { width: 390, height: 844 },
    hasTouch: true,
    isMobile: true,
    reducedMotion: "reduce",
  });
  const page = await context.newPage();
  await page.goto(
    (process.env.PLAYWRIGHT_BASE_URL || "http://127.0.0.1:3101") + "/",
  );
  const room = page.getByRole("region", { name: "Рабочая мастерская" });
  await room.scrollIntoViewIfNeeded();
  const canvas = room.locator("canvas");
  await expect(canvas).toBeVisible();
  const box = (await canvas.boundingBox())!;
  await page.touchscreen.tap(
    box.x + box.width * 0.51,
    box.y + box.height * 0.53,
  );
  await expect(
    room.getByRole("button", { name: "Обучение", exact: true }),
  ).toHaveAttribute("aria-pressed", "true");
  await page.touchscreen.tap(
    box.x + box.width * 0.51,
    box.y + box.height * 0.53,
  );
  await expect(page).toHaveURL(/\/training$/);
  await context.close();
});

test("folder opens a readable worksheet and closes with Escape and restored focus", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/training");
  const folder = page.getByRole("button", { name: "Открыть рабочий лист" });
  await folder.click();
  const sheet = page.locator("#practice-sheet");
  await expect(sheet).toBeVisible();
  await expect(
    sheet.getByRole("heading", { name: "План занятия" }),
  ).toBeVisible();
  await expect(
    sheet.getByRole("link", { name: "Составить свой" }),
  ).toHaveAttribute("href", "/practice/first-ai-task");
  await sheet.getByRole("button", { name: "Закрыть рабочий лист" }).focus();
  await page.keyboard.press("Escape");
  await expect(sheet).not.toBeVisible();
  await expect(
    page.getByRole("button", { name: "Открыть рабочий лист" }),
  ).toBeFocused();
});

for (const width of [320, 768, 1440])
  test(`speaking spacing and author navigation stay readable at ${width}px`, async ({
    page,
  }) => {
    await page.setViewportSize({ width, height: 900 });
    await page.goto("/speaking");
    const title = page.getByRole("heading", { name: /Hermes Agent:/ });
    const next = title.locator("xpath=following-sibling::p[1]");
    const headingBox = (await title.boundingBox())!,
      paragraphBox = (await next.boundingBox())!;
    expect(
      paragraphBox.y - headingBox.y - headingBox.height,
    ).toBeGreaterThanOrEqual(24);
    expect(headingBox.x + headingBox.width).toBeLessThanOrEqual(width);
    const menu = page.getByRole("button", { name: "Открыть навигацию — меню" });
    if (await menu.isVisible()) await menu.click();
    await page
      .getByRole("link", { name: "Обо мне", exact: true })
      .filter({ visible: true })
      .click();
    await expect(page).toHaveURL(/\/about$/);
    await expect(page.locator("h1")).toContainText("Сергей");
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth,
      ),
    ).toBe(true);
    expect((await new AxeBuilder({ page }).analyze()).violations).toEqual([]);
  });

test("live menu remains usable without WebGL", async ({ page }) => {
  await page.addInitScript(() => {
    const original = HTMLCanvasElement.prototype.getContext;
    HTMLCanvasElement.prototype.getContext = function (
      this: HTMLCanvasElement,
      kind: string,
      ...args: unknown[]
    ) {
      if (kind.includes("webgl")) return null;
      return original.apply(this, [kind, ...args] as Parameters<
        typeof original
      >);
    } as typeof original;
  });
  await page.goto("/");
  await page.locator(".phone-scene").scrollIntoViewIfNeeded();
  const menu = page.frameLocator(".phone-stage iframe");
  await expect(menu.getByRole("heading", { name: /^меню$/i })).toBeVisible();
  await page.getByRole("button", { name: "Увеличить меню" }).click();
  await expect(
    page.getByRole("dialog", { name: "Ресторанное меню" }),
  ).toBeVisible();
  expect(await page.evaluate(() => document.body.style.overflow)).toBe(
    "hidden",
  );
  await page.getByRole("button", { name: "Закрыть меню", exact: true }).click();
  expect(await page.evaluate(() => document.body.style.overflow)).not.toBe(
    "hidden",
  );
  await expect(menu.getByRole("heading", { name: /^меню$/i })).toBeVisible();
});
