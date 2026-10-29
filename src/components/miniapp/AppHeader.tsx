"use client";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import s from "./Pocket.module.css";
export default function AppHeader() {
  const path = usePathname();
  const parent =
    path.startsWith("/app/guides/") || path.startsWith("/app/materials/")
      ? "/app/library"
      : path.startsWith("/app/solutions/")
        ? "/app/solutions"
        : path.startsWith("/app/practice/") || path.startsWith("/app/training/")
          ? "/app/training"
          : "/app";
  return (
    <header className={s.header} aria-label="Карманная мастерская">
      <div>
        {path !== "/app" && (
          <Link className={s.back} href={parent} aria-label="Назад к разделу">
            ←
          </Link>
        )}
        <Link className={s.brand} href="/app">
          <span>Практика</span>
          <small>Сергей Федоренко</small>
        </Link>
      </div>
      <Link
        className={s.avatar}
        href="/"
        aria-label="Открыть сайт Сергея Федоренко"
      >
        <Image
          src="/images/author/portrait.webp"
          width={48}
          height={60}
          alt=""
        />
        <span aria-hidden>↗</span>
      </Link>
    </header>
  );
}
