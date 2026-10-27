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
      <main id="main" className="wrap">
        {children}
      </main>
      <footer className="site-footer wrap">
        <div>
          <Link className="footer-name" href="/">
            Сергей Федоренко
          </Link>
          <p>Разработка · ИИ в работе · обучение команд</p>
        </div>
        <nav aria-label="Ссылки в подвале">
          <Link href="/contact">Контакт</Link>
          <Link href="/privacy">Конфиденциальность</Link>
          <Link href="/terms">Условия</Link>
        </nav>
        <p>© {new Date().getFullYear()} · Липецк</p>
      </footer>
    </>
  );
}
