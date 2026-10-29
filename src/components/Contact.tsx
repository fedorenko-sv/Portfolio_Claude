"use client";
import { useEffect, useRef, useState } from "react";
import {
  contactTopics,
  contactDraft,
  safeTopic,
  telegramDraftUrl,
  type ContactTopic,
} from "@/lib/contact-draft";
import { track } from "@/lib/analytics";
import Icon from "@/components/site/Icon";
export default function Contact() {
  const [topic, setTopic] = useState<ContactTopic>("development");
  const [draft, setDraft] = useState(() => contactDraft("development"));
  const [copied, setCopied] = useState("");
  const project = useRef<string | null>(null);
  const field = useRef<HTMLTextAreaElement>(null);
  useEffect(() => {
    const p = new URLSearchParams(location.search);
    project.current = p.get("project");
    const t = safeTopic(p.get("type"));
    // The allowlisted URL describes the initial contact context.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setTopic(t);
    setDraft(contactDraft(t, project.current));
  }, []);
  function choose(t: ContactTopic) {
    setTopic(t);
    setDraft(contactDraft(t, project.current));
    setCopied("");
  }
  async function copy() {
    try {
      await navigator.clipboard.writeText(draft);
      setCopied("Текст скопирован. Можно вставить его в чат.");
      track("contact_template_copy", { topic, placement: "contact" });
    } catch {
      field.current?.focus();
      field.current?.select();
      setCopied(
        "Текст выделен. Скопируйте его сочетанием Ctrl+C или через меню устройства.",
      );
    }
  }
  return (
    <div className="contact-workspace wrap">
      <div>
        <p className="eyebrow">Начнём с вашей ситуации</p>
        <h2>О чём поговорим?</h2>
        <fieldset className="topic-options">
          <legend>Тема обращения</legend>
          {Object.entries(contactTopics).map(([value, label]) => (
            <label className={topic === value ? "selected" : ""} key={value}>
              <input
                type="radio"
                name="topic"
                value={value}
                checked={topic === value}
                onChange={() => choose(value as ContactTopic)}
              />
              {label}
            </label>
          ))}
        </fieldset>
        <label className="draft-label" htmlFor="contact-draft">
          Можно отредактировать перед переходом
        </label>
        <textarea
          ref={field}
          id="contact-draft"
          value={draft}
          onChange={(e) => {
            setDraft(e.target.value);
            setCopied("");
          }}
          rows={9}
        />
        <div className="actions">
          <a
            className="button"
            href={telegramDraftUrl(draft)}
            onClick={() =>
              track("contact_click", {
                topic,
                placement: "contact",
                source: "website",
              })
            }
          >
            Открыть Telegram с этим текстом
            <Icon />
          </a>
          <button type="button" className="subtle-link" onClick={copy}>
            Скопировать текст
            <Icon name="right" />
          </button>
        </div>
        <p className="contact-status" role="status">
          {copied || "Откроется личный чат. Сообщение отправляете вы."}
        </p>
      </div>
      <aside className="contact-aside">
        <p className="editorial-quote">«Начать можно с одного вопроса»</p>
        <p>
          Как связать заявки и расписание? Какой формат обучения подойдёт
          команде? Достаточно коротко рассказать о своей ситуации.
        </p>
        <p>
          Если удобнее, напишите без шаблона:{" "}
          <a href="https://t.me/fedorenko3d">@fedorenko3d</a>.
        </p>
      </aside>
    </div>
  );
}
