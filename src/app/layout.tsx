import type { Metadata } from "next";
import "./globals.css";
import "@/styles/site.css";
import "@/styles/audit.css";
import "@/styles/visual-refinement.css";
import "@/styles/contact.css";
import "@/styles/miniapp.css";
import "@/styles/motion.css";
import { SITE_URL } from "@/lib/config";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Сергей Федоренко — разработка и практика ИИ",
    template: "%s · Сергей Федоренко",
  },
  description:
    "Создаю цифровые инструменты. Обучаю команды применять ИИ. Сайты, CRM, платформы и практические занятия. Липецк · очно и онлайн.",
  robots:
    process.env.VERCEL_ENV === "production"
      ? { index: true, follow: true }
      : { index: false, follow: false },
  openGraph: {
    title: "Сергей Федоренко — разработка и практика ИИ",
    description:
      "Цифровые инструменты для конкретных процессов. Практическое применение ИИ в работе.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <head>
        <link
          rel="preload"
          href="/fonts/literata-cyrillic-wght-normal-v5.3.0.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          href="/fonts/manrope-cyrillic-wght-normal-v5.3.0.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
