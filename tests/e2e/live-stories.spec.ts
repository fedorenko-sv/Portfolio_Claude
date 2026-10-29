import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

test("touch activates the initially selected laptop before navigating, and fallback objects remain usable", async ({
  browser,
}) => {
  for (const saveData of [false, true]) {
    const context = await browser.newContext({
      viewport: { width: 390, height: 844 },
      hasTouch: true,
      isMobile: true,
      reducedMotion: "reduce",
    });
    if (saveData)
      await context.addInitScript(() =>
        Object.defineProperty(navigator, "connection", {
          value: { saveData: true },
          configurable: true,
        }),
      );
    const page = await context.newPage();
    await page.goto(
      (process.env.PLAYWRIGHT_BASE_URL || "http://127.0.0.1:3101") + "/",
    );
    const room = page.getByRole("region", { name: "Рабочая мастерская" });
    await room.scrollIntoViewIfNeeded();
    if (!saveData) await expect(room.locator("canvas")).toBeVisible();
    const laptop = room.getByRole("button", { name: "Ноутбук · разработка" });
    await laptop.tap();
    await expect(page).toHaveURL(/\/$/);
    await expect(laptop).toHaveAttribute("aria-pressed", "true");
    await expect(room.locator("[data-hovered]")).toHaveAttribute(
      "data-hovered",
      "0",
    );
    const folder = room.getByRole("button", { name: "Папка · обучение" });
    await folder.tap();
    await expect(
      room.getByRole("button", { name: "Обучение", exact: true }),
    ).toHaveAttribute("aria-pressed", "true");
    await folder.tap();
    await expect(page).toHaveURL(/\/training$/);
    await context.close();
  }
});

test("a vertical touch gesture on a desk object scrolls without selecting or navigating", async ({
  browser,
}) => {
  const context = await browser.newContext({
    viewport: { width: 390, height: 844 },
    hasTouch: true,
    isMobile: true,
  });
  const page = await context.newPage();
  await page.goto(
    (process.env.PLAYWRIGHT_BASE_URL || "http://127.0.0.1:3101") + "/",
  );
  const room = page.getByRole("region", { name: "Рабочая мастерская" });
  const folder = room.getByRole("button", { name: "Папка · обучение" });
  await folder.scrollIntoViewIfNeeded();
  const box = (await folder.boundingBox())!,
    x = box.x + box.width / 2,
    y = box.y + box.height / 2;
  const before = await page.evaluate(() => scrollY);
  const cdp = await context.newCDPSession(page);
  await cdp.send("Input.dispatchTouchEvent", {
    type: "touchStart",
    touchPoints: [{ x, y }],
  });
  for (let i = 1; i <= 6; i++)
    await cdp.send("Input.dispatchTouchEvent", {
      type: "touchMove",
      touchPoints: [{ x, y: y - i * 25 }],
    });
  await cdp.send("Input.dispatchTouchEvent", {
    type: "touchEnd",
    touchPoints: [],
  });
  await expect
    .poll(() => page.evaluate(() => scrollY))
    .toBeGreaterThan(before + 30);
  await expect(page).toHaveURL(/\/$/);
  await expect(
    room.getByRole("button", { name: "Разработка", exact: true }),
  ).toHaveAttribute("aria-pressed", "true");
  await context.close();
});

test("process walkthrough can play, stop, change scenario and open the corresponding real app", async ({
  page,
}) => {
  await page.goto("/solutions");
  const process = page.getByRole("region", {
    name: "Один запрос. Вся история.",
  });
  await process.getByRole("button", { name: "Размещение гостей" }).click();
  await process.getByRole("button", { name: "Заезд", exact: true }).click();
  await expect(
    process.getByRole("heading", { name: "Встречаем с готовой информацией" }),
  ).toBeVisible();
  await process.getByRole("button", { name: "Показать весь путь" }).click();
  await expect(
    process.getByRole("heading", { name: "Нужны даты и место" }),
  ).toBeVisible();
  await expect(
    process.getByRole("heading", { name: "Сверяем доступность" }),
  ).toBeVisible({ timeout: 4000 });
  await process.getByRole("button", { name: "Остановить" }).click();
  await expect(
    process.getByRole("button", { name: "Показать весь путь" }),
  ).toBeVisible();
  await process
    .getByRole("button", { name: "Попробовать в приложении" })
    .click();
  await expect(page.getByRole("dialog")).toBeVisible();
  await expect(page.getByRole("dialog").locator("iframe")).toHaveAttribute(
    "src",
    /showcase\/rehab/,
  );
});

test("mini lesson explains unsupported facts and clears the answer on a new example", async ({
  page,
}) => {
  await page.goto("/training");
  const lab = page.getByRole("region", {
    name: "Звучит убедительно. А это правда?",
  });
  await lab.getByRole("button", { name: /Пришлём предложение/ }).click();
  await expect(
    lab.getByText("Эта фраза согласуется с заметками."),
  ).toBeVisible();
  await lab.getByRole("button", { name: /Занятие длится два часа/ }).click();
  await expect(lab.getByText("Да, здесь стоит остановиться.")).toBeVisible();
  await expect(lab.getByText(/Длительности и цены нет/)).toBeVisible();
  await lab.getByRole("button", { name: "Другой пример" }).click();
  await expect(
    lab.getByRole("heading", { name: "План занятия", exact: true }),
  ).toBeVisible();
  await expect(lab.getByText("Да, здесь стоит остановиться.")).toHaveCount(0);
  await lab.getByRole("button", { name: /Все участники смогут/ }).click();
  await expect(
    lab.getByText(/Доступ к платному инструменту не подтверждён/),
  ).toBeVisible();
});

test("slides, gallery and full photo viewer support touch and keyboard with focus restoration", async ({
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
    (process.env.PLAYWRIGHT_BASE_URL || "http://127.0.0.1:3101") + "/speaking",
  );
  await page.getByRole("button", { name: "Следующий слайд" }).tap();
  await expect(
    page.getByRole("heading", { name: "Ответ → действие → проверка." }),
  ).toBeVisible();
  await page.getByRole("button", { name: "Следующее фото", exact: true }).tap();
  const photo = page.getByRole("button", {
    name: "Увеличить фото: По другую сторону микрофона",
  });
  await photo.tap();
  const dialog = page.getByRole("dialog", { name: "Просмотр фотографий" });
  await expect(dialog).toBeVisible();
  expect((await new AxeBuilder({ page }).analyze()).violations).toEqual([]);
  await page.keyboard.press("ArrowLeft");
  await expect(dialog.getByText("На сцене", { exact: true })).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(dialog).not.toBeVisible();
  await expect(photo).toBeFocused();
  expect(await page.evaluate(() => document.body.style.overflow)).not.toBe(
    "hidden",
  );
  await context.close();
});

test("working notes expand into real criteria and links", async ({ page }) => {
  await page.goto("/about");
  const note = page
    .locator("details")
    .filter({ hasText: "Куда нажать — понятно." });
  await note.locator("summary").click();
  await expect(
    note.getByText("У действия есть видимый результат"),
  ).toBeVisible();
  await expect(note.getByRole("link")).toHaveAttribute("href", "/cases");
});

test("gallery can be dragged with a mouse without accidentally opening a photo", async ({
  page,
}) => {
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.goto("/speaking");
  const gallery = page.locator('[aria-label="Фотографии с выступления"]');
  await gallery.scrollIntoViewIfNeeded();
  const photo = gallery.getByRole("button", {
    name: "Увеличить фото: На сцене",
  });
  const box = (await photo.boundingBox())!;
  await page.mouse.move(box.x + box.width * 0.88, box.y + box.height * 0.5);
  await page.mouse.down();
  await page.mouse.move(box.x + box.width * 0.12, box.y + box.height * 0.5, {
    steps: 16,
  });
  await page.mouse.up();
  await expect(gallery.getByText("2 / 2")).toBeVisible();
  await expect(page.getByRole("dialog")).not.toBeVisible();
  await gallery
    .getByRole("button", {
      name: "Увеличить фото: По другую сторону микрофона",
    })
    .click();
  await expect(page.getByRole("dialog")).toBeVisible();
});

test("mobile slides and gallery respond to horizontal swipes", async ({
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
    (process.env.PLAYWRIGHT_BASE_URL || "http://127.0.0.1:3101") + "/speaking",
  );
  const cdp = await context.newCDPSession(page);
  async function swipe(selector: string) {
    const el = page.locator(selector);
    await el.scrollIntoViewIfNeeded();
    const box = (await el.boundingBox())!,
      x = box.x + box.width * 0.88,
      y = box.y + box.height * 0.4;
    await cdp.send("Input.dispatchTouchEvent", {
      type: "touchStart",
      touchPoints: [{ x, y }],
    });
    for (let i = 1; i <= 10; i++)
      await cdp.send("Input.dispatchTouchEvent", {
        type: "touchMove",
        touchPoints: [{ x: x - box.width * 0.075 * i, y }],
      });
    await cdp.send("Input.dispatchTouchEvent", {
      type: "touchEnd",
      touchPoints: [],
    });
  }
  await swipe('[aria-label="Пример живого разбора"] article');
  await expect(
    page.getByRole("heading", { name: "Ответ → действие → проверка." }),
  ).toBeVisible();
  await swipe('[aria-label="Фотографии с выступления"] figure:first-child');
  await expect(page.getByText("2 / 2", { exact: true })).toBeVisible();
  await context.close();
});

for (const width of [320, 390, 768, 1440])
  test(`new experiences are readable and accessible at ${width}px`, async ({
    page,
  }) => {
    await page.setViewportSize({ width, height: 900 });
    await page.emulateMedia({ reducedMotion: "reduce" });
    for (const route of ["/solutions", "/training", "/speaking", "/about"]) {
      await page.goto(route);
      await expect(page.locator("main h1")).toBeVisible();
      await page.evaluate(() => document.fonts.ready);
      expect(
        await page.evaluate(
          () => document.documentElement.scrollWidth <= innerWidth,
        ),
      ).toBe(true);
      expect(
        (await new AxeBuilder({ page }).analyze()).violations,
        route,
      ).toEqual([]);
    }
  });
