"use client";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import Icon from "./Icon";
import styles from "./Experiences.module.css";
const photos = [
  {
    src: "/images/author/speaking.webp",
    alt: "Сергей Федоренко выступает с микрофоном перед экраном",
    title: "На сцене",
    caption: "Липецк · 15 сентября 2026",
    width: 1600,
    height: 1067,
  },
  {
    src: "/images/author/audience.webp",
    alt: "Участники мероприятия в зрительном зале",
    title: "По другую сторону микрофона",
    caption: "Фото из личного архива",
    width: 1200,
    height: 800,
  },
];
export default function PhotoGallery() {
  const [active, setActive] = useState(0),
    [opened, setOpened] = useState<number | null>(null);
  const track = useRef<HTMLDivElement>(null),
    dialog = useRef<HTMLDialogElement>(null);
  const trigger = useRef<HTMLButtonElement | null>(null),
    swipe = useRef<{ x: number; y: number } | null>(null);
  const drag = useRef<{ x: number; left: number; moved: boolean } | null>(null);
  const suppressClick = useRef(false);
  useEffect(() => {
    if (opened === null) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [opened]);
  function go(index: number) {
    const next = (index + photos.length) % photos.length;
    track.current?.scrollTo({
      left: next * track.current.clientWidth,
      behavior: matchMedia("(prefers-reduced-motion:reduce)").matches
        ? "instant"
        : "smooth",
    });
  }
  function close() {
    dialog.current?.close();
    setOpened(null);
    trigger.current?.focus();
  }
  function move(direction: number) {
    setOpened((i) =>
      i === null ? null : (i + direction + photos.length) % photos.length,
    );
  }
  const photo = photos[opened ?? active];
  return (
    <div className={styles.gallery} aria-label="Фотографии с выступления">
      <div
        className={styles.photoTrack}
        ref={track}
        onDragStart={(event) => event.preventDefault()}
        onPointerDown={(event) => {
          suppressClick.current = false;
          if (event.pointerType !== "mouse" || event.button !== 0) return;
          drag.current = {
            x: event.clientX,
            left: event.currentTarget.scrollLeft,
            moved: false,
          };
        }}
        onPointerMove={(event) => {
          const state = drag.current;
          if (!state) return;
          const delta = event.clientX - state.x;
          if (Math.abs(delta) > 8) {
            state.moved = true;
            event.currentTarget.setPointerCapture(event.pointerId);
            event.currentTarget.style.scrollSnapType = "none";
            event.currentTarget.dataset.dragging = "true";
          }
          if (state.moved) event.currentTarget.scrollLeft = state.left - delta;
        }}
        onPointerUp={(event) => {
          const state = drag.current;
          drag.current = null;
          if (!state?.moved) return;
          suppressClick.current = true;
          event.currentTarget.style.scrollSnapType = "";
          delete event.currentTarget.dataset.dragging;
          if (event.currentTarget.hasPointerCapture(event.pointerId))
            event.currentTarget.releasePointerCapture(event.pointerId);
          go(
            Math.round(
              event.currentTarget.scrollLeft / event.currentTarget.clientWidth,
            ),
          );
        }}
        onPointerCancel={(event) => {
          drag.current = null;
          event.currentTarget.style.scrollSnapType = "";
          delete event.currentTarget.dataset.dragging;
        }}
        onClickCapture={(event) => {
          if (suppressClick.current) {
            event.preventDefault();
            event.stopPropagation();
            suppressClick.current = false;
          }
        }}
        onScroll={(event) => {
          const node = event.currentTarget;
          setActive(
            Math.max(
              0,
              Math.min(
                photos.length - 1,
                Math.round(node.scrollLeft / node.clientWidth),
              ),
            ),
          );
        }}
      >
        {photos.map((item, i) => (
          <figure key={item.src} className={styles.photoFrame}>
            <button
              aria-label={`Увеличить фото: ${item.title}`}
              onClick={(event) => {
                trigger.current = event.currentTarget;
                setOpened(i);
                dialog.current?.showModal();
              }}
            >
              <Image
                src={item.src}
                alt={item.alt}
                width={item.width}
                height={item.height}
                sizes="(max-width:760px) 90vw,50vw"
                draggable={false}
              />
              <span className={styles.enlarge} aria-hidden="true">
                ↗
              </span>
            </button>
            <figcaption>
              <strong>{item.title}</strong>
              <span>{item.caption}</span>
            </figcaption>
          </figure>
        ))}
      </div>
      <div className={styles.galleryControls}>
        <span>
          Листайте фото <span aria-hidden="true">↔</span>
        </span>
        <span>
          {active + 1} / {photos.length}
        </span>
        <button aria-label="Предыдущее фото" onClick={() => go(active - 1)}>
          ←
        </button>
        <button aria-label="Следующее фото" onClick={() => go(active + 1)}>
          →
        </button>
      </div>
      <dialog
        ref={dialog}
        className={styles.photoDialog}
        aria-label="Просмотр фотографий"
        onCancel={(event) => {
          event.preventDefault();
          close();
        }}
        onClose={() => {
          setOpened(null);
          trigger.current?.focus();
        }}
        onKeyDown={(event) => {
          if (event.key === "ArrowRight") {
            event.preventDefault();
            move(1);
          }
          if (event.key === "ArrowLeft") {
            event.preventDefault();
            move(-1);
          }
        }}
        onClick={(event) => {
          if (event.target === event.currentTarget) close();
        }}
      >
        {opened !== null && (
          <div className={styles.photoDialogBody}>
            <button
              className={styles.dialogClose}
              autoFocus
              aria-label="Закрыть фотографии"
              onClick={close}
            >
              Закрыть ×
            </button>
            <div
              className={styles.largePhoto}
              onPointerDown={(e) => {
                swipe.current = { x: e.clientX, y: e.clientY };
              }}
              onPointerCancel={() => {
                swipe.current = null;
              }}
              onPointerUp={(e) => {
                if (
                  swipe.current &&
                  Math.abs(e.clientX - swipe.current.x) > 45 &&
                  Math.abs(e.clientX - swipe.current.x) >
                    Math.abs(e.clientY - swipe.current.y) * 1.4
                )
                  move(e.clientX < swipe.current.x ? 1 : -1);
                swipe.current = null;
              }}
            >
              <Image
                key={photo.src}
                src={photo.src}
                alt={photo.alt}
                width={photo.width}
                height={photo.height}
                sizes="95vw"
                draggable={false}
              />
            </div>
            <div className={styles.largeCaption}>
              <button
                aria-label="Предыдущее увеличенное фото"
                onClick={() => move(-1)}
              >
                ←
              </button>
              <p>
                <strong>{photo.title}</strong>
                <span>{photo.caption}</span>
              </p>
              <button
                aria-label="Следующее увеличенное фото"
                onClick={() => move(1)}
              >
                <Icon name="right" />
              </button>
            </div>
          </div>
        )}
      </dialog>
    </div>
  );
}
