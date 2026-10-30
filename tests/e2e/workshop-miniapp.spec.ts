import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

test("Telegram navigation cleans up listeners and respects safe areas without trusting identity", async ({
  page,
}) => {
  await page.route("https://telegram.org/js/telegram-web-app.js", (r) =>
    r.abort(),
  );
  await page.addInitScript(() => {
    const backs: (() => void)[] = [];
    const callbacks: Record<string, (() => void)[]> = {};
    Object.defineProperty(window, "Telegram", {
      value: {
        WebApp: {
          initData: "test-client-context",
          ready() {},
          expand() {},
          colorScheme: "dark",
          viewportStableHeight: 800,
          safeAreaInset: { top: 28, bottom: 20 },
          contentSafeAreaInset: { top: 72, bottom: 12 },
          BackButton: {
            show() {},
            hide() {},
            onClick(fn: () => void) {
              backs.push(fn);
            },
            offClick(fn: () => void) {
              const i = backs.indexOf(fn);
              if (i >= 0) backs.splice(i, 1);
            },
          },
          onEvent(event: string, fn: () => void) {
            (callbacks[event] ??= []).push(fn);
          },
          offEvent(event: string, fn: () => void) {
            callbacks[event] = callbacks[event].filter((x) => x !== fn);
          },
        },
      },
      configurable: true,
    });
    Object.defineProperty(window, "__testBack", {
      value: () => {
        if (backs.length !== 1)
          throw Error("Duplicate Telegram BackButton listeners");
        backs[0]();
      },
    });
  });
  await page.goto("/app?tgWebAppStartParam=home");
  await expect(
    page.getByText("Такой раздел не найден.", { exact: false }),
  ).toHaveCount(0);
  await expect(page.locator(".miniapp")).toHaveAttribute("data-theme", "dark");
  expect(
    await page
      .locator(".miniapp")
      .evaluate((el) =>
        (el as HTMLElement).style.getPropertyValue("--tg-safe-top"),
      ),
  ).toBe("72px");
  await page.getByRole("link", { name: "Библиотека", exact: true }).click();
  await expect(page).toHaveURL(/\/app\/library$/);
  await page.evaluate(() =>
    (window as unknown as { __testBack: () => void }).__testBack(),
  );
  await expect(page).toHaveURL(/\/app$/);
  const result = await new AxeBuilder({ page }).analyze();
  expect(result.violations).toEqual([]);
});

test("Save-Data keeps the workroom offers available without starting its WebGL scene", async ({
  page,
}) => {
  await page.addInitScript(() =>
    Object.defineProperty(navigator, "connection", {
      value: { saveData: true },
      configurable: true,
    }),
  );
  await page.goto("/");
  const room = page.getByRole("region", { name: "Рабочая мастерская" });
  await room.scrollIntoViewIfNeeded();
  await room.getByRole("button", { name: "Обучение", exact: true }).click();
  await expect(
    room.getByRole("link", { name: "Подобрать обучение" }),
  ).toBeVisible();
  await expect(room.locator("canvas")).toHaveCount(0);
});

test("workroom keeps all three offers usable and launches the real Mini App on intent", async ({
  page,
}) => {
  await page.goto("/");
  const room = page.getByRole("region", { name: "Рабочая мастерская" });
  await expect(room).toBeVisible();
  await room.getByRole("button", { name: "Обучение", exact: true }).click();
  await expect(
    room.getByRole("link", { name: "Подобрать обучение" }),
  ).toHaveAttribute("href", "/training");
  await room.getByRole("button", { name: "Выступления", exact: true }).click();
  await expect(
    room.getByRole("link", { name: "Пригласить спикера" }),
  ).toHaveAttribute("href", "/speaking");
  await expect(
    page.locator('iframe[title="Практика Сергея — приложение"]'),
  ).toHaveCount(0);
  await page
    .getByRole("link", { name: /Хотите сначала попробовать сами/ })
    .click();
  await expect(page).toHaveURL(/\/app$/);
  await expect(
    page.getByRole("heading", { name: "От интереса — к своей задаче." }),
  ).toBeVisible();
});

test("library searches, saves only locally and restores saved materials after reload", async ({
  page,
}) => {
  await page.goto("/app/library");
  await page.getByRole("button", { name: "Материалы", exact: true }).click();
  await page
    .getByRole("searchbox", { name: "Поиск по библиотеке" })
    .fill("Провер");
  const card = page
    .getByRole("article")
    .filter({ has: page.getByRole("heading", { name: /провер/i }) });
  await expect(card).toHaveCount(1);
  await card.getByRole("button", { name: /Сохранить/ }).click();
  await page.reload();
  await page.getByRole("button", { name: /Избранное/ }).click();
  await expect(page.getByRole("article")).toHaveCount(1);
  await expect(page.getByRole("article")).toContainText("провер");
  await page
    .getByRole("article")
    .getByRole("button", { name: /Убрать/ })
    .click();
  await expect(page.getByText("Пока ничего не сохранено")).toBeVisible();
});

test("library remains usable without storage and does not claim saved persistence", async ({
  page,
}) => {
  await page.addInitScript(() =>
    Object.defineProperty(window, "localStorage", {
      get() {
        throw new DOMException("disabled", "SecurityError");
      },
    }),
  );
  await page.goto("/app/library");
  await expect(page.getByRole("status")).toContainText(
    "Сохранение на устройстве недоступно",
  );
  await page.getByRole("searchbox").fill("CRM");
  await page.getByRole("button", { name: "Проекты", exact: true }).click();
  await expect(page.getByRole("article")).toHaveCount(1);
  await expect(page.getByRole("article").getByRole("link")).toHaveAttribute(
    "href",
    "/app/solutions/edcrm",
  );
});

for (const width of [390, 1440])
  test(`new surfaces fit ${width}px and have accessible controls`, async ({
    page,
  }) => {
    await page.setViewportSize({ width, height: 900 });
    for (const path of [
      "/app",
      "/app/library",
      "/app/speaking",
      "/app/contact",
      "/",
    ]) {
      await page.goto(path);
      await expect(page.locator("h1")).toBeVisible();
      expect(
        await page.evaluate(
          () => document.documentElement.scrollWidth <= innerWidth,
        ),
      ).toBe(true);
      const result = await new AxeBuilder({ page }).analyze();
      expect(result.violations).toEqual([]);
    }
  });
