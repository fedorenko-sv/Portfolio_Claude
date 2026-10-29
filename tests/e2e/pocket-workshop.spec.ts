import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

test.use({ viewport: { width: 390, height: 844 }, hasTouch: true });

test("home offers all directions and restores an existing unfinished task", async ({
  page,
}) => {
  await page.addInitScript(() =>
    localStorage.setItem(
      "fedorenko:first-ai-task:v1",
      JSON.stringify({
        version: 1,
        updatedAt: Date.now(),
        step: 1,
        answers: {
          kind: "text",
          frequency: "weekly",
          input: "",
          result: "",
          verification: "",
          risk: "low",
        },
      }),
    ),
  );
  await page.goto("/app");
  await expect(
    page.getByRole("link", { name: /Продолжить практику/ }),
  ).toBeVisible();
  await expect(
    page.getByRole("link", { name: "Проверить ответ" }),
  ).toHaveAttribute("href", "/app/practice/check-answer");
  await page.getByRole("button", { name: "Найти решение" }).tap();
  await expect(
    page.getByRole("link", { name: "Выбрать сценарий" }),
  ).toHaveAttribute("href", "/app/solutions");
  await page.getByRole("button", { name: "Для аудитории" }).tap();
  await page.getByRole("link", { name: "Собрать запрос" }).tap();
  await expect(page).toHaveURL(/\/app\/speaking#brief$/);
  await expect(page.locator("#builder-title")).toBeInViewport();
});

test("short practice supports retry, all examples, conclusion and restart", async ({
  page,
}) => {
  await page.goto("/app/practice/check-answer");
  await page.getByRole("button", { name: /Пришлём предложение/ }).tap();
  await expect(page.getByRole("status")).toContainText("Попробуйте ещё раз");
  await expect(
    page.getByRole("button", { name: "Следующий пример" }),
  ).toHaveCount(0);
  await page.getByRole("button", { name: /Занятие длится два часа/ }).tap();
  await expect(page.getByRole("status")).toContainText(
    "Длительности и цены нет",
  );
  await page.getByRole("button", { name: "Следующий пример" }).tap();
  await expect(page.locator("h1")).toBeFocused();
  await page.getByRole("button", { name: /Все участники смогут/ }).tap();
  await page.getByRole("button", { name: "Следующий пример" }).tap();
  await page.getByRole("button", { name: /Вся группа недовольна/ }).tap();
  await page.getByRole("button", { name: "Забрать вывод" }).tap();
  await expect(
    page.getByRole("region", { name: "Результат упражнения" }),
  ).toBeVisible();
  await expect(
    page.getByRole("link", { name: "Открыть памятку" }),
  ).toHaveAttribute("href", "/app/materials/verify-ai");
  await page.getByRole("button", { name: "Пройти ещё раз" }).tap();
  await expect(page.getByText("Пример 1 из 3")).toBeVisible();
  await expect(page.locator("h1")).toBeFocused();
});

test("guide can be saved, reopened and copied with an honest denied-clipboard fallback", async ({
  page,
}) => {
  await page.addInitScript(() =>
    Object.defineProperty(navigator, "clipboard", {
      configurable: true,
      value: {
        writeText: async () => {
          throw Error("denied");
        },
      },
    }),
  );
  await page.goto("/app/library");
  await page.getByRole("searchbox").fill("Карта одного процесса");
  await expect(page.getByRole("article")).toHaveCount(1);
  await page.getByRole("button", { name: /На потом. Сохранить/ }).tap();
  await page.reload();
  await page.getByRole("button", { name: /Избранное/ }).tap();
  await expect(page.getByRole("article")).toHaveCount(1);
  await page.getByRole("link", { name: "Карта одного процесса" }).tap();
  await expect(page).toHaveURL(/\/app\/guides\/process-map$/);
  await page.getByRole("checkbox").first().check();
  await page.getByRole("button", { name: "Скопировать шаблон" }).tap();
  await expect(page.getByRole("status")).toContainText("Текст выделен");
  const field = page.getByRole("textbox", { name: "Текст для копирования" });
  await expect(field).toBeFocused();
  expect(
    await field.evaluate((el) => {
      const t = el as HTMLTextAreaElement;
      return t.selectionEnd - t.selectionStart === t.value.length;
    }),
  ).toBe(true);
  await page.getByRole("link", { name: "Назад к разделу" }).tap();
  await expect(page).toHaveURL(/\/app\/library$/);
});

test("speaking builder updates both the copied brief and the manual Telegram handoff", async ({
  page,
}) => {
  await page.addInitScript(() =>
    Object.defineProperty(navigator, "clipboard", {
      configurable: true,
      value: {
        writeText: async (value: string) => {
          (window as unknown as { copiedText: string }).copiedText = value;
        },
      },
    }),
  );
  await page.goto("/app/speaking");
  await page.getByRole("button", { name: "Преподаватели", exact: true }).tap();
  await page.getByRole("button", { name: "Практикум", exact: true }).tap();
  await expect(
    page.getByRole("heading", {
      name: "Как превратить инструмент в учебный опыт?",
    }),
  ).toBeVisible();
  const field = page.getByRole("textbox", { name: "Текст для копирования" });
  await expect(field).toHaveValue(/Аудитория: Преподаватели/);
  await expect(field).toHaveValue(/формат: Практикум/);
  await page.getByRole("button", { name: "Скопировать запрос" }).tap();
  await expect(page.getByRole("status")).toContainText("Скопировано");
  const copied = await page.evaluate(
    () => (window as unknown as { copiedText: string }).copiedText,
  );
  expect(copied).toBe(await field.inputValue());
  const link = new URL(
    (await page
      .getByRole("link", { name: "Обсудить с Сергеем" })
      .getAttribute("href"))!,
  );
  expect(link.hostname).toBe("t.me");
  expect(link.searchParams.get("text")).toBe(copied);
});

test("project chooser launches film and interactive application without leaving Mini App", async ({
  page,
}) => {
  await page.goto("/app/solutions");
  await page.getByRole("button", { name: "Ресторан", exact: true }).tap();
  await page.getByRole("button", { name: /^Смотреть видео:/ }).tap();
  await expect(page.getByRole("dialog").locator("video")).toHaveAttribute(
    "src",
    /gastro\.mp4/,
  );
  await page.getByRole("button", { name: "Закрыть видео" }).tap();
  const launch = page.getByRole("button", {
    name: "Открыть приложение",
    exact: true,
  });
  await launch.tap();
  await expect(page.getByRole("dialog").locator("iframe")).toHaveAttribute(
    "src",
    /\/showcase\/menu\/index.html/,
  );
  await expect(page.getByRole("dialog").getByRole("status")).toContainText(
    "Можно нажимать",
    { timeout: 20000 },
  );
  await page.getByRole("button", { name: "Закрыть просмотр" }).tap();
  await expect(launch).toBeFocused();
  await expect(page).toHaveURL(/\/app\/solutions$/);
});

for (const theme of ["light", "dark"])
  test(`pocket screens stay accessible and fit 320px in ${theme} theme`, async ({
    page,
  }) => {
    await page.setViewportSize({ width: 320, height: 740 });
    for (const path of [
      "/app",
      "/app/training",
      "/app/solutions",
      "/app/speaking",
      "/app/library",
      "/app/guides/task-brief",
      "/app/practice/check-answer",
      "/app/contact",
    ]) {
      await page.goto(path);
      await page.locator(".miniapp").evaluate((el, t) => {
        (el as HTMLElement).dataset.theme = t;
      }, theme);
      await expect(page.locator("h1")).toBeVisible();
      expect(
        await page.evaluate(
          () => document.documentElement.scrollWidth <= innerWidth,
        ),
        path,
      ).toBe(true);
      const audit = await new AxeBuilder({ page }).analyze();
      expect(audit.violations, path).toEqual([]);
    }
  });

test("new allowlisted launch targets open guides and practice while unknown guides are 404", async ({
  page,
}) => {
  await page.goto("/app?tgWebAppStartParam=task-brief");
  await expect(page).toHaveURL(/\/app\/guides\/task-brief$/);
  await page.goto("/app?tgWebAppStartParam=check-answer");
  await expect(page).toHaveURL(/\/app\/practice\/check-answer$/);
  const response = await page.goto("/app/guides/not-a-guide");
  expect(response?.status()).toBe(404);
});

test("tablet layout keeps the three home choices visible with reduced motion", async ({
  page,
}) => {
  await page.setViewportSize({ width: 640, height: 960 });
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/app");
  for (const label of ["Найти решение", "Для аудитории", "Попробовать ИИ"]) {
    await page.getByRole("button", { name: label, exact: true }).tap();
    const feature = page.getByRole("region", { name: "Быстрый старт" });
    await expect(feature.getByRole("link")).toBeVisible();
    expect(
      await feature.evaluate((el) => {
        // Decorative objects intentionally extend beyond the clipped cover.
        // Text and the action must stay completely inside its visible bounds.
        const bounds = el.getBoundingClientRect();
        return (
          [...el.querySelectorAll("h2, p, a")].every((node) => {
            const rect = node.getBoundingClientRect();
            return rect.left >= bounds.left && rect.right <= bounds.right;
          }) && document.documentElement.scrollWidth <= innerWidth
        );
      }),
    ).toBe(true);
    expect(
      await page.evaluate(
        () =>
          document
            .getAnimations()
            .filter(
              (a) =>
                a.playState === "running" &&
                Number(a.effect?.getComputedTiming().duration) > 1,
            ).length,
      ),
    ).toBe(0);
  }
});
