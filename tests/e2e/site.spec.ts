import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
test("practice keeps answers, restores progress, finishes and resets", async ({
  page,
}) => {
  await page.goto("/practice/first-ai-task");
  await page.getByRole("button", { name: "Начать практику" }).click();
  await page.getByLabel("Таблица", { exact: true }).check();
  await page.getByRole("button", { name: "Далее" }).click();
  await page.getByLabel("Исходные данные").fill("Учебный список задач");
  await page.getByLabel("Желаемый результат").fill("План на неделю");
  await page.getByLabel("Способ проверки").fill("Сравнить с исходным списком");
  await page.getByLabel("Последствия ошибки").selectOption("high");
  await page.getByRole("button", { name: "Назад", exact: true }).click();
  await expect(page.getByLabel("Таблица", { exact: true })).toBeChecked();
  await page.getByRole("button", { name: "Далее" }).click();
  await page.reload();
  await expect(page.getByLabel("Исходные данные")).toHaveValue(
    "Учебный список задач",
  );
  await page.getByRole("button", { name: "Получить карточку" }).click();
  await expect(
    page.getByRole("heading", { name: "Ваша карточка задачи" }),
  ).toBeVisible();
  await expect(page.getByTestId("task-card")).toContainText("специалист");
  await page.getByRole("button", { name: "Начать заново" }).click();
  await expect(
    page.getByRole("button", { name: "Начать практику" }),
  ).toBeVisible();
  expect(
    await page.evaluate(() =>
      localStorage.getItem("fedorenko:first-ai-task:v1"),
    ),
  ).toBeNull();
});
test("key pages have no serious or critical automated accessibility findings", async ({
  page,
}) => {
  for (const path of [
    "/",
    "/contact",
    "/materials/crm-checklist",
    "/practice/first-ai-task",
    "/app",
  ]) {
    await page.goto(path);
    const results = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
      .analyze();
    expect(
      results.violations.filter((x) =>
        ["serious", "critical"].includes(x.impact || ""),
      ),
    ).toEqual([]);
  }
});
test("mobile menu closes with Escape and returns focus", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");
  const menu = page.getByRole("button", { name: "Открыть меню" });
  await menu.click();
  await page.keyboard.press("Escape");
  await expect(menu).toBeFocused();
  await expect(menu).toHaveAttribute("aria-expanded", "false");
});
test("web and app share material, unknown slug is 404, unknown launch falls back", async ({
  page,
}) => {
  await page.goto("/materials/crm-checklist");
  const title = await page.locator("h1").innerText();
  await page.goto("/app/materials/crm-checklist");
  await expect(page.locator("h1")).toHaveText(title);
  const response = await page.goto("/materials/not-a-real-material");
  expect(response?.status()).toBe(404);
  await page.goto("/app?tgWebAppStartParam=unknown");
  await expect(page.getByText("Такой раздел не найден")).toBeVisible();
});
test("static lead endpoint never reports success or stores a request", async ({
  request,
}) => {
  const response = await request.post("/api/leads", {
    data: { contact: "test@example.invalid", message: "synthetic" },
  });
  expect(response.status()).toBe(503);
  expect(await response.json()).toMatchObject({ code: "LEADS_DISABLED" });
});
test("all published routes load and draft programs stay outside production sitemap", async ({
  request,
}) => {
  for (const path of [
    "/",
    "/training",
    "/solutions",
    "/cases",
    "/cases/rehab",
    "/cases/gastro",
    "/cases/english-lab",
    "/materials",
    "/materials/first-automation",
    "/materials/verify-ai",
    "/speaking",
    "/contact",
    "/privacy",
    "/terms",
    "/app/training",
    "/app/solutions",
    "/app/practice/first-ai-task",
  ]) {
    expect((await request.get(path)).status(), path).toBe(200);
  }
  const sitemap = await (await request.get("/sitemap.xml")).text();
  expect(sitemap).not.toContain("/training/everyday-ai");
  expect(sitemap).not.toContain("/app/");
  if (process.env.PLAYWRIGHT_BASE_URL)
    expect((await request.get("/training/everyday-ai")).status()).toBe(404);
});
test("practice remains usable when browser storage is unavailable", async ({
  page,
}) => {
  await page.addInitScript(() => {
    Object.defineProperty(window, "localStorage", {
      get() {
        throw new DOMException("Disabled", "SecurityError");
      },
    });
  });
  await page.goto("/practice/first-ai-task");
  await expect(
    page.getByText("Сохранение недоступно", { exact: false }),
  ).toBeVisible();
  await page.getByRole("button", { name: "Начать практику" }).click();
  await page.getByRole("button", { name: "Далее" }).click();
  await page.getByLabel("Исходные данные").fill("Учебные заметки");
  await page.getByLabel("Желаемый результат").fill("План");
  await page.getByLabel("Способ проверки").fill("Сверка");
  await page.getByRole("button", { name: "Получить карточку" }).click();
  await expect(page.getByTestId("task-card")).toContainText("Учебные заметки");
});
for (const width of [360, 390, 768, 1440]) {
  test(`responsive ${width}px: home, case, material and practice fit viewport`, async ({
    page,
  }) => {
    await page.setViewportSize({ width, height: 900 });
    for (const path of [
      "/",
      "/cases/edcrm",
      "/materials/crm-checklist",
      "/practice/first-ai-task",
      "/app",
    ]) {
      await page.goto(path);
      expect(
        await page.evaluate(
          () => document.documentElement.scrollWidth <= innerWidth,
        ),
      ).toBe(true);
      await expect(page.locator("h1")).toBeVisible();
    }
  });
}
