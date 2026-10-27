"use client";
import { useEffect, useState } from "react";
import TrackedLink from "@/components/shared/TrackedLink";
const topics = {
  training: "Обучение команды",
  speaking: "Выступление",
  development: "Разработка",
  automation: "Автоматизация",
};
export default function Contact() {
  const [topic, setTopic] = useState("development");
  useEffect(() => {
    const value = new URLSearchParams(window.location.search).get("type");
    if (value && Object.hasOwn(topics, value)) {
      // Hydrate a non-sensitive allowlisted query parameter; server output stays deterministic.
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setTopic(value);
    }
  }, []);
  return (
    <div className="detail-grid">
      <div>
        <fieldset className="topic-options">
          <legend>Тема обращения</legend>
          {Object.entries(topics).map(([value, label]) => (
            <label className={topic === value ? "selected" : ""} key={value}>
              <input
                name="topic"
                type="radio"
                checked={topic === value}
                onChange={() => setTopic(value)}
              />
              {label}
            </label>
          ))}
        </fieldset>
        <div className="note-panel">
          <h2>Что поможет начать разговор</h2>
          <p>
            Расскажите, какой процесс или занятие вы задумали, кто будет
            участвовать и что хотите получить. Тему «
            {topics[topic as keyof typeof topics]}» можно указать в сообщении.
          </p>
          <TrackedLink className="button" href="https://t.me/fedorenko3d">
            Написать Сергею в Telegram ↗
          </TrackedLink>
          <p className="small">
            Откроется личный чат. Сообщение вы пишете и отправляете
            самостоятельно.
          </p>
        </div>
      </div>
      <aside className="prose">
        <h2>Начать можно с одного вопроса</h2>
        <p>
          Как связать заявки и расписание? Что нужно описать перед разработкой?
          Какой формат обучения подойдёт команде? Достаточно коротко рассказать
          о своей ситуации.
        </p>
        <p>
          Если есть пример процесса, начните с его обезличенного описания.
          Детали и следующий шаг обсудим в личном разговоре.
        </p>
      </aside>
    </div>
  );
}
