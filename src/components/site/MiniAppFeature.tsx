"use client";
import { useRef, useState } from "react";
import Link from "next/link";
import {
  ArrowUpRight,
  BookmarkSimple,
  BookOpen,
  Check,
  X,
} from "@phosphor-icons/react";
import styles from "./MiniAppFeature.module.css";
export default function MiniAppFeature({ launchUrl }: { launchUrl: string }) {
  const [open, setOpen] = useState(false);
  const trigger = useRef<HTMLButtonElement>(null);
  function close() {
    setOpen(false);
    trigger.current?.focus();
  }
  return (
    <section
      className={styles.feature}
      aria-label="Приложение с практикой и материалами"
    >
      <div className={`wrap ${styles.layout}`}>
        <div className={styles.copy}>
          <p className={styles.label}>Практика Сергея</p>
          <h2>
            Всё полезное.
            <br />
            <em>С собой.</em>
          </h2>
          <p className={styles.lead}>
            Один понятный вход в практику, памятки и рабочие примеры. Начните
            здесь — вернитесь, когда появится своя задача.
          </p>
          <ul>
            <li>
              <BookOpen size={22} aria-hidden />
              <span>Упражнение с вашей карточкой задачи</span>
            </li>
            <li>
              <BookmarkSimple size={22} aria-hidden />
              <span>Библиотека с поиском и избранным</span>
            </li>
            <li>
              <Check size={22} aria-hidden />
              <span>Проекты, обучение и связь с автором</span>
            </li>
          </ul>
          <button
            ref={trigger}
            className={styles.try}
            type="button"
            onClick={() => setOpen(!open)}
            aria-expanded={open}
            aria-controls="miniapp-preview"
          >
            {open ? "Свернуть приложение" : "Попробовать приложение здесь"}
            <ArrowUpRight size={23} aria-hidden />
          </button>
          <Link
            className={styles.full}
            href={launchUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            {launchUrl.startsWith("https://t.me/")
              ? "Открыть в Telegram"
              : "Открыть полную версию"}
            <ArrowUpRight size={18} aria-hidden />
          </Link>
        </div>
        <div
          className={`${styles.stage} ${open ? styles.open : ""}`}
          id="miniapp-preview"
        >
          <div className={styles.phone}>
            <div className={styles.screen}>
              {open ? (
                <iframe
                  src="/app"
                  title="Практика Сергея — приложение"
                  allow="clipboard-write"
                />
              ) : (
                <div className={styles.preview} aria-hidden="true">
                  <div className={styles.previewHeader}>
                    Практика<span>Сергей Федоренко</span>
                  </div>
                  <div className={styles.previewBody}>
                    <small>Место для ваших идей</small>
                    <h3>
                      От интереса —<br />
                      <em>к своей задаче.</em>
                    </h3>
                    <p>
                      Попробуйте ИИ в работе.
                      <br />
                      Начните с одного примера.
                    </p>
                    <div className={styles.practice}>
                      <span>Рабочий блокнот</span>
                      <strong>
                        Ваша задача.
                        <br />
                        Первый шаг.
                      </strong>
                      <span>Начать практику ↗</span>
                      <i />
                    </div>
                    <div className={styles.library}>
                      <BookOpen size={22} />
                      <span>
                        Ваша библиотека<small>Памятки и рабочие примеры</small>
                      </span>
                      <ArrowUpRight size={18} />
                    </div>
                  </div>
                  <div className={styles.previewNav}>
                    <span>Главная</span>
                    <span>Библиотека</span>
                    <span>Проекты</span>
                    <span>Обучение</span>
                    <span>Связь</span>
                  </div>
                </div>
              )}
            </div>
            <span className={styles.sideKey} />
          </div>
          {open && (
            <button
              className={styles.close}
              type="button"
              onClick={close}
              aria-label="Закрыть просмотр приложения"
            >
              <X size={18} aria-hidden />
              Закрыть
            </button>
          )}
          <span className={styles.caption}>
            {open
              ? "Вы внутри приложения. Можно пользоваться."
              : "Откройте и попробуйте прямо на странице."}
          </span>
        </div>
      </div>
    </section>
  );
}
