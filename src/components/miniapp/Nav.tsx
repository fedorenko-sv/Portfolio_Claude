"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
export default function Nav() {
  const path = usePathname();
  return (
    <nav className="app-nav" aria-label="Разделы приложения">
      {[
        ["Практика", "/app"],
        ["Материалы", "/app/materials"],
        ["Обучение", "/app/training"],
        ["Решения", "/app/solutions"],
      ].map(([label, href]) => (
        <Link
          key={href}
          href={href}
          aria-current={
            (
              href === "/app"
                ? path === "/app" || path.startsWith("/app/practice")
                : path.startsWith(href)
            )
              ? "page"
              : undefined
          }
        >
          {label}
        </Link>
      ))}
    </nav>
  );
}
