"use client";
import { useState } from "react";
import { speakingAudiences, speakingFormats } from "@/content/pocket-guides";
import { telegramDraftUrl } from "@/lib/contact-draft";
import CopyBlock from "./CopyBlock";
import Icon from "@/components/site/Icon";
import s from "./Pocket.module.css";
export default function SpeakingBuilder() {
  const [audience, setAudience] = useState(0),
    [format, setFormat] = useState(1);
  const a = speakingAudiences[audience],
    f = speakingFormats[format];
  const text = `Сергей, здравствуйте! Хотим обсудить выступление.\nАудитория: ${a.label}.\nИнтересующий формат: ${f.label}.\nТема для обсуждения: ${a.question}\n\nМероприятие: …\nДата и место: …\nКоличество участников: …\nПожелания: …`;
  return (
    <section id="brief" className={s.builder} aria-labelledby="builder-title">
      <p className={s.smallLabel}>Соберите запрос</p>
      <h2 id="builder-title">
        Для кого
        <br />и о чём?
      </h2>
      <fieldset className={s.segmentField}>
        <legend>Кто будет в зале</legend>
        <div>
          {speakingAudiences.map((v, i) => (
            <button
              key={v.id}
              aria-pressed={i === audience}
              onClick={() => setAudience(i)}
            >
              {v.label}
            </button>
          ))}
        </div>
      </fieldset>
      <fieldset className={s.segmentField}>
        <legend>Какой формат интересен</legend>
        <div>
          {speakingFormats.map((v, i) => (
            <button
              key={v.id}
              aria-pressed={i === format}
              onClick={() => setFormat(i)}
            >
              {v.label}
            </button>
          ))}
        </div>
      </fieldset>
      <div
        className={s.programTicket}
        key={`${a.id}-${f.id}`}
        aria-live="polite"
        aria-atomic="true"
      >
        <span>Набросок для обсуждения</span>
        <h3>{a.question}</h3>
        <p>{f.text}</p>
        <ul>
          {a.points.map((point) => (
            <li key={point}>
              <Icon name="check" size={17} />
              {point}
            </li>
          ))}
        </ul>
        <small>Содержание, длительность и условия согласуем лично.</small>
      </div>
      <CopyBlock
        key={`${a.id}-${f.id}-copy`}
        text={text}
        label="Скопировать запрос"
      />
      <a href={telegramDraftUrl(text)} className={s.primary}>
        Обсудить с Сергеем
        <Icon />
      </a>
      <p className={s.footnote}>
        Откроется личный чат. Сообщение отправляете вы.
      </p>
    </section>
  );
}
