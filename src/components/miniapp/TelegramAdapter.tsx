"use client";
import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import Script from "next/script";
import { resolveStart } from "@/lib/deeplinks";
type TG = {
  initData?: string;
  ready: () => void;
  expand: () => void;
  colorScheme: "light" | "dark";
  viewportStableHeight: number;
  safeAreaInset?: { top: number; bottom: number };
  contentSafeAreaInset?: { top: number; bottom: number };
  BackButton: {
    show: () => void;
    hide: () => void;
    onClick: (fn: () => void) => void;
    offClick: (fn: () => void) => void;
  };
  onEvent: (event: string, fn: () => void) => void;
  offEvent: (event: string, fn: () => void) => void;
};
declare global {
  interface Window {
    Telegram?: { WebApp?: TG };
  }
}
export default function TelegramAdapter() {
  const path = usePathname();
  const router = useRouter();
  useEffect(() => {
    let cleanup = () => {};
    function setup() {
      cleanup();
      const tg = window.Telegram?.WebApp;
      if (!tg?.initData) return; // Plain browser: do not call Telegram-only controls.
      const root = document.querySelector<HTMLElement>(".miniapp");
      function sync() {
        if (!root || !tg) return;
        root.dataset.theme = tg.colorScheme;
        root.style.setProperty(
          "--tg-safe-top",
          `${Math.max(tg.safeAreaInset?.top ?? 0, tg.contentSafeAreaInset?.top ?? 0)}px`,
        );
        root.style.setProperty(
          "--tg-safe-bottom",
          `${Math.max(tg.safeAreaInset?.bottom ?? 0, tg.contentSafeAreaInset?.bottom ?? 0)}px`,
        );
        if (tg.viewportStableHeight > 0)
          root.style.setProperty("--tg-height", `${tg.viewportStableHeight}px`);
      }
      tg.ready();
      tg.expand();
      sync();
      const back = () => {
        router.push(
          path.startsWith("/app/materials/") || path.startsWith("/app/guides/")
            ? "/app/library"
            : path.startsWith("/app/solutions/")
              ? "/app/solutions"
              : path.startsWith("/app/training/") ||
                  path.startsWith("/app/practice/")
                ? "/app/training"
                : "/app",
        );
      };
      if (path !== "/app") tg.BackButton.show();
      else tg.BackButton.hide();
      tg.BackButton.onClick(back);
      const events = [
        "themeChanged",
        "viewportChanged",
        "safeAreaChanged",
        "contentSafeAreaChanged",
      ];
      events.forEach((e) => tg.onEvent(e, sync));
      cleanup = () => {
        tg.BackButton.offClick(back);
        events.forEach((e) => tg.offEvent(e, sync));
      };
    }
    if (path === "/app") {
      const start = new URLSearchParams(window.location.search).get(
        "tgWebAppStartParam",
      );
      const destination = resolveStart(start);
      if (destination !== "/app") router.replace(destination);
    }
    setup();
    window.addEventListener("telegram-sdk-ready", setup);
    return () => {
      cleanup();
      window.removeEventListener("telegram-sdk-ready", setup);
    };
  }, [path, router]);
  // Content and practice still work if the optional official SDK cannot load.
  return <TelegramScript />;
}
function TelegramScript() {
  return (
    <Script
      src="https://telegram.org/js/telegram-web-app.js"
      strategy="afterInteractive"
      onReady={() => {
        window.dispatchEvent(new Event("telegram-sdk-ready"));
      }}
    />
  );
}
