"use client";
import { useEffect, useRef, useState } from "react";
import { processExamples } from "@/content/experiences";
import ProjectViewer from "./ProjectViewer";
import Icon from "./Icon";
import styles from "./Experiences.module.css";

export default function ProcessWorkbench() {
  const [scenario, setScenario] = useState(0);
  const [step, setStep] = useState(0);
  const [playing, setPlaying] = useState(false);
  const host = useRef<HTMLElement>(null);
  const example = processExamples[scenario],
    current = example.steps[step];
  useEffect(() => {
    if (!playing) return;
    const timer = setTimeout(() => {
      if (step < 3) setStep(step + 1);
      else setPlaying(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, [playing, step]);
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) setPlaying(false);
    });
    if (host.current) observer.observe(host.current);
    const stop = () => {
      if (document.hidden) setPlaying(false);
    };
    document.addEventListener("visibilitychange", stop);
    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", stop);
    };
  }, []);
  return (
    <section
      ref={host}
      className={styles.workbench}
      aria-labelledby="process-heading"
    >
      <div className="wrap">
        <div className={styles.sectionHead}>
          <div>
            <p className={styles.eyebrow}>Система в движении</p>
            <h2 id="process-heading">
              Один запрос.
              <br />
              <span>Вся история.</span>
            </h2>
          </div>
          <p>
            Выберите сферу и проведите задачу по шагам. Так разрозненные
            действия становятся рабочим процессом.
          </p>
        </div>
        <div
          className={styles.scenarios}
          role="group"
          aria-label="Примеры процессов"
        >
          {processExamples.map((item, i) => (
            <button
              key={item.name}
              aria-pressed={scenario === i}
              onClick={() => {
                setScenario(i);
                setStep(0);
                setPlaying(false);
              }}
            >
              {item.name}
              <Icon name="right" size={18} />
            </button>
          ))}
        </div>
        <div className={styles.processStage}>
          <div className={styles.processRail}>
            <p className={styles.eyebrow}>Пример логики процесса</p>
            <h3>{example.question}</h3>
            <ol>
              {example.steps.map((item, i) => (
                <li
                  key={item.label}
                  data-past={i < step}
                  data-current={i === step}
                >
                  <button
                    aria-current={i === step ? "step" : undefined}
                    onClick={() => {
                      setStep(i);
                      setPlaying(false);
                    }}
                  >
                    <span className={styles.stepDot}>
                      {i < step && <Icon name="check" size={13} />}
                    </span>
                    {item.label}
                  </button>
                </li>
              ))}
            </ol>
            <button
              className={styles.playButton}
              onClick={() => {
                if (playing) setPlaying(false);
                else {
                  setStep(0);
                  setPlaying(true);
                }
              }}
              aria-pressed={playing}
            >
              <span aria-hidden="true">{playing ? "Ⅱ" : "▶"}</span>
              {playing ? "Остановить" : "Показать весь путь"}
            </button>
          </div>
          <div className={styles.processDesk}>
            <div className={styles.orbit} aria-hidden="true">
              <span />
              <span />
              <span />
            </div>
            <div className={styles.documentStack}>
              <div
                key={`${scenario}-${step}`}
                className={styles.processDocument}
                aria-live="polite"
                aria-atomic="true"
              >
                <p className={styles.documentMeta}>
                  <span className={styles.liveDot} />
                  {current.owner}
                  <span>{step + 1} / 4</span>
                </p>
                <h3>{current.heading}</h3>
                <p>{current.detail}</p>
                <div className={styles.artifact}>
                  <Icon name={step === 3 ? "check" : "right"} size={26} />
                  <span>{current.artifact}</span>
                </div>
              </div>
            </div>
            <div className={styles.processProgress} aria-hidden="true">
              {example.steps.map((s, i) => (
                <span key={s.label} data-done={i <= step} />
              ))}
            </div>
          </div>
        </div>
        <div className={styles.processFooter}>
          <p>{example.result}</p>
          <ProjectViewer
            id={example.project}
            title={example.title}
            label="Попробовать в приложении"
            className={styles.lightLink}
          />
        </div>
      </div>
    </section>
  );
}
