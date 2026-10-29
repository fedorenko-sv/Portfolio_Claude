"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import {
  STORAGE_KEY,
  canFinish,
  emptyAnswers,
  kinds,
  frequencies,
  readProgress,
  taskCard,
  type Answers,
  type Progress,
} from "@/lib/practice";
import { track } from "@/lib/analytics";
const steps = ["С чего начать", "Тип задачи", "Условия задачи", "Карточка"];
function timestampProgress(next: Progress): Progress {
  return { ...next, updatedAt: Date.now() };
}
function eventSource(): string {
  return typeof window !== "undefined" && window.Telegram?.WebApp?.initData
    ? "telegram"
    : "website";
}
export default function Practice({ app = false }: { app?: boolean }) {
  const [state, setState] = useState<Progress>({
    version: 1,
    updatedAt: 0,
    step: 0,
    answers: { ...emptyAnswers },
  });
  const [ready, setReady] = useState(false);
  const [notice, setNotice] = useState("");
  const [error, setError] = useState("");
  const [storageAvailable, setStorageAvailable] = useState(true);
  const heading = useRef<HTMLHeadingElement>(null);
  const first = useRef(true);
  const { step, answers } = state;
  /* eslint-disable react-hooks/set-state-in-effect -- Restore browser-only progress once after hydration. */
  useEffect(() => {
    let restored: Progress | null = null;
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      restored = readProgress(raw);
      if (raw && !restored) localStorage.removeItem(STORAGE_KEY);
    } catch {
      setStorageAvailable(false);
    }
    // Restore device-only data after hydration. Nothing is sent to the server.
    if (restored) setState(restored);
    setReady(true);
  }, []);
  /* eslint-enable react-hooks/set-state-in-effect */
  useEffect(() => {
    if (!ready) return;
    if (first.current) {
      first.current = false;
      return;
    }
    heading.current?.focus();
  }, [step, ready]);
  function commit(next: Progress) {
    const updated = timestampProgress(next);
    setState(updated);
    setNotice("");
    setError("");
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    } catch {
      setStorageAvailable(false);
    }
  }
  function update<K extends keyof Answers>(key: K, value: Answers[K]) {
    commit({ ...state, answers: { ...answers, [key]: value } });
  }
  function go(next: number) {
    if (next === 3 && !canFinish(answers)) {
      setError("Заполните исходные данные, результат и способ проверки.");
      return;
    }
    if (step === 0 && next === 1)
      track("practice_start", {
        id: "first-ai-task",
        source: eventSource(),
      });
    if (next === 3)
      track("practice_complete", {
        id: "first-ai-task",
        source: eventSource(),
      });
    commit({ ...state, step: next });
  }
  function reset() {
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {}
    setState({
      version: 1,
      updatedAt: 0,
      step: 0,
      answers: { ...emptyAnswers },
    });
    setError("");
    setNotice("Прогресс удалён.");
  }
  async function copy() {
    try {
      await navigator.clipboard.writeText(taskCard(answers));
      setNotice("Карточка скопирована.");
    } catch {
      setNotice(
        "Копирование недоступно. Выделите текст карточки и скопируйте вручную.",
      );
    }
  }
  if (!ready)
    return <p role="status">Проверяем прогресс на этом устройстве…</p>;
  return (
    <div className="practice-shell">
      <div className="practice-progress" aria-label={`Шаг ${step + 1} из 4`}>
        {steps.map((title, i) => (
          <span key={title} className={i <= step ? "active" : ""}>
            <b>{i + 1}</b>
            <span>{title}</span>
          </span>
        ))}
      </div>
      <p className="storage-note">
        {storageAvailable
          ? "На этом устройстве · 30 дней с последнего действия"
          : "Сохранение недоступно · ответы останутся только в текущей вкладке"}
      </p>
      <div className="practice-form">
        <h2 tabIndex={-1} ref={heading}>
          {step === 3 ? "Ваша карточка задачи" : steps[step]}
        </h2>
        {step === 0 && (
          <>
            <p>
              Выберите одну небольшую рабочую задачу. Укажите исходные данные,
              желаемый результат и способ проверки — получите собственную
              карточку для первого опыта с ИИ.
            </p>
            <div className="example-grid">
              <div>
                <span className="eyebrow">ПРИМЕР / ТЕКСТ</span>
                <p>
                  Из обезличенных заметок встречи собрать черновик повестки.
                  Проверить каждый пункт по заметкам.
                </p>
              </div>
              <div>
                <span className="eyebrow">ПРИМЕР / ТАБЛИЦА</span>
                <p>
                  Найти пустые поля в учебном списке заявок. Сверить с исходной
                  таблицей, ничего не менять автоматически.
                </p>
              </div>
            </div>
            <p className="small">
              Без регистрации и AI API. Карточка не отправляется Сергею
              автоматически.
            </p>
            <button className="button" onClick={() => go(1)}>
              Начать практику
            </button>
          </>
        )}
        {step === 1 && (
          <>
            <fieldset className="topic-options">
              <legend>С чем связана задача?</legend>
              {Object.entries(kinds).map(([value, label]) => (
                <label
                  key={value}
                  className={answers.kind === value ? "selected" : ""}
                >
                  <input
                    type="radio"
                    name="kind"
                    checked={answers.kind === value}
                    onChange={() => update("kind", value as Answers["kind"])}
                  />
                  {label}
                </label>
              ))}
            </fieldset>
            <label className="field">
              Как часто она повторяется?
              <select
                value={answers.frequency}
                onChange={(e) =>
                  update("frequency", e.target.value as Answers["frequency"])
                }
              >
                {Object.entries(frequencies).map(([value, label]) => (
                  <option key={value} value={value}>
                    {label}
                  </option>
                ))}
              </select>
            </label>
            <div className="actions">
              <button className="button secondary" onClick={() => go(0)}>
                Назад
              </button>
              <button className="button" onClick={() => go(2)}>
                Далее
              </button>
            </div>
          </>
        )}
        {step === 2 && (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              go(3);
            }}
          >
            <p id="privacy-hint" className="note-panel small">
              Используйте общее описание или синтетический пример. Не вводите
              конфиденциальные сведения, данные клиентов, детей или пациентов.
            </p>
            {(
              [
                [
                  "input",
                  "Исходные данные",
                  "Например: пять обезличенных заметок встречи.",
                ],
                [
                  "result",
                  "Желаемый результат",
                  "Например: повестка со списком вопросов.",
                ],
                [
                  "verification",
                  "Способ проверки",
                  "Например: сравнить каждый пункт с исходными заметками.",
                ],
              ] as const
            ).map(([key, label, hint]) => (
              <label className="field" key={key} htmlFor={`practice-${key}`}>
                {label}
                <textarea
                  id={`practice-${key}`}
                  required
                  maxLength={1000}
                  value={answers[key]}
                  onChange={(e) => update(key, e.target.value)}
                  aria-describedby={`${key}-hint privacy-hint${error ? " practice-error" : ""}`}
                  aria-invalid={error ? !answers[key].trim() : undefined}
                />
                <span id={`${key}-hint`} className="field-hint">
                  {hint}
                </span>
              </label>
            ))}
            <label className="field">
              Последствия ошибки
              <select
                value={answers.risk}
                onChange={(e) =>
                  update("risk", e.target.value as Answers["risk"])
                }
              >
                <option value="low">Низкие — легко исправить черновик</option>
                <option value="medium">
                  Средние — повлияет на рабочий процесс
                </option>
                <option value="high">
                  Высокие — деньги, здоровье, права людей
                </option>
              </select>
            </label>
            {error && (
              <p id="practice-error" role="alert">
                {error}
              </p>
            )}
            <div className="actions">
              <button
                type="button"
                className="button secondary"
                onClick={() => go(1)}
              >
                Назад
              </button>
              <button type="submit" className="button">
                Получить карточку
              </button>
            </div>
          </form>
        )}
        {step === 3 && (
          <>
            <pre tabIndex={0} data-testid="task-card" className="task-card">
              {taskCard(answers)}
            </pre>
            <div className="actions">
              <button className="button" onClick={copy}>
                Копировать карточку
              </button>
              <button className="button secondary" onClick={() => go(2)}>
                Изменить ответы
              </button>
            </div>
            <p>
              Это учебная подсказка, не автоматический аудит бизнеса. Начните с
              одного примера и сохраните результаты проверки.
            </p>
            <div className="actions">
              <Link
                className="text-link"
                href={app ? "/app/training" : "/training"}
              >
                Посмотреть форматы обучения ↗
              </Link>
              <Link className="text-link" href="/contact?type=training">
                Разобрать такие задачи с командой ↗
              </Link>
            </div>
          </>
        )}
        <p role="status" aria-live="polite">
          {notice}
        </p>
        {step > 0 && (
          <button className="reset-button" onClick={reset}>
            Начать заново
          </button>
        )}
      </div>
    </div>
  );
}
