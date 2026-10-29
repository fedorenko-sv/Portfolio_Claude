"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  BookmarkSimple,
  ArrowUpRight,
  MagnifyingGlass,
} from "@phosphor-icons/react";
import {
  type LibraryEntry,
  libraryLabels,
  searchLibrary,
  readSaved,
  SAVED_KEY,
} from "@/lib/library";
import styles from "./Library.module.css";
function persistSaved(ids: string[]) {
  localStorage.setItem(
    SAVED_KEY,
    JSON.stringify({ version: 1, updatedAt: Date.now(), ids }),
  );
}
export default function Library({ entries }: { entries: LibraryEntry[] }) {
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState("all");
  const [saved, setSaved] = useState<string[]>([]);
  const [storage, setStorage] = useState<
    "loading" | "available" | "unavailable"
  >("loading");
  useEffect(() => {
    try {
      // Restore device preferences after hydration, never during server rendering.
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setSaved(
        readSaved(
          localStorage.getItem(SAVED_KEY),
          entries.map((e) => e.id),
        ),
      );
      setStorage("available");
    } catch {
      setStorage("unavailable");
    }
  }, [entries]);
  function toggle(id: string) {
    const next = saved.includes(id)
      ? saved.filter((s) => s !== id)
      : [...saved, id];
    setSaved(next);
    try {
      persistSaved(next);
    } catch {
      setStorage("unavailable");
    }
  }
  const results = searchLibrary(entries, query, filter, saved);
  return (
    <div className={styles.library}>
      <label className={styles.search}>
        <MagnifyingGlass size={22} aria-hidden />
        <input
          type="search"
          aria-label="Поиск по библиотеке"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Что хотите найти или сделать?"
          maxLength={160}
        />
      </label>
      <div
        className={styles.filters}
        role="group"
        aria-label="Фильтр библиотеки"
      >
        {Object.entries({
          all: "Всё",
          ...libraryLabels,
          saved: `Избранное${saved.length ? ` · ${saved.length}` : ""}`,
        }).map(([id, label]) => (
          <button
            type="button"
            key={id}
            aria-pressed={filter === id}
            onClick={() => setFilter(id)}
          >
            {label}
          </button>
        ))}
      </div>
      <p role="status" className={styles.status}>
        {storage === "unavailable"
          ? "Сохранение на устройстве недоступно. Избранное работает до закрытия страницы."
          : "Избранное хранится только на этом устройстве, до 30 дней."}
      </p>
      <div className={styles.results} aria-live="polite" aria-atomic="false">
        {results.map((entry) => (
          <article key={entry.id} className={styles.card}>
            {entry.image && (
              <Image
                src={entry.image}
                width={640}
                height={400}
                sizes="(max-width:700px) 90vw,700px"
                alt=""
                className={styles.poster}
              />
            )}
            <div className={styles.cardBody}>
              <span className={styles.kind}>{libraryLabels[entry.kind]}</span>
              <h2>
                <Link href={entry.href}>
                  {entry.title}
                  <ArrowUpRight size={22} aria-hidden />
                </Link>
              </h2>
              <p>{entry.summary}</p>
              <button
                type="button"
                className={styles.save}
                aria-pressed={saved.includes(entry.id)}
                disabled={storage === "loading"}
                aria-label={`${saved.includes(entry.id) ? "Сохранено. Убрать из избранного" : "На потом. Сохранить"}: ${entry.title}`}
                onClick={() => toggle(entry.id)}
              >
                <BookmarkSimple
                  size={20}
                  weight={saved.includes(entry.id) ? "fill" : "regular"}
                  aria-hidden
                />
                {saved.includes(entry.id) ? "Сохранено" : "На потом"}
              </button>
            </div>
          </article>
        ))}
        {!results.length && (
          <div className={styles.empty}>
            <h2>
              {filter === "saved" && !query
                ? "Пока ничего не сохранено"
                : "Ничего не найдено"}
            </h2>
            <p>
              {filter === "saved" && !query
                ? "Отмечайте полезные материалы кнопкой «На потом»."
                : "Попробуйте другое слово или выберите «Всё»."}
            </p>
            <button
              type="button"
              onClick={() => {
                setFilter("all");
                setQuery("");
              }}
            >
              Показать всю библиотеку
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
