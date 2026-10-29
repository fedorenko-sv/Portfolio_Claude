"use client";
import { useState } from "react";
import { lessonExamples } from "@/content/experiences";
import Icon from "./Icon";
import styles from "./Experiences.module.css";

export default function LessonLab() {
  const [example, setExample] = useState(0),
    [answer, setAnswer] = useState<number | null>(null);
  const item = lessonExamples[example],
    correct = answer === item.wrong;
  return (
    <section className={styles.lesson} aria-labelledby="lesson-heading">
      <div className="wrap">
        <div className={styles.sectionHead}>
          <div>
            <p className={styles.eyebrow}>Попробуйте прямо здесь</p>
            <h2 id="lesson-heading">
              Звучит убедительно.
              <br />
              <span>А это правда?</span>
            </h2>
          </div>
          <p>
            На занятиях учимся замечать, где полезный ответ превращается в
            догадку. Начните с короткого упражнения.
          </p>
        </div>
        <div className={styles.lessonLayout}>
          <aside className={styles.sourceNote}>
            <p className={styles.eyebrow}>Исходные данные</p>
            <h3>{item.topic}</h3>
            <p>{item.task}</p>
            <ul>
              {item.facts.map((fact) => (
                <li key={fact}>
                  <Icon name="check" size={18} />
                  {fact}
                </li>
              ))}
            </ul>
            <span className={styles.paperStamp}>Учебный пример</span>
          </aside>
          <div className={styles.answerSheet}>
            <div key={example} className={styles.sheetContents}>
              <p className={styles.eyebrow}>
                Проверка ответа · {example + 1} из {lessonExamples.length}
              </p>
              <h3>Какая фраза не подтверждена данными?</h3>
              <div
                className={styles.claims}
                role="group"
                aria-label="Варианты ответа"
              >
                {item.claims.map((claim, i) => (
                  <button
                    key={claim}
                    aria-pressed={answer === i}
                    data-result={
                      answer === i ? (correct ? "correct" : "retry") : ""
                    }
                    onClick={() => setAnswer(i)}
                  >
                    <span className={styles.claimMark} aria-hidden="true">
                      {answer === i ? (correct ? "✓" : "↺") : "+"}
                    </span>
                    {claim}
                  </button>
                ))}
              </div>
              <div
                className={styles.lessonFeedback}
                aria-live="polite"
                aria-atomic="true"
              >
                {answer === null ? (
                  <p>
                  Сопоставьте каждую фразу с исходными данными. Нажмите на ту, в
                    которой автор додумал факты.
                  </p>
                ) : correct ? (
                  <>
                    <strong>Да, здесь стоит остановиться.</strong>
                    <p>{item.explanation}</p>
                    <blockquote>{item.fix}</blockquote>
                  </>
                ) : (
                  <>
                    <strong>Эта фраза согласуется с заметками.</strong>
                    <p>
                      Попробуйте ещё раз: ищите конкретное утверждение, для
                      которого не хватает исходных данных.
                    </p>
                  </>
                )}
              </div>
            </div>
            <button
              className={styles.nextExample}
              onClick={() => {
                setExample((example + 1) % lessonExamples.length);
                setAnswer(null);
              }}
            >
              Другой пример
              <Icon name="right" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
