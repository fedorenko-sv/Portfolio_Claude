import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

test("desk objects remain selectable by touch with reduced motion", async ({
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
  expect(await canvas.evaluate((el) => getComputedStyle(el).touchAction)).toBe(
    "pan-y",
  );
  await expect(room.locator("[data-hovered]")).toHaveAttribute(
    "data-hovered",
    "-1",
  );
  await context.close();
});

test("the actual desk objects respond to hover and click without changing the choice on hover", async ({
  page,
}) => {
  test.setTimeout(60000);
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.goto("/");
  const room = page.getByRole("region", { name: "Рабочая мастерская" });
  await room.scrollIntoViewIfNeeded();
  const canvas = room.locator("canvas");
  await expect(canvas).toBeVisible();
  const bounds = (await canvas.boundingBox())!;
  const caption = room.locator("[data-hovered]");
  const choices = ["Разработка", "Обучение", "Выступления"];
  let selected = 0;
  for (const [index, xs] of [
    [1, [0.5, 0.45, 0.55, 0.4]],
    [2, [0.77, 0.8, 0.74]],
    [0, [0.25, 0.3, 0.2]],
  ] as [number, number[]][]) {
    let point: { x: number; y: number } | undefined;
    for (const y of [0.5, 0.55, 0.65, 0.35, 0.25]) {
      for (const x of xs) {
        await page.mouse.move(
          bounds.x + bounds.width * x,
          bounds.y + bounds.height * y,
        );
        if ((await caption.getAttribute("data-hovered")) === String(index)) {
          point = { x, y };
          break;
        }
      }
      if (point) break;
    }
    expect(point, `Object ${index} can be hit on its geometry`).toBeDefined();
    await expect(
      room.getByRole("button", { name: choices[selected], exact: true }),
    ).toHaveAttribute("aria-pressed", "true");
    await page.mouse.click(
      bounds.x + bounds.width * point!.x,
      bounds.y + bounds.height * point!.y,
    );
    await expect(
      room.getByRole("button", { name: choices[index], exact: true }),
    ).toHaveAttribute("aria-pressed", "true");
    selected = index;
  }
  await page.mouse.move(0, 0);
  await expect(caption).toHaveAttribute("data-hovered", "-1");
  await room.getByRole("button", { name: "Выступления", exact: true }).focus();
  await page.keyboard.press("Enter");
  await expect(
    room.getByRole("link", { name: "Пригласить спикера" }),
  ).toHaveAttribute("href", "/speaking");
});

for (const width of [320, 390, 760, 1440]) {
  test(`training titles and content keep usable columns at ${width}px`, async ({
    page,
  }) => {
    await page.setViewportSize({ width, height: 900 });
    for (const route of ["/app/training", "/training"]) {
      await page.goto(route);
      await expect(page.locator("h1")).toBeVisible();
      const titles = page.locator(".program-row h3, [data-program] h3");
      for (const title of await titles.all()) {
        const box = await title.boundingBox();
        expect(box!.width).toBeGreaterThan(Math.min(width - 70, 250));
        expect(box!.height).toBeLessThan(220);
      }
      expect(
        await page.evaluate(
          () => document.documentElement.scrollWidth <= innerWidth,
        ),
      ).toBe(true);
    }
  });
}

test("Mini App training, projects and library fit dark mode and keep readable controls", async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 844 });
  for (const route of ["/app/training", "/app/solutions", "/app/library"]) {
    await page.goto(route);
    await page
      .locator(".miniapp")
      .evaluate((el) => ((el as HTMLElement).dataset.theme = "dark"));
    const audit = await new AxeBuilder({ page }).analyze();
    expect(audit.violations).toEqual([]);
  }
});
