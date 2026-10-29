"use client";
import Link from "next/link";
import { useRef, useState } from "react";
import { usePathname } from "next/navigation";
import Icon from "./Icon";
const links = [
  ["Проекты", "/cases"],
  ["Обучение", "/training"],
  ["Для бизнеса", "/solutions"],
  ["Выступления", "/speaking"],
  ["Обо мне", "/about"],
];
export default function Header() {
  const pathname = usePathname();
  const dialog = useRef<HTMLDialogElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  const [open, setOpen] = useState(false);
  function close() {
    dialog.current?.close();
    setOpen(false);
    trigger.current?.focus();
  }
  return (
    <div className="header-surface theme-dark">
      <header className="site-header wrap">
        <Link
          href="/"
          className="wordmark"
          aria-label="Сергей Федоренко — главная"
        >
          Сергей
          <br />
          Федоренко
        </Link>
        <nav className="desktop-nav" aria-label="Главная навигация">
          {links.map(([label, href]) => (
            <Link
              key={href}
              href={href}
              aria-current={
                pathname.startsWith(href) && !href.includes("#")
                  ? "page"
                  : undefined
              }
            >
              {label}
            </Link>
          ))}
        </nav>
        <Link
          href="/contact"
          className="header-contact"
          aria-label="Обсудить задачу"
        >
          <span>Обсудить задачу</span>
          <Icon size={32} />
        </Link>
        <button
          ref={trigger}
          className="menu-trigger"
          aria-label="Открыть навигацию — меню"
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => {
            dialog.current?.showModal();
            setOpen(true);
          }}
        >
          Меню <Icon name="menu" />
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
              Закрыть <Icon name="close" />
            </button>
          </div>
          <nav aria-label="Мобильная навигация">
            {links.map(([label, href]) => (
              <Link onClick={close} key={href} href={href}>
                {label} <Icon />
              </Link>
            ))}
            <Link onClick={close} href="/contact">
              Обсудить задачу <Icon />
            </Link>
          </nav>
        </dialog>
      </header>
    </div>
  );
}
