"use client";
import Link from "next/link";
import { useRef, useState } from "react";
const links = [
  ["Обучение", "/training"],
  ["Решения", "/solutions"],
  ["Проекты", "/cases"],
  ["Материалы", "/materials"],
  ["Обо мне", "/#about"],
];
export default function Header() {
  const dialog = useRef<HTMLDialogElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  const [open, setOpen] = useState(false);
  function close() {
    dialog.current?.close();
    setOpen(false);
    trigger.current?.focus();
  }
  return (
    <header className="site-header wrap">
      <Link
        href="/"
        className="wordmark"
        aria-label="Сергей Федоренко — главная"
      >
        Сергей Федоренко
      </Link>
      <nav className="desktop-nav" aria-label="Главная навигация">
        {links.map(([label, href]) => (
          <Link key={href} href={href}>
            {label}
          </Link>
        ))}
      </nav>
      <Link href="/contact" className="header-contact">
        Обсудить задачу <span aria-hidden="true">↗</span>
      </Link>
      <button
        ref={trigger}
        className="menu-trigger"
        aria-label="Открыть меню"
        aria-expanded={open}
        aria-controls="mobile-menu"
        onClick={() => {
          dialog.current?.showModal();
          setOpen(true);
        }}
      >
        Меню <span aria-hidden="true">☰</span>
      </button>
      <dialog
        ref={dialog}
        id="mobile-menu"
        aria-label="Меню сайта"
        onCancel={close}
        onClose={() => {
          setOpen(false);
          trigger.current?.focus();
        }}
      >
        <div className="menu-top">
          <span>Навигация</span>
          <button onClick={close} aria-label="Закрыть меню">
            Закрыть ×
          </button>
        </div>
        <nav aria-label="Мобильная навигация">
          {links.map(([label, href]) => (
            <Link onClick={close} key={href} href={href}>
              {label} <span aria-hidden="true">↗</span>
            </Link>
          ))}
          <Link onClick={close} href="/contact">
            Обсудить задачу ↗
          </Link>
        </nav>
      </dialog>
    </header>
  );
}
