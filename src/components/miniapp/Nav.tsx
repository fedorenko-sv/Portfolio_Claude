"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  House,
  Books,
  Monitor,
  GraduationCap,
  ChatCircle,
} from "@phosphor-icons/react";
const links = [
  { label: "Главная", href: "/app", icon: House },
  { label: "Библиотека", href: "/app/library", icon: Books },
  { label: "Проекты", href: "/app/solutions", icon: Monitor },
  { label: "Обучение", href: "/app/training", icon: GraduationCap },
  { label: "Связь", href: "/app/contact", icon: ChatCircle },
];
export default function Nav() {
  const path = usePathname();
  return (
    <nav className="app-nav" aria-label="Разделы приложения">
      {links.map(({ label, href, icon: Symbol }) => (
        <Link
          key={href}
          href={href}
          aria-current={
            (
              href === "/app"
                ? path === "/app"
                : href === "/app/library"
                  ? path.startsWith(href) ||
                    path.startsWith("/app/materials") ||
                    path.startsWith("/app/guides")
                  : href === "/app/contact"
                    ? path.startsWith(href) || path.startsWith("/app/speaking")
                    : href === "/app/training"
                      ? path.startsWith(href) ||
                        path.startsWith("/app/practice")
                      : path.startsWith(href)
            )
              ? "page"
              : undefined
          }
        >
          <span className="app-nav-icon">
            <Symbol size={21} aria-hidden />
          </span>
          <span>{label}</span>
        </Link>
      ))}
    </nav>
  );
}
