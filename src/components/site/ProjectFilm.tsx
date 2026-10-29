"use client";
import Image from "next/image";
import { useEffect, useId, useRef, useState } from "react";
import { filmFor } from "@/content/media";
import { track } from "@/lib/analytics";
import Icon from "./Icon";
import styles from "./Growth.module.css";
import SurfaceLight from "./SurfaceLight";
export default function ProjectFilm({
  id,
  placement = "cases",
}: {
  id: string;
  placement?: string;
}) {
  const film = filmFor(id);
  const dialog = useRef<HTMLDialogElement>(null),
    video = useRef<HTMLVideoElement>(null),
    trigger = useRef<HTMLButtonElement>(null);
  const titleId = useId();
  const [open, setOpen] = useState(false),
    [error, setError] = useState(false),
    [loading, setLoading] = useState(true);
  useEffect(() => {
    if (!open) return;
    const before = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const pause = () => video.current?.pause();
    const visibility = () => {
      if (document.hidden) pause();
    };
    window.addEventListener("fedorenko:pause-films", pause);
    document.addEventListener("visibilitychange", visibility);
    return () => {
      document.body.style.overflow = before;
      window.removeEventListener("fedorenko:pause-films", pause);
      document.removeEventListener("visibilitychange", visibility);
      pause();
    };
  }, [open]);
  if (!film) return null;
  function close() {
    video.current?.pause();
    dialog.current?.close();
    setOpen(false);
    trigger.current?.focus();
  }
  function launch() {
    window.dispatchEvent(new Event("fedorenko:pause-films"));
    setError(false);
    setLoading(true);
    setOpen(true);
    dialog.current?.showModal();
  }
  return (
    <>
      <button
        ref={trigger}
        type="button"
        className={`${styles.film} ${film.portrait ? styles.portraitFilm : ""}`}
        aria-label={`Смотреть видео: ${film.title}. Смотреть в работе ${film.duration}`}
        aria-haspopup="dialog"
        onClick={launch}
      >
        <Image
          src={film.poster}
          alt={`Сценарий: ${film.title}`}
          width={film.portrait ? 432 : 1600}
          height={film.portrait ? 768 : 900}
          sizes="(max-width: 700px) 90vw, 60vw"
        />
        <span className={styles.filmLabel}>
          <span className={styles.playIcon} aria-hidden="true">
            ▶
          </span>
          <span>
            Смотреть в работе <small>{film.duration}</small>
          </span>
          <Icon />
        </span>
        <SurfaceLight />
      </button>
      <dialog
        ref={dialog}
        className={styles.filmDialog}
        aria-labelledby={titleId}
        onCancel={close}
        onClose={() => {
          video.current?.pause();
          setOpen(false);
          trigger.current?.focus();
        }}
      >
        <div className={styles.filmToolbar}>
          <h2 id={titleId}>{film.title}</h2>
          <button type="button" onClick={close} aria-label="Закрыть видео">
            <Icon name="close" />
          </button>
        </div>
        {open && (
          <>
            <div
              className={`${styles.player} ${film.portrait ? styles.portraitPlayer : ""}`}
            >
              {!error && (
                <video
                  ref={video}
                  src={film.src}
                  poster={film.poster}
                  controls
                  autoPlay
                  muted
                  playsInline
                  preload="none"
                  aria-label={film.title}
                  onCanPlay={() => setLoading(false)}
                  onPlaying={() => {
                    setLoading(false);
                    track("video_play", { id, placement, source: "website" });
                  }}
                  onEnded={() =>
                    track("video_complete", {
                      id,
                      placement,
                      source: "website",
                    })
                  }
                  onError={() => {
                    setError(true);
                    setLoading(false);
                  }}
                >
                  <track
                    kind="captions"
                    label="Шаги сценария"
                    srcLang="ru"
                    src={`/media/projects/${id}.vtt`}
                    default
                  />
                </video>
              )}
              {loading && (
                <p className={styles.videoStatus} role="status">
                  Открываем видео…
                </p>
              )}
              {error && (
                <div className={styles.videoError} role="status">
                  <h3>Видео сейчас недоступно</h3>
                  <p>Можно открыть приложение на странице проекта.</p>
                  <a className="button" href={`/cases/${id}`}>
                    Перейти к проекту
                    <Icon />
                  </a>
                  <button
                    type="button"
                    className="subtle-link"
                    onClick={() => {
                      setError(false);
                      setLoading(true);
                    }}
                  >
                    Попробовать ещё раз
                  </button>
                </div>
              )}
            </div>
            <p className={styles.filmDescription}>{film.description}</p>
          </>
        )}
      </dialog>
    </>
  );
}
