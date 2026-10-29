import { test, expect } from "@playwright/test";
test("visible project screens launch real applications and restore keyboard focus", async ({
  page,
}) => {
  await page.setViewportSize({ width: 1880, height: 1000 });
  await page.goto("/cases");
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= innerWidth,
    ),
  ).toBe(true);
  const preview = page
    .getByRole("button", {
      name: "CRM для образовательных центров Открыть приложение",
      exact: true,
    })
    .first();
  await expect(preview.locator("img")).toBeVisible();
  await expect
    .poll(() =>
      preview
        .locator("img")
        .evaluate(
          (image: HTMLImageElement) => image.complete && image.naturalWidth > 0,
        ),
    )
    .toBe(true);
  await preview.press("Enter");
  const dialog = page.getByRole("dialog");
  await expect(dialog.getByRole("status")).toContainText("Можно нажимать");
  await page.keyboard.press("Escape");
  await expect(preview).toBeFocused();
  await expect(dialog).not.toBeVisible();
});

test("closing the fullscreen phone restores the desktop hero composition", async ({
  page,
}) => {
  await page.setViewportSize({ width: 1264, height: 900 });
  await page.goto("/");
  await page.locator(".phone-scene").scrollIntoViewIfNeeded();
  await expect(page.locator(".scene-ready")).toBeVisible({ timeout: 20000 });
  const before = await page.locator("#about h1").boundingBox();
  await page
    .getByRole("button", { name: "Увеличить меню", exact: true })
    .click();
  await expect(
    page
      .frameLocator(".phone-stage iframe")
      .getByRole("heading", { name: /^меню$/i }),
  ).toBeVisible({ timeout: 20000 });
  await page.getByRole("button", { name: "Закрыть меню", exact: true }).click();
  await expect
    .poll(async () => {
      const after = await page.locator("#about h1").boundingBox();
      return (
        Math.abs(after!.x - before!.x) < 2 && after!.x + after!.width <= 1264
      );
    })
    .toBe(true);
});
