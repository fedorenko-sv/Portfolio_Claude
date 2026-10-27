export function replyFor(text: string, siteUrl: string) {
  const origin = new URL(siteUrl);
  if (origin.protocol !== "https:")
    throw new Error("HTTPS Mini App origin required");
  const command = text.split(/\s/)[0].split("@")[0];
  if (!["/start", "/help"].includes(command)) return null;
  return {
    text:
      command === "/start"
        ? "Практика ИИ с Сергеем Федоренко. Выберите первую рабочую задачу, откройте материалы или обсудите обучение."
        : "Откройте приложение кнопкой ниже. Практика бесплатна, без регистрации. Прогресс хранится на этом устройстве 30 дней. Карточка задачи не отправляется Сергею автоматически. Личная связь: https://t.me/fedorenko3d",
    reply_markup: {
      inline_keyboard: [
        [
          {
            text: "Открыть практику и материалы",
            web_app: { url: `${origin.origin}/app` },
          },
        ],
      ],
    },
  };
}
