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
      name: "Открыть приложение: CRM для образовательных центров",
      exact: true,
    })
    .first();
  await expect(preview.getByRole("img")).toBeVisible();
  expect(
    await preview
      .locator("img")
      .evaluate(
        (image: HTMLImageElement) => image.complete && image.naturalWidth > 0,
      ),
  ).toBe(true);
  await preview.press("Enter");
  const dialog = page.getByRole("dialog");
  await expect(dialog.getByRole("status")).toContainText("Можно нажимать");
  await page.keyboard.press("Escape");
  await expect(preview).toBeFocused();
  await expect(dialog).not.toBeVisible();
});
