import { test, expect } from "@playwright/test";
import artifactPath from "node:path";

test("embedded viewer mounts only on request, expands and restores focus", async ({
  page,
}) => {
  await page.route("https://rehab-inpatient-demo.vercel.app/**", (route) =>
    route.fulfill({
      contentType: "text/html",
      body: "<html lang='ru'><title>Учебный сценарий</title><button>Открыть бронь</button></html>",
    }),
  );
  await page.goto("/cases/rehab");
  await expect(page.locator("iframe")).toHaveCount(0);
  const launch = page.getByRole("button", { name: "Открыть приложение" });
  await launch.click();
  const dialog = page.getByRole("dialog");
  await expect(dialog).toBeVisible();
  await expect(dialog.locator("iframe")).toHaveAttribute(
    "src",
    "https://rehab-inpatient-demo.vercel.app/bookings",
  );
  await dialog.getByRole("button", { name: "На весь экран" }).click();
  await expect(dialog).toHaveClass(/is-expanded/);
  await dialog.getByRole("button", { name: "Закрыть просмотр" }).click();
  await expect(dialog).not.toBeVisible();
  await expect(page.locator("iframe")).toHaveCount(0);
  await expect(launch).toBeFocused();
});

test("private teacher workspace does not load in an iframe or claim open access", async ({
  page,
}) => {
  await page.goto("/cases/english-lab");
  await page.getByRole("button", { name: "Открыть приложение" }).click();
  const dialog = page.getByRole("dialog");
  await expect(dialog.getByText(/требует входа/)).toBeVisible();
  await expect(dialog.locator("iframe")).toHaveCount(0);
  await expect(
    dialog.getByRole("link", { name: "Перейти к приложению" }),
  ).toHaveAttribute("href", "https://english-lab-peach.vercel.app/admin");
  await page.keyboard.press("Escape");
  await expect(dialog).not.toBeVisible();
});

for (const width of [320, 390, 768, 1440]) {
  test(`new page compositions fit ${width}px and keep full Russian headings`, async ({
    page,
  }) => {
    await page.setViewportSize({ width, height: 900 });
    for (const path of [
      "/training",
      "/solutions",
      "/cases",
      "/cases/english-lab",
      "/cases/rehab",
    ]) {
      await page.goto(path);
      expect(
        await page.evaluate(
          () => document.documentElement.scrollWidth <= innerWidth,
        ),
        path,
      ).toBe(true);
      await expect(page.locator("h1")).toBeVisible();
      if (process.env.DESIGN_CAPTURE_DIR && (width === 390 || width === 1440)) {
        if (path === "/solutions")
          await page
            .locator(".phone-scene.scene-ready")
            .waitFor({ state: "visible" });
        await page.screenshot({
          path: artifactPath.join(
            process.env.DESIGN_CAPTURE_DIR,
            `${path.replaceAll("/", "-").slice(1)}-${width}.png`,
          ),
          fullPage: true,
        });
      }
    }
  });
}

test("home model renders and shared palette reaches the Mini App", async ({
  page,
}) => {
  for (const width of [390, 1440]) {
    await page.setViewportSize({ width, height: 1000 });
    await page.goto("/");
    await expect(page.locator(".phone-scene.scene-ready")).toBeVisible();
    await expect(page.locator(".phone-scene canvas")).toBeVisible();
    if (process.env.DESIGN_CAPTURE_DIR) {
      await page.screenshot({
        path: artifactPath.join(
          process.env.DESIGN_CAPTURE_DIR,
          `home-${width}.png`,
        ),
        fullPage: true,
      });
      await page.screenshot({
        path: artifactPath.join(
          process.env.DESIGN_CAPTURE_DIR,
          `home-hero-${width}.png`,
        ),
      });
    }
    await page.goto("/app");
    await expect(page.locator("h1")).toBeVisible();
    expect(
      await page
        .locator(".miniapp")
        .evaluate((element) =>
          getComputedStyle(element).getPropertyValue("--cherry").trim(),
        ),
    ).toBe("#8d2034");
    if (process.env.DESIGN_CAPTURE_DIR && width === 390)
      await page.screenshot({
        path: artifactPath.join(
          process.env.DESIGN_CAPTURE_DIR,
          "miniapp-390.png",
        ),
        fullPage: true,
      });
  }
});
