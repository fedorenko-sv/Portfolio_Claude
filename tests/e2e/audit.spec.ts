import { test, expect } from "@playwright/test";
import path from "node:path";
test("CRM creates a local lead and keeps it after navigation", async ({
  page,
}) => {
  await page.goto("/showcase/crm/index.html#/crm/leads");
  await page.getByRole("button", { name: "Добавить вручную" }).click();
  await page
    .getByPlaceholder("Анна Петрова", { exact: true })
    .fill("Учебный родитель");
  await page
    .getByPlaceholder("+7 (905) 555-12-34", { exact: true })
    .fill("+70000000000");
  await page.getByPlaceholder("Игорь", { exact: true }).fill("Учебный ученик");
  await page.getByRole("button", { name: "Создать", exact: true }).click();
  await expect(
    page.getByText("Учебный родитель", { exact: true }),
  ).toBeVisible();
  await page.getByRole("link", { name: "Дашборд", exact: true }).click();
  await page.getByRole("link", { name: "Заявки (Лиды)", exact: true }).click();
  await expect(
    page.getByText("Учебный родитель", { exact: true }),
  ).toBeVisible();
});
test("four real packaged applications open and acknowledge readiness", async ({
  page,
}) => {
  for (const [slug, heading] of [
    ["edcrm", "Заявки и Лиды"],
    ["rehab", "Журнал заявок"],
    ["english-lab", "Всё готово к уроку"],
    ["gastro", "МЕНЮ"],
  ]) {
    await page.goto("/cases/" + slug);
    await page
      .getByRole("button", { name: "Открыть приложение", exact: true })
      .click();
    const dialog = page.getByRole("dialog");
    const app = dialog.locator("iframe").contentFrame();
    await expect(
      app.getByRole("heading", { name: new RegExp("^" + heading + "$", "i") }),
    ).toBeVisible({ timeout: 30000 });
    await expect(dialog.getByRole("status")).toContainText("Можно нажимать", {
      timeout: 15000,
    });
    await dialog.getByRole("button", { name: "На весь экран" }).click();
    await expect(dialog).toHaveClass(/is-expanded/);
    await dialog.getByRole("button", { name: "Закрыть просмотр" }).click();
    await expect(page.locator("dialog iframe")).toHaveCount(0);
  }
});
test("lesson answers survive navigation and appear to the teacher", async ({
  page,
}) => {
  await page.goto("/showcase/lessons/index.html");
  await page
    .getByRole("link", { name: "Провести урок", exact: true })
    .first()
    .click();
  await page
    .getByRole("button", { name: "Начать занятие как участник" })
    .click();
  const lesson = page.frameLocator('iframe[title="Интерактивный урок"]');
  await lesson
    .getByLabel("1. Какую задачу вы хотите решить?")
    .fill("Составить план занятия");
  await lesson.getByLabel("2. Какой способ проверки надёжнее?").selectOption({
    label: "Сопоставить результат с исходными данными и критериями",
  });
  await lesson
    .getByLabel("3. Опишите критерий хорошего результата")
    .fill("Проверить все пункты плана");
  await expect(page.getByRole("status")).toHaveText("Сохранено");
  await page
    .getByRole("button", { name: "Посмотреть ответы у преподавателя" })
    .click();
  await expect(page.locator("pre")).toContainText("Составить план занятия");
  await page.getByRole("link", { name: "Вернуться в урок" }).click();
  await expect(
    lesson.getByLabel("1. Какую задачу вы хотите решить?"),
  ).toHaveValue("Составить план занятия");
  await page.getByRole("button", { name: "Новый запуск", exact: true }).click();
  await page
    .getByRole("link", { name: "Провести урок", exact: true })
    .first()
    .click();
  await page
    .getByRole("button", { name: "Начать занятие как участник" })
    .click();
  await expect(
    lesson.getByLabel("1. Какую задачу вы хотите решить?"),
  ).toHaveValue("");
});

test("guest placement creates a booking using the existing guest card", async ({
  page,
}) => {
  await page.goto("/showcase/rehab/index.html#/bookings");
  await expect(
    page.getByRole("heading", { name: "Журнал заявок" }),
  ).toBeVisible();
  const before = await page
    .locator("tr", { hasText: "Черновиков Николай" })
    .count();
  await page.getByRole("link", { name: /Новая заявка/ }).click();
  await page.getByLabel("ФИО *").fill("Черновиков Николай");
  await page.getByLabel("Дата рождения *").fill("1966-07-30");
  await page
    .getByLabel("Карточка в картотеке")
    .selectOption("person-b-1005-g1");
  await page.getByRole("button", { name: /Продолжить/ }).click();
  await page.getByLabel("Название заказчика *").fill("Учебный заказчик");
  await page
    .getByLabel(/Комментарий заявки/)
    .fill("Проверка просмотра портфолио");
  await page.getByRole("button", { name: /Продолжить/ }).click();
  await page.locator("button.available-row").first().click();
  await page.getByRole("button", { name: /Продолжить/ }).click();
  await page.getByRole("button", { name: /Создать заявку/ }).click();
  await expect(
    page.getByRole("heading", { name: "Заявка создана" }),
  ).toBeVisible();
  await page.getByRole("link", { name: "Бронирования", exact: true }).click();
  await expect(
    page.locator("tr", { hasText: "Черновиков Николай" }),
  ).toHaveCount(before + 1);
});
test("live menu works in geometric phone and preserves selection on resize", async ({
  page,
}) => {
  await page.goto("/");
  await page.locator(".phone-scene").scrollIntoViewIfNeeded();
    await expect(page.locator(".phone-scene.scene-ready")).toBeVisible({
    timeout: 20000,
  });
  await page.getByRole("button", { name: "Управлять меню" }).click();
  const menu = page.frameLocator(".phone-stage iframe");
  await expect(menu.getByRole("heading", { name: /^меню$/i })).toBeVisible({
    timeout: 20000,
  });
  await menu
    .getByRole("button", { name: "Добавить в мой выбор", exact: true })
    .first()
    .click();
  await expect(
    menu.getByRole("button", { name: /мой выбор.*1/i }),
  ).toBeVisible();
  await page.setViewportSize({ width: 390, height: 844 });
  await expect(
    page.getByRole("button", { name: "Закрыть меню", exact: true }),
  ).toBeVisible();
  await expect(
    menu.getByRole("button", { name: /мой выбор.*1/i }),
  ).toBeVisible();
  await page.getByRole("button", { name: "Закрыть меню", exact: true }).click();
  await expect(page.locator(".phone-stage")).not.toHaveClass(/is-active/);
});
test("capture the menu at exact phone screen ratio", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 775 });
  await page.goto("/showcase/menu/index.html");
  await expect(page.getByRole("heading", { name: /^меню$/i })).toBeVisible();
  await page.evaluate(() => document.fonts.ready);
  await expect
    .poll(
      () =>
        page
          .locator("img")
          .evaluateAll((imgs) =>
            imgs
              .slice(0, 6)
              .every(
                (i) =>
                  (i as HTMLImageElement).complete &&
                  (i as HTMLImageElement).naturalWidth > 0,
              ),
          ),
      { timeout: 20000 },
    )
    .toBe(true);
  if (process.env.DESIGN_CAPTURE_DIR)
    await page.screenshot({
      path: path.join(process.env.DESIGN_CAPTURE_DIR, "menu-screen.png"),
    });
});
