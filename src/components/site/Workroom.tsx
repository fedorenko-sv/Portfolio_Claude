"use client";
import { useState } from "react";
import TrackedLink from "@/components/shared/TrackedLink";
import { offers } from "@/content/offers";
import WorkroomScene from "./WorkroomScene";
import Icon from "./Icon";
import styles from "./Workroom.module.css";
const names = ["Разработка", "Обучение", "Выступления"];
const details = [
  {
    lead: "Чтобы процесс работал.",
    text: "Связываю заявки, людей и действия в одном инструменте. Результат можно увидеть в интерфейсе и попробовать самому.",
    steps: ["Задача", "Рабочий сценарий", "Продукт"],
  },
  {
    lead: "Чтобы команда умела сама.",
    text: "Разбираем вашу задачу, пробуем инструменты и проверяем результат. Участники забирают понятный способ работы.",
    steps: ["Пример", "Практика", "Проверка"],
  },
  {
    lead: "Чтобы стало понятно и интересно.",
    text: "Показываю ИИ на реальных сценариях. Подбираю тему и формат, которые помогут вашей аудитории перейти к действию.",
    steps: ["Тема", "Демонстрация", "Обсуждение"],
  },
];
export default function Workroom() {
  const [active, setActive] = useState(0);
  const offer = offers[active],
    detail = details[active];
  return (
    <section className={styles.room} aria-label="Рабочая мастерская">
      <div className="wrap">
        <div className={styles.topline}>
          <span>Рабочая мастерская</span>
          <span>От вопроса — к действию</span>
        </div>
        <div className={styles.layout}>
          <div className={styles.copy}>
            <h2>
              Три направления.
              <br />
              <em>Один подход.</em>
            </h2>
            <div
              className={styles.detail}
              aria-live="polite"
              aria-atomic="true"
            >
              <h3>{detail.lead}</h3>
              <p>{detail.text}</p>
              <div className={styles.steps}>
                {detail.steps.map((s, i) => (
                  <span key={s}>
                    {i > 0 && <Icon name="right" size={16} />} {s}
                  </span>
                ))}
              </div>
              <TrackedLink
                href={offer.href}
                className={styles.action}
                event="service_select"
                topic={offer.id}
                placement="home"
              >
                {offer.action}
                <Icon />
              </TrackedLink>
            </div>
          </div>
          <div className={styles.objects}>
            <WorkroomScene active={active} />
            <div
              className={styles.tabs}
              role="group"
              aria-label="Направления работы"
            >
              {names.map((name, i) => (
                <button
                  type="button"
                  key={name}
                  aria-pressed={active === i}
                  onClick={() => setActive(i)}
                >
                  <span className={styles.indicator} />
                  {name}
                </button>
              ))}
            </div>
            <p className={styles.hint}>
              Выберите направление — начнём с вашей ситуации.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
