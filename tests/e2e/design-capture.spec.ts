import { test, expect } from "@playwright/test";
import path from "node:path";
for (const width of [320, 390, 768, 1024, 1440]) {
  test(`approved compositions fit ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 1000 });
    for (const [route, name] of [
      ["/", "home"],
      ["/training", "courses"],
      ["/solutions", "business"],
    ]) {
      await page.goto(route);
      if (route !== "/training")
        await expect(page.locator(".phone-scene.scene-ready")).toBeVisible({
          timeout: 20000,
        });
      expect(
        await page.evaluate(
          () => document.documentElement.scrollWidth <= innerWidth,
        ),
      ).toBe(true);
      if (process.env.DESIGN_CAPTURE_DIR && [390, 1024, 1440].includes(width))
        await page.screenshot({
          path: path.join(
            process.env.DESIGN_CAPTURE_DIR,
            `${name}-${width}.png`,
          ),
          fullPage: true,
        });
    }
  });
}
