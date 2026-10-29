"use client";
import { useState } from "react";
import Link from "next/link";
import type { Case } from "@/content/catalog";
import { filmFor } from "@/content/media";
import ProjectFilm from "@/components/site/ProjectFilm";
import ProjectViewer from "@/components/site/ProjectViewer";
import Icon from "@/components/site/Icon";
import s from "./Pocket.module.css";
const labels: Record<string, string> = {
  edcrm: "Учебный центр",
  rehab: "Гости",
  "english-lab": "Уроки",
  gastro: "Ресторан",
};
const focus: Record<string, string> = {
  edcrm: "От заявки до первого занятия",
  rehab: "От брони до размещения",
  "english-lab": "От материала до участия группы",
  gastro: "От раздела меню до выбора блюда",
};
export default function MiniProjects({ items }: { items: Case[] }) {
  const [active, setActive] = useState(0);
  const item = items[active],
    film = filmFor(item.id);
  return (
    <div className={s.projects}>
      <div className={s.pageIntro}>
        <p>Разработка под рабочую задачу</p>
        <h1>
          Посмотрите.
          <br />А потом попробуйте.
        </h1>
        <p>Выберите знакомый процесс. Приложения открываются прямо здесь.</p>
      </div>
      <div className={s.categoryRail} role="group" aria-label="Сфера проекта">
        {items.map((c, i) => (
          <button
            key={c.id}
            onClick={() => setActive(i)}
            aria-pressed={active === i}
          >
            {labels[c.id]}
          </button>
        ))}
      </div>
      <article className={s.projectFocus} key={item.id}>
        <div className={s.projectHeading}>
          <span>{focus[item.id]}</span>
          <h2>{item.title}</h2>
        </div>
        <div className={s.projectFilm}>
          <ProjectFilm id={item.id} placement="miniapp" />
        </div>
        <div className={s.projectBody}>
          <p>{item.summary}</p>
          <div className={s.journey}>
            {(film?.steps || item.journey.slice(0, 3)).map((step, i) => (
              <span key={step}>
                {i > 0 && <Icon name="right" size={14} />} {step}
              </span>
            ))}
          </div>
          <ProjectViewer
            id={item.id}
            title={item.title}
            className={s.primary}
            label="Открыть приложение"
          />
          <Link className={s.inlineLink} href={`/app/solutions/${item.slug}`}>
            Что внутри и как устроено
            <Icon />
          </Link>
        </div>
      </article>
      <aside className={s.helpCard}>
        <span>Ваш процесс выглядит иначе?</span>
        <h2>
          Начнём со схемы,
          <br />а не со списка функций.
        </h2>
        <p>
          Соберите начало, шаги и результат в одной памятке. Так проще обсудить,
          что нужно изменить.
        </p>
        <Link href="/app/guides/process-map">
          Составить карту процесса
          <Icon />
        </Link>
      </aside>
      <Link className={s.inlineLink} href="/app/contact?type=development">
        Обсудить разработку
        <Icon />
      </Link>
    </div>
  );
}
