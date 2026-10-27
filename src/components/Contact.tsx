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
        <h2>Без лишних данных</h2>
        <p>
          Не отправляйте медицинские, детские, служебные документы, пароли или
          доступы. Для первого обсуждения достаточно обезличенного описания.
        </p>
        <p>
          Серверная форма на этой версии сайта отключена. Сайт не сохраняет
          обращение и не показывает подтверждение отправки.
        </p>
      </aside>
    </div>
  );
}
