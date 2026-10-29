import AppHeader from "@/components/miniapp/AppHeader";
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
      <AppHeader />
      <main className="app-content" id="main">
        {children}
      </main>
      <Nav />
    </div>
  );
}
