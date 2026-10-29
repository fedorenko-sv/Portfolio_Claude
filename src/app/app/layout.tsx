import Link from "next/link";
import TelegramAdapter from "@/components/miniapp/TelegramAdapter";
import Nav from "@/components/miniapp/Nav";
import NavigationMotion from "@/components/shared/NavigationMotion";
export const metadata = {
  title: "Практика Сергея",
  robots: { index: false, follow: false },
};
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="miniapp">
      <TelegramAdapter />
      <NavigationMotion />
      <header className="app-header">
        <Link href="/app">
          <b className="app-brand-mark" aria-hidden>
            ф.
          </b>
          <span className="app-brand">
            Практика<span>Сергей Федоренко</span>
          </span>
        </Link>
        <Link href="/">На сайт ↗</Link>
      </header>
      <main className="app-content" id="main">
        {children}
      </main>
      <Nav />
    </div>
  );
}
