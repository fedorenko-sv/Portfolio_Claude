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
        <span>Практика Сергея</span>
        <h1>
          От интереса —<br />
          <em>к своей задаче.</em>
        </h1>
        <p>
          Попробуйте ИИ в работе, заберите памятку или посмотрите, как устроен
          готовый продукт.
        </p>
      </div>
      <Link href="/app/practice/first-ai-task" className={styles.practice}>
        <div className={styles.paper} aria-hidden>
          <span>Моя задача</span>
          <i />
          <i />
          <i />
          <span>Данные → результат → проверка</span>
        </div>
        <div className={styles.practiceText}>
          <span>Бесплатное упражнение</span>
          <h2>
            С чего начать
            <br />
            именно вам?
          </h2>
          <p>В конце — карточка вашей рабочей задачи.</p>
          <strong>
            {continuing ? "Продолжить практику" : "Начать практику"}
            <ArrowUpRight size={24} aria-hidden />
          </strong>
        </div>
      </Link>
      <div className={styles.libraryLink}>
        <Link href="/app/library">
          <BookOpen size={25} aria-hidden />
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
      <h2 className={styles.sectionTitle}>Когда нужно больше</h2>
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
