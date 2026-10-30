"use client";
import { useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Icon from "./Icon";
import styles from "./PracticeFolder.module.css";
export default function PracticeObject() {
  const [open, setOpen] = useState(false);
  const trigger = useRef<HTMLButtonElement>(null);
  function close() {
    setOpen(false);
    trigger.current?.focus();
  }
  return (
    <section className={styles.practice} aria-label="Рабочая папка">
      <div className={`wrap ${styles.grid}`}>
        <div className={styles.copy}>
          <p className={styles.eyebrow}>Начните с одной задачи</p>
          <h2>
            Попробуем
            <br />
            <span>на вашей работе.</span>
          </h2>
          <p>
            Сформулируйте результат, исходные данные и способ проверки. Из этого
            начинается полезное применение ИИ.
          </p>
          <Link className="button" href="/practice/first-ai-task">
            Пройти практику
            <Icon />
          </Link>
          <p className={styles.hint}>
            Откройте папку — внутри пример рабочего листа.
            <Icon name="right" />
          </p>
        </div>
        <div
          className={styles.stage}
          data-open={open}
          onKeyDown={(e) => {
            if (e.key === "Escape" && open) close();
          }}
        >
          <button
            className={styles.folder}
            ref={trigger}
            type="button"
            aria-expanded={open}
            aria-controls="practice-sheet"
            aria-label={open ? "Убрать рабочий лист" : "Открыть рабочий лист"}
            onClick={() => setOpen(!open)}
          >
            <Image
              src="/images/practice-folder-v2.png"
              width={1280}
              height={1280}
              sizes="(max-width:700px) 100vw,50vw"
              alt="Вишнёвая папка «Практика ИИ»"
            />
            <span>
              {open ? "Убрать лист" : "Открыть папку"}
              <Icon name={open ? "down" : "arrow"} size={18} />
            </span>
          </button>
          <div className={styles.sheet} id="practice-sheet" hidden={!open}>
            <div className={styles.sheetTop}>
              <span>Пример рабочего листа</span>
              <button
                type="button"
                onClick={close}
                aria-label="Закрыть рабочий лист"
              >
                <Icon name="close" />
              </button>
            </div>
            <h3>План занятия</h3>
            <dl>
              <dt>Задача</dt>
              <dd>Подготовить план занятия</dd>
              <dt>Данные</dt>
              <dd>Тема, аудитория, длительность</dd>
              <dt>Результат</dt>
              <dd>План с упражнениями и таймингом</dd>
              <dt>Проверка</dt>
              <dd>Каждый пункт связан с целью занятия</dd>
            </dl>
            <Link href="/practice/first-ai-task">
              Составить свой
              <Icon />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
