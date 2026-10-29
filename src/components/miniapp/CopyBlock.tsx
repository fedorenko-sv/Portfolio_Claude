"use client";
import { useRef, useState } from "react";
import Icon from "@/components/site/Icon";
import s from "./Pocket.module.css";
export default function CopyBlock({
  text,
  label = "Скопировать шаблон",
}: {
  text: string;
  label?: string;
}) {
  const [status, setStatus] = useState("");
  const field = useRef<HTMLTextAreaElement>(null);
  async function copy() {
    try {
      await navigator.clipboard.writeText(text);
      setStatus("Скопировано. Можно вставить в заметки или сообщение.");
    } catch {
      field.current?.focus();
      field.current?.select();
      setStatus(
        "Автоматическое копирование недоступно. Текст выделен — скопируйте его через меню устройства.",
      );
    }
  }
  return (
    <div className={s.copyBlock}>
      <label>
        Готовая заготовка
        <textarea
          ref={field}
          value={text}
          readOnly
          rows={8}
          aria-label="Текст для копирования"
        />
      </label>
      <button className={s.primary} onClick={copy}>
        {label}
        <Icon name="right" />
      </button>
      <p role="status">
        {status || "Дополните заготовку своими данными после копирования."}
      </p>
    </div>
  );
}
