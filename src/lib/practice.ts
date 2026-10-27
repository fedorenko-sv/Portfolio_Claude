export const STORAGE_KEY = "fedorenko:first-ai-task:v1";
export const TTL = 30 * 24 * 60 * 60 * 1000;
export type Answers = {
  kind: "text" | "table" | "requests" | "other";
  frequency: "daily" | "weekly" | "rare";
  input: string;
  result: string;
  verification: string;
  risk: "low" | "medium" | "high";
};
export type Progress = {
  version: 1;
  updatedAt: number;
  step: number;
  answers: Answers;
};
export const emptyAnswers: Answers = {
  kind: "text",
  frequency: "weekly",
  input: "",
  result: "",
  verification: "",
  risk: "low",
};
export const kinds = {
  text: "Текст",
  table: "Таблица",
  requests: "Обращения",
  other: "Другое",
};
export const frequencies = {
  daily: "Каждый день",
  weekly: "Каждую неделю",
  rare: "Редко",
};
export function recommend(answers: Pick<Answers, "risk">): string {
  if (answers.risk === "high")
    return "Высокая цена ошибки: ограничьте ИИ подготовкой черновика. До использования результат должен проверить профильный специалист. Не передавайте конфиденциальные данные.";
  if (answers.risk === "medium")
    return "Начните с небольшой учебной выборки. Проверьте каждый результат по исходным данным, прежде чем применять его в работе.";
  return "Возьмите один небольшой пример с обезличенными данными. Сравните результат с заранее заданным образцом и запишите, что пришлось исправить.";
}
export function canFinish(
  answers: Pick<Answers, "input" | "result" | "verification">,
): boolean {
  return [answers.input, answers.result, answers.verification].every(
    (value) =>
      typeof value === "string" &&
      value.trim().length > 0 &&
      value.length <= 1000,
  );
}
export function taskCard(a: Answers): string {
  return `Моя первая задача для ИИ\n\nТип: ${kinds[a.kind]}\nПовторяемость: ${frequencies[a.frequency]}\nИсходные данные: ${a.input.trim()}\nОжидаемый результат: ${a.result.trim()}\nКак проверю: ${a.verification.trim()}\nЦена ошибки: ${{ low: "Низкая", medium: "Средняя", high: "Высокая" }[a.risk]}\n\nСледующий шаг: ${recommend(a)}\n\nУчебная карточка, не автоматический аудит бизнеса.`;
}
export function readProgress(
  raw: string | null,
  now = Date.now(),
): Progress | null {
  try {
    if (!raw || raw.length > 10000) return null;
    const p = JSON.parse(raw);
    if (
      p.version !== 1 ||
      !Number.isInteger(p.step) ||
      p.step < 0 ||
      p.step > 3 ||
      !Number.isFinite(p.updatedAt) ||
      p.updatedAt > now ||
      now - p.updatedAt >= TTL
    )
      return null;
    const a = p.answers;
    if (
      !a ||
      !["text", "table", "requests", "other"].includes(a.kind) ||
      !["daily", "weekly", "rare"].includes(a.frequency) ||
      !["low", "medium", "high"].includes(a.risk)
    )
      return null;
    if (
      ![a.input, a.result, a.verification].every(
        (v) => typeof v === "string" && v.length <= 1000,
      )
    )
      return null;
    if (p.step === 3 && !canFinish(a)) return null;
    return p as Progress;
  } catch {
    return null;
  }
}
