"use client";
import { useState } from "react";
import Link from "next/link";
import ProjectFilm from "./ProjectFilm";
import ProjectViewer from "./ProjectViewer";
import Icon from "./Icon";
import styles from "./Editorial.module.css";
const projects = [
  {
    id: "edcrm",
    tab: "Учебный центр",
    title: "CRM для образовательных центров",
    text: "Заявки, ученики и группы — в одном рабочем пространстве.",
    detail:
      "Посмотрите, как администратор проходит путь от первой заявки до зачисления.",
  },
  {
    id: "rehab",
    tab: "Размещение гостей",
    title: "Система размещения и сопровождения гостей",
    text: "Бронирования, места и расписание связаны одним сценарием.",
    detail:
      "Внутри — создание брони и работа с карточкой гостя на учебных данных.",
  },
  {
    id: "english-lab",
    tab: "Интерактивные уроки",
    title: "Платформа интерактивных уроков и лекций",
    text: "Материал преподавателя становится интерактивным занятием.",
    detail:
      "Откройте урок, ответьте на задания и посмотрите результат со стороны преподавателя.",
  },
];
export default function ProjectStage() {
  const [active, setActive] = useState(0);
  const p = projects[active];
  return (
    <section className={styles.projects} aria-label="Рабочие проекты">
      <div className="wrap">
        <div className={styles.sectionTop}>
          <h2>Внутри моих проектов.</h2>
          <Link href="/cases">
            Все проекты
            <Icon />
          </Link>
        </div>
        <div
          className={styles.projectTabs}
          role="group"
          aria-label="Выбрать проект"
        >
          {projects.map((item, i) => (
            <button
              key={item.id}
              type="button"
              aria-pressed={i === active}
              onClick={() => setActive(i)}
            >
              {item.tab}
              <Icon size={18} />
            </button>
          ))}
        </div>
        <div className={styles.projectStage}>
          <div className={styles.projectStory} aria-live="polite">
            <p>{p.text}</p>
            <h3>{p.title}</h3>
            <p className={styles.projectDetail}>{p.detail}</p>
            <ProjectViewer
              id={p.id}
              title={p.title}
              label="Попробовать приложение"
              className={styles.whiteAction}
            />
            <Link className={styles.caseLink} href={`/cases/${p.id}`}>
              История проекта
              <Icon size={18} />
            </Link>
          </div>
          <div className={styles.projectMedia} key={p.id}>
            <ProjectFilm id={p.id} placement="home" />
            <p>Короткая запись рабочего сценария. Нажмите, чтобы посмотреть.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
