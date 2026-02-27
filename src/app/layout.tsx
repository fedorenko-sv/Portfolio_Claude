import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Full-Stack Инженер — PWA, HoReCa, Доставка | Цифровые решения для бизнеса",
  description:
    "Разрабатываю PWA-приложения, системы доставки и интеграции с iiko, r_keeper для ресторанов, кальянных и e-commerce. Живое демо продуктов на сайте.",
  keywords: "PWA, разработка приложений, HoReCa, доставка, iiko, ресторан, кальянная, e-commerce, full-stack разработчик",
  openGraph: {
    title: "Full-Stack Инженер | Цифровые решения для HoReCa и доставки",
    description: "Премиальные цифровые продукты для ресторанов, кальянных и сервисов доставки. Попробуйте демо прямо сейчас.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=JetBrains+Mono:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
