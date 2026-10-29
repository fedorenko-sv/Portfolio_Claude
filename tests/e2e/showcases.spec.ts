import { test, expect } from "@playwright/test";
import artifactPath from "node:path";

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
    await page.locator(".phone-scene").scrollIntoViewIfNeeded();
    await expect(page.locator(".phone-scene.scene-ready")).toBeVisible({timeout:20000});
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
