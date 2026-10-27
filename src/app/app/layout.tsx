import Link from "next/link";
import TelegramAdapter from "@/components/miniapp/TelegramAdapter";
import Nav from "@/components/miniapp/Nav";
export const metadata = {
  title: "Практика и материалы",
  robots: { index: false, follow: false },
};
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="miniapp">
      <TelegramAdapter />
      <header className="app-header">
        <Link href="/app">
          Сергей Федоренко<span>Практика ИИ</span>
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
