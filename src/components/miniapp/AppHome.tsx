"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { readProgress, STORAGE_KEY } from "@/lib/practice";
import { readSaved, SAVED_KEY } from "@/lib/library";
import { pocketGuides } from "@/content/pocket-guides";
import LaunchNotice from "./LaunchNotice";
import Icon from "@/components/site/Icon";
import s from "./Pocket.module.css";
const features = [
  {
    tab: "Попробовать ИИ",
    title: (
      <>
        ИИ ошибся.
        <br />
        Заметите?
      </>
    ),
    text: "Три коротких примера. Найдите догадку среди фактов.",
    href: "/app/practice/check-answer",
    action: "Проверить ответ",
    kind: "quiz",
    tag: "Практика без регистрации",
  },
  {
    tab: "Найти решение",
    title: (
      <>
        Процесс
        <br />
        на экране.
      </>
    ),
    text: "Заявки, гости, уроки и меню. Посмотрите, как это работает.",
    href: "/app/solutions",
    action: "Выбрать сценарий",
    kind: "product",
    tag: "Четыре рабочих приложения",
  },
  {
    tab: "Для аудитории",
    title: (
      <>
        Начнём
        <br />с аудитории.
      </>
    ),
    text: "Выберите тему и формат. Соберите запрос на выступление.",
    href: "/app/speaking#brief",
    action: "Собрать запрос",
    kind: "talk",
    tag: "Выступления и мастер-классы",
  },
];
export default function AppHome({ ids }: { ids: string[] }) {
  const [active, setActive] = useState(0),
    [progress, setProgress] = useState<number | null>(null),
    [count, setCount] = useState(0);
  useEffect(() => {
    try {
      // Optional device state is restored after hydration.
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setProgress(
        readProgress(localStorage.getItem(STORAGE_KEY))?.step ?? null,
      );
      setCount(readSaved(localStorage.getItem(SAVED_KEY), ids).length);
    } catch {
      /* The app remains usable without storage. */
    }
  }, [ids]);
  const feature = features[active];
  return (
    <div className={s.home}>
      <LaunchNotice />
      <div className={s.homeIntro}>
        <p>Ваша карманная мастерская</p>
        <h1>
          Что разберём
          <br />
          сегодня?
        </h1>
      </div>
      <div className={s.featureTabs} role="group" aria-label="С чего начать">
        {features.map((f, i) => (
          <button
            key={f.kind}
            aria-pressed={active === i}
            onClick={() => setActive(i)}
          >
            {f.tab}
          </button>
        ))}
      </div>
      <section
        className={s.feature}
        data-kind={feature.kind}
        aria-label="Быстрый старт"
      >
        <div key={feature.kind} className={s.featureInner}>
          <p className={s.featureTag}>{feature.tag}</p>
          <h2>{feature.title}</h2>
          <p className={s.featureText}>{feature.text}</p>
          <div className={s.featureObject} aria-hidden>
            {active === 0 ? (
              <div className={s.paperObject}>
                <span>Ответ ИИ</span>
                <b>Факт?</b>
                <i />
                <i />
                <strong>Проверим.</strong>
              </div>
            ) : active === 1 ? (
              <div className={s.screenObject}>
                <Image
                  src="/media/projects/edcrm-result.webp"
                  width={640}
                  height={360}
                  alt=""
                  sizes="180px"
                />
                <span />
              </div>
            ) : (
              <div className={s.micObject}>
                <i />
                <span />
                <b />
              </div>
            )}
          </div>
        </div>
        <Link className={s.featureAction} href={feature.href}>
          {feature.action}
          <Icon />
        </Link>
      </section>
      <Link className={s.continueCard} href="/app/practice/first-ai-task">
        <span className={s.noteIcon} aria-hidden>
          ↗
        </span>
        <span>
          <strong>
            {progress === 3
              ? "Ваша карточка задачи"
              : progress !== null
                ? "Продолжить практику"
                : "Соберите свою задачу для ИИ"}
          </strong>
          <small>
            {progress === 3
              ? "Вернуться к результату"
              : progress !== null
                ? `Вы остановились на шаге ${progress + 1} из 3`
                : "Данные, результат и способ проверки"}
          </small>
        </span>
        <Icon name="right" size={19} />
      </Link>
      <div className={s.sectionHeading}>
        <h2>Взять с собой</h2>
        <Link href="/app/library">
          Вся библиотека <span aria-hidden>↗</span>
        </Link>
      </div>
      <div className={s.guideShelf}>
        {pocketGuides.slice(0, 3).map((g, i) => (
          <Link
            key={g.slug}
            href={`/app/guides/${g.slug}`}
            className={s.guideTile}
            data-tone={i}
          >
            <span>{g.category}</span>
            <h3>{g.title}</h3>
            <div className={s.miniLines} aria-hidden>
              <i />
              <i />
              <i />
            </div>
            <small>
              {g.time}
              <Icon size={17} />
            </small>
          </Link>
        ))}
      </div>
      <Link className={s.savedLink} href="/app/library">
        <span>
          {count ? `В избранном: ${count}` : "Сохраните полезное на потом"}
        </span>
        <span>Открыть библиотеку ↗</span>
      </Link>
      <div className={s.sectionHeading}>
        <h2>Поработаем вместе</h2>
      </div>
      <div className={s.serviceLinks}>
        {[
          [
            "/app/solutions",
            "Разработать инструмент",
            "От заявки до понятного процесса",
            "↗",
          ],
          [
            "/app/training",
            "Обучить команду",
            "Попробовать, разобрать, применить",
            "✳",
          ],
          [
            "/app/speaking",
            "Пригласить выступить",
            "Живой разбор для вашей аудитории",
            "◉",
          ],
        ].map(([href, title, text, mark]) => (
          <Link key={href} href={href}>
            <span className={s.serviceMark} aria-hidden>
              {mark}
            </span>
            <span>
              <strong>{title}</strong>
              <small>{text}</small>
            </span>
            <Icon size={19} />
          </Link>
        ))}
      </div>
      <Link className={s.authorCard} href="/app/contact">
        <Image
          src="/images/author/portrait.webp"
          width={100}
          height={125}
          alt=""
        />
        <span>
          <strong>На связи — Сергей.</strong>
          <small>
            Опишите задачу своими словами. Начать можно с одного вопроса.
          </small>
        </span>
        <Icon />
      </Link>
      <p className={s.footnote}>
        Без регистрации. Избранное и прогресс хранятся на этом устройстве до 30
        дней, если браузер разрешает сохранение.
      </p>
    </div>
  );
}
