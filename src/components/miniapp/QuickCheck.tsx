"use client";
import { useRef, useState } from "react";
import Link from "next/link";
import { lessonExamples } from "@/content/experiences";
import Icon from "@/components/site/Icon";
import s from "./Pocket.module.css";
export default function QuickCheck() {
  const [index, setIndex] = useState(0),
    [choice, setChoice] = useState<number | null>(null),
    [done, setDone] = useState(false);
  const heading = useRef<HTMLHeadingElement>(null);
  const item = lessonExamples[index],
    correct = choice === item.wrong;
  function next() {
    if (index === lessonExamples.length - 1) setDone(true);
    else {
      setIndex(index + 1);
      setChoice(null);
    }
    requestAnimationFrame(() => heading.current?.focus());
  }
  if (done)
    return (
      <section className={s.result} aria-label="Результат упражнения">
        <span className={s.resultSeal} aria-hidden>
          ✓
        </span>
        <h1 ref={heading} tabIndex={-1}>
          Убедительно —<br />
          ещё не достоверно.
        </h1>
        <p>
          Вы разобрали три ловушки: выдуманную конкретику, неподтверждённое
          условие и слишком широкий вывод.
        </p>
        <div className={s.takeaway}>
          <strong>Заберите правило</strong>
          <p>
            У каждого утверждения должен быть источник в исходных данных. Если
            его нет — уточните или обозначьте предположение.
          </p>
        </div>
        <Link href="/app/materials/verify-ai" className={s.primary}>
          Открыть памятку
          <Icon />
        </Link>
        <button
          className={s.textButton}
          onClick={() => {
            setIndex(0);
            setChoice(null);
            setDone(false);
            requestAnimationFrame(() => heading.current?.focus());
          }}
        >
          Пройти ещё раз
        </button>
      </section>
    );
  return (
    <div className={s.quiz}>
      <div className={s.progressLine}>
        <Link href="/app/training">← К обучению</Link>
        <span>
          Пример {index + 1} из {lessonExamples.length}
        </span>
      </div>
      <div className={s.progressBars} aria-hidden>
        {lessonExamples.map((_, i) => (
          <span key={i} data-active={i <= index} />
        ))}
      </div>
      <h1 ref={heading} tabIndex={-1}>
        Найдите то,
        <br />
        чего нет в данных.
      </h1>
      <p className={s.lead}>
        Учебный ответ ИИ звучит уверенно. Одна фраза в нём — догадка.
      </p>
      <aside key={index} className={s.factSheet}>
        <span>{item.topic}</span>
        <h2>Что известно</h2>
        <ul>
          {item.facts.map((f) => (
            <li key={f}>{f}</li>
          ))}
        </ul>
      </aside>
      <fieldset className={s.quizChoices}>
        <legend>Какая фраза не подтверждена?</legend>
        {item.claims.map((claim, i) => (
          <button
            key={claim}
            aria-pressed={choice === i}
            data-state={choice === i ? (correct ? "correct" : "retry") : ""}
            onClick={() => setChoice(i)}
          >
            <span aria-hidden>
              {choice === i ? (correct ? "✓" : "↺") : "+"}
            </span>
            {claim}
          </button>
        ))}
      </fieldset>
      <div className={s.feedback} role="status">
        {choice === null ? (
          <p>Нажмите на фразу, для которой не хватает фактов.</p>
        ) : correct ? (
          <>
            <strong>Вы нашли подмену.</strong>
            <p>{item.explanation}</p>
            <blockquote>{item.fix}</blockquote>
          </>
        ) : (
          <>
            <strong>Эта фраза согласуется с данными.</strong>
            <p>Попробуйте ещё раз. Ищите то, что автор добавил от себя.</p>
          </>
        )}
      </div>
      {correct && (
        <button className={s.primary} onClick={next}>
          {index === lessonExamples.length - 1
            ? "Забрать вывод"
            : "Следующий пример"}
          <Icon name="right" />
        </button>
      )}
    </div>
  );
}
