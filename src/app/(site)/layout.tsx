import Link from "next/link";
import Header from "@/components/site/Header";
export default function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <a className="skip-link" href="#main">
        Перейти к содержанию
      </a>
      <Header />
      <main id="main" className="site-main">
        {children}
      </main>
      <div className="footer-surface theme-dark">
        <footer className="site-footer wrap">
          <div>
            <Link className="footer-name" href="/">
              Сергей
              <br />
              Федоренко
            </Link>
            <p>Начните с одной задачи.</p>
          </div>
          <nav aria-label="Ссылки в подвале">
            <Link href="/materials">Материалы</Link>
            <Link href="/app">Практика Сергея</Link>
            <Link href="/speaking">Выступления</Link>
            <Link href="/contact">Контакт</Link>
            <Link href="/privacy">Конфиденциальность</Link>
            <Link href="/terms">Условия</Link>
          </nav>
          <p>© {new Date().getFullYear()} · Липецк</p>
        </footer>
      </div>
    </>
  );
}
