export const contactTopics = {
  training: "Обучение команды",
  speaking: "Выступление",
  development: "Разработка",
  automation: "Автоматизация",
} as const;
export type ContactTopic = keyof typeof contactTopics;
const projects: Record<string, string> = {
  edcrm: "CRM для образовательных центров",
  rehab: "Система размещения и сопровождения гостей",
  "english-lab": "Платформа интерактивных уроков и лекций",
  gastro: "Интерактивное меню для ресторана",
};
export function safeTopic(value: string | null): ContactTopic {
  return value && Object.hasOwn(contactTopics, value)
    ? (value as ContactTopic)
    : "development";
}
export function contactDraft(topic: string, project?: string | null) {
  const texts = {
    training:
      "Сергей, здравствуйте! Хотим организовать обучение по ИИ.\nАудитория: …\nКоличество участников: …\nРабочие задачи: …\nФормат и сроки: …",
    speaking:
      "Сергей, здравствуйте! Приглашаем выступить на мероприятии …\nАудитория: …\nДата и место: …\nИнтересующая тема: …",
    development:
      "Сергей, здравствуйте! Хотим обсудить разработку.\nПроцесс: …\nСейчас работаем так: …\nХотим получить: …",
    automation:
      "Сергей, здравствуйте! Хотим сократить ручные действия в процессе …\nИсходные данные: …\nЖелаемый результат: …",
  };
  return (
    texts[safeTopic(topic)] +
    (project && Object.hasOwn(projects, project)
      ? `\nПохожий проект на сайте: ${projects[project]}.`
      : "")
  );
}
export function telegramDraftUrl(text: string) {
  return `https://t.me/fedorenko3d?text=${encodeURIComponent(text)}`;
}
