import Link from "next/link";
export default function NotFound() {
  return (
    <main className="wrap error-page">
      <p className="eyebrow">404 / РАЗДЕЛ НЕ НАЙДЕН</p>
      <h1>По этой ссылке ничего нет.</h1>
      <p>Выберите опубликованный материал или вернитесь к практике.</p>
      <div className="actions">
        <Link className="button" href="/">
          На главную
        </Link>
        <Link className="button secondary" href="/app">
          Открыть практику
        </Link>
      </div>
    </main>
  );
}
