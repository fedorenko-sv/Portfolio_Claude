"use client";

import Image from "next/image";
import { useEffect, useId, useRef, useState } from "react";
import { showcaseFor, canEmbed } from "@/content/project-showcases";
import Icon from "./Icon";
import { acceptsShowcaseMessage } from "@/lib/showcase-protocol";

export default function ProjectViewer({
  id,
  title,
  preview = false,
  className = "button",
  label = "Открыть приложение",
}: {
  preview?: boolean;
  id: string;
  title: string;
  className?: string;
  label?: string;
}) {
  const item = showcaseFor(id);
  const dialog = useRef<HTMLDialogElement>(null);
  const frame = useRef<HTMLIFrameElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  const titleId = useId();
  const [open, setOpen] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [attempt, setAttempt] = useState(0);
  const [slow, setSlow] = useState(false);
  const [failed, setFailed] = useState(false);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    let timeout: number | undefined = window.setTimeout(
      () => setSlow(true),
      12000,
    );
    function receive(event: MessageEvent) {
      if (
        !item ||
        !acceptsShowcaseMessage(
          event,
          frame.current?.contentWindow,
          new URL(item.url, window.location.href).origin,
        )
      )
        return;
      setLoading(false);
      setSlow(false);
      window.clearTimeout(timeout);
      timeout = undefined;
    }
    window.addEventListener("message", receive);
    return () => {
      document.body.style.overflow = previous;
      window.clearTimeout(timeout);
      window.removeEventListener("message", receive);
    };
  }, [open, attempt, item]);
  if (!item) return null;
  function close() {
    dialog.current?.close();
    setOpen(false);
    setExpanded(false);
    trigger.current?.focus();
  }
  function launch() {
    setSlow(false);
    setFailed(false);
    setLoading(true);
    dialog.current?.showModal();
    setOpen(true);
  }
  return (
    <>
      <button
        ref={trigger}
        type="button"
        className={preview ? `project-preview preview-${id}` : className}
        onClick={launch}
        aria-haspopup="dialog"
        aria-label={preview ? `Открыть приложение: ${title}` : undefined}
      >
        {preview ? (
          <>
            <span className="preview-window">
              <span className="preview-chrome">
                <i />
                <i />
                <i />
                <span>{title}</span>
              </span>
              <Image
                src={`/images/projects/${id === "gastro" ? "gastro-mobile" : id}.webp`}
                alt={`Интерфейс: ${title}`}
                width={id === "gastro" ? 390 : 1280}
                height={id === "gastro" ? 775 : 820}
                sizes="(max-width: 700px) 90vw, 50vw"
              />
            </span>
            <span className="preview-action">
              Открыть приложение <Icon />
            </span>
          </>
        ) : (
          <>
            {label}
            <Icon />
          </>
        )}
      </button>
      <dialog
        ref={dialog}
        className={`project-viewer ${expanded ? "is-expanded" : ""} viewer-${item.format}`}
        aria-labelledby={titleId}
        onCancel={close}
        onClose={() => {
          setOpen(false);
          setExpanded(false);
          trigger.current?.focus();
        }}
      >
        <div className="viewer-toolbar">
          <h2 id={titleId}>{title}</h2>
          <div className="viewer-tools">
            {canEmbed(item) && (
              <button
                className="viewer-tool expand-tool"
                onClick={() => setExpanded(!expanded)}
                aria-label={expanded ? "Вернуть в страницу" : "На весь экран"}
              >
                <Icon name={expanded ? "collapse" : "expand"} />
              </button>
            )}
            <a
              className="viewer-tool external-tool"
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
            >
              Открыть отдельно
              <Icon />
            </a>
            <button
              className="viewer-tool"
              onClick={close}
              aria-label="Закрыть просмотр"
            >
              <Icon name="close" />
            </button>
          </div>
        </div>
        {open &&
          (canEmbed(item) ? (
            <>
              <p className="viewer-context">{item.context}</p>
              <div className="viewer-frame" data-testid="project-frame">
                {failed ? (
                  <div className="viewer-empty">
                    <h3>Не удалось показать приложение</h3>
                    <p>Попробуйте ещё раз или откройте его отдельно.</p>
                    <button
                      className="button"
                      onClick={() => {
                        setFailed(false);
                        setSlow(false);
                        setLoading(true);
                        setAttempt(attempt + 1);
                      }}
                    >
                      Повторить
                      <Icon name="retry" />
                    </button>
                  </div>
                ) : (
                  <iframe
                    key={attempt}
                    ref={frame}
                    src={item.url}
                    title={title}
                    referrerPolicy="same-origin"
                    allow="fullscreen"
                    onLoad={() => {
                      /* Readiness is acknowledged by the application, not the document load. */
                    }}
                    onError={() => setFailed(true)}
                  />
                )}
              </div>
              <div className="viewer-footnote" role="status">
                {slow
                  ? "Если приложение не появилось, откройте его отдельно."
                  : loading
                    ? "Открываем приложение…"
                    : "Можно нажимать и прокручивать. Внешнее открытие всегда доступно."}
              </div>
            </>
          ) : null)}
      </dialog>
    </>
  );
}
