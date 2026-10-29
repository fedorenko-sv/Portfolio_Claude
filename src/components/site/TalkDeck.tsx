"use client";
import { useRef, useState } from "react";
import { talkSlides } from "@/content/experiences";
import Icon from "./Icon";
import styles from "./Experiences.module.css";
export default function TalkDeck() {
  const [active, setActive] = useState(0);
  const start = useRef<{ x: number; y: number } | null>(null);
  const slide = talkSlides[active];
  const go = (direction: number) =>
    setActive((i) => (i + direction + talkSlides.length) % talkSlides.length);
  return (
    <div className={styles.talkStage} aria-label="Пример живого разбора">
      <p className={styles.deckLabel}>
        <span className={styles.liveDot} />
        Пример живого разбора<span>Листайте →</span>
      </p>
      <div
        className={styles.slideStack}
        onPointerDown={(e) => {
          start.current = { x: e.clientX, y: e.clientY };
        }}
        onPointerCancel={() => {
          start.current = null;
        }}
        onPointerUp={(e) => {
          if (
            start.current &&
            Math.abs(e.clientX - start.current.x) > 45 &&
            Math.abs(e.clientX - start.current.x) >
              Math.abs(e.clientY - start.current.y) * 1.4
          )
            go(e.clientX < start.current.x ? 1 : -1);
          start.current = null;
        }}
      >
        <article
          key={active}
          className={styles.talkSlide}
          aria-live="polite"
          aria-atomic="true"
        >
          <p className={styles.eyebrow}>{slide.kicker}</p>
          <h2>{slide.title}</h2>
          <div className={styles.slideDiagram} aria-hidden="true">
            {slide.chips.map((chip, i) => (
              <div key={chip}>
                <span className={styles.diagramNode}>
                  {i === 0 ? "?" : i === 1 ? "↗" : "✓"}
                </span>
                <span>{chip}</span>
              </div>
            ))}
          </div>
          <p>{slide.text}</p>
          <footer>{slide.note}</footer>
        </article>
      </div>
      <div className={styles.deckControls}>
        <button aria-label="Предыдущий слайд" onClick={() => go(-1)}>
          ←
        </button>
        <div role="group" aria-label="Слайды разбора">
          {talkSlides.map((s, i) => (
            <button
              key={s.title}
              aria-label={`Слайд: ${s.kicker}`}
              aria-pressed={active === i}
              onClick={() => setActive(i)}
            >
              <span />
            </button>
          ))}
        </div>
        <button aria-label="Следующий слайд" onClick={() => go(1)}>
          <Icon name="right" />
        </button>
      </div>
    </div>
  );
}
