"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowUpRight,
  BookmarkSimple,
  BookOpen,
  Monitor,
  Microphone,
  PencilSimpleLine,
} from "@phosphor-icons/react";
import { readProgress, STORAGE_KEY } from "@/lib/practice";
import { readSaved, SAVED_KEY } from "@/lib/library";
import LaunchNotice from "./LaunchNotice";
import styles from "./AppHome.module.css";
export default function AppHome({ ids }: { ids: string[] }) {
  const [continuing, setContinuing] = useState(false);
  const [count, setCount] = useState(0);
  useEffect(() => {
    try {
      // Device state is optional and restored only after hydration.
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setContinuing(Boolean(readProgress(localStorage.getItem(STORAGE_KEY))));
      setCount(readSaved(localStorage.getItem(SAVED_KEY), ids).length);
    } catch {
      /* Reading and practice remain available without device storage. */
    }
  }, [ids]);
  return (
    <div className={styles.home}>
      <LaunchNotice />
      <div className={styles.intro}>
        <div className={styles.welcome}>
          <span>Место для ваших идей</span>
          <span className={styles.authorMark}>СФ</span>
        </div>
        <h1>
          От интереса —<br />
          <em>к своей задаче.</em>
        </h1>
        <p>
          ИИ, который пригодится в работе. Практика, заметки и проекты Сергея
          Федоренко.
        </p>
      </div>
      <Link href="/app/practice/first-ai-task" className={styles.practice}>
        <div className={styles.practiceText}>
          <span>
            <PencilSimpleLine size={18} aria-hidden /> Рабочий блокнот
          </span>
          <h2>
            Ваша задача.
            <br />
            Первый шаг.
          </h2>
          <p>От вопроса к понятному плану действий.</p>
        </div>
        <div className={styles.paper} aria-hidden>
          <span>Моя задача</span>
          <i>Что изменить?</i>
          <i>Что получить?</i>
          <i>Как проверить?</i>
          <span>Начните с одного вопроса.</span>
        </div>
        <div className={styles.practiceFooter}>
          <small>Бесплатно · в своём темпе</small>
          <strong>
            {continuing ? "Продолжить практику" : "Начать практику"}
            <ArrowUpRight size={24} aria-hidden />
          </strong>
        </div>
      </Link>
      <div className={styles.libraryLink}>
        <Link href="/app/library">
          <span className={styles.bookSpines} aria-hidden>
            <i />
            <i />
            <i />
          </span>
          <span>
            <strong>Ваша библиотека</strong>
            <small>Памятки, практика и рабочие примеры</small>
          </span>
          <ArrowUpRight size={22} aria-hidden />
        </Link>
        <span className={styles.saved}>
          <BookmarkSimple size={16} aria-hidden />
          {count ? `Сохранено: ${count}` : "Полезное можно оставить на потом"}
        </span>
      </div>
      <h2 className={styles.sectionTitle}>Пора к настоящей работе.</h2>
      <div className={styles.directions}>
        <Link href="/app/solutions">
          <Monitor size={25} aria-hidden />
          <span>
            <strong>Разработать инструмент</strong>
            <small>CRM, платформы и сервисы под процесс</small>
          </span>
          <ArrowUpRight size={20} aria-hidden />
        </Link>
        <Link href="/app/training">
          <BookOpen size={25} aria-hidden />
          <span>
            <strong>Обучить команду</strong>
            <small>Разобрать задачи и попробовать самим</small>
          </span>
          <ArrowUpRight size={20} aria-hidden />
        </Link>
        <Link href="/app/speaking">
          <Microphone size={25} aria-hidden />
          <span>
            <strong>Пригласить выступить</strong>
            <small>Демонстрации и практика для аудитории</small>
          </span>
          <ArrowUpRight size={20} aria-hidden />
        </Link>
      </div>
      <Link href="/app/contact" className={styles.author}>
        <Image
          src="/images/author/portrait.webp"
          alt=""
          width={64}
          height={80}
        />
        <span>
          <strong>Сергей Федоренко</strong>
          <small>Есть задача? Давайте обсудим.</small>
        </span>
        <ArrowUpRight size={22} aria-hidden />
      </Link>
      <p className={styles.note}>
        Без регистрации. Прогресс и избранное остаются на этом устройстве.
      </p>
    </div>
  );
}
