"use client";
import Link from "next/link";
export default function ErrorPage({ reset }: { reset: () => void }) {
  return (
    <div className="wrap error-page">
      <h1>Страница не загрузилась.</h1>
      <p>
        Попробуйте снова. Сохранённый прогресс практики остаётся на устройстве.
      </p>
      <div className="actions">
        <button className="button" onClick={reset}>
          Повторить
        </button>
        <Link href="/" className="button secondary">
          На главную
        </Link>
      </div>
    </div>
  );
}
