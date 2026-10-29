"use client";
import { useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Icon from "./Icon";
import styles from "./Growth.module.css";
export default function PracticeObject() {
  const [open, setOpen] = useState(false);
  const details = useRef<HTMLDetailsElement>(null);
  return (
    <section className={styles.practice}>
      <div className={`wrap ${styles.practiceGrid}`}>
        <div>
          <p className="eyebrow">Начните с одной задачи</p>
          <h2>
            Попробуем
            <br />
            <em>на вашей работе.</em>
          </h2>
          <p>
            Сформулируйте результат, исходные данные и способ проверки. Из этого
            начинается полезное применение ИИ.
          </p>
          <Link className="button" href="/practice/first-ai-task">
            Пройти практику
            <Icon />
          </Link>
          <details
            ref={details}
            className={styles.worksheet}
            onToggle={() => setOpen(Boolean(details.current?.open))}
          >
            <summary>
              Что получится в конце
              <Icon name={open ? "down" : "right"} />
            </summary>
            <div>
              <p className="eyebrow">Пример карточки задачи</p>
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
              <Link href="/contact?type=training">
                Разобрать задачи команды ↗
              </Link>
            </div>
          </details>
        </div>
        <div className={`${styles.folder} ${open ? styles.folderOpen : ""}`}>
          <Image
            src="/images/practice-folder-v2.png"
            width={1280}
            height={1280}
            sizes="(max-width: 700px) 100vw, 50vw"
            alt="Вишнёвая папка «Практика ИИ» и рабочий лист"
          />
        </div>
      </div>
    </section>
  );
}
