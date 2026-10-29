import Link from "next/link";
import Image from "next/image";
import { author } from "@/content/author";
import { learningSteps } from "@/content/offers";
import { ProgramCards } from "@/components/site/Content";
import AuthorProof from "@/components/site/AuthorProof";
import PracticeObject from "@/components/site/PracticeObject";
import Icon from "@/components/site/Icon";
import styles from "@/components/site/Growth.module.css";
export const metadata = {
  title: "Обучение",
  alternates: { canonical: "/training" },
};
export default function Training() {
  return (
    <>
      <section className={styles.pageHero}>
        <div className={`wrap ${styles.pageHeroGrid}`}>
          <div>
            <p className="eyebrow">Практика ИИ · для команды</p>
            <h1>
              Научиться.
              <br />
              <em>
                Попробовать.
                <br />
                Применить.
              </em>
            </h1>
            <p>
              Практические занятия для специалистов, руководителей и команд.
              Начинаем с рабочей задачи и доходим до результата, который можно
              проверить.
            </p>
            <div className="actions">
              <Link href="/contact?type=training" className="button">
                Подобрать обучение
                <Icon />
              </Link>
              <Link href="/practice/first-ai-task" className="text-link">
                Попробовать практику
                <Icon />
              </Link>
            </div>
          </div>
          <Image
            src={author.speaking.image}
            alt="Сергей проводит мастер-класс по применению ИИ"
            width={1600}
            height={1067}
            sizes="(max-width: 700px) 90vw, 50vw"
            priority
          />
        </div>
      </section>
      <section className={`wrap ${styles.section}`}>
        <p className="eyebrow">С чем уйдут участники</p>
        <h2>
          С конкретным результатом
          <br />
          для своей работы.
        </h2>
        <div className={styles.learningGrid}>
          {[
            [
              "Рабочая задача",
              "Понятное описание входных данных, результата и границ применения.",
            ],
            [
              "Первое решение",
              "Черновик документа, плана или сценария на учебном примере.",
            ],
            [
              "Способ проверки",
              "Критерии, по которым можно оценить ответ и увидеть ошибки.",
            ],
          ].map(([h, p]) => (
            <article key={h}>
              <h3>{h}</h3>
              <p>{p}</p>
            </article>
          ))}
        </div>
      </section>
      <section id="programs" className={`wrap ${styles.section}`}>
        <p className="eyebrow">Обучение по запросу</p>
        <h2>
          Выберем формат
          <br />
          под задачи команды.
        </h2>
        <p>Тему, содержание и условия согласуем перед стартом.</p>
        <ProgramCards />
      </section>
      <section className={`wrap ${styles.section}`}>
        <p className="eyebrow">Как проходит занятие</p>
        <h2>От примера — к своей практике.</h2>
        <div className={styles.steps}>
          {learningSteps.map(([h, p]) => (
            <article key={h}>
              <h3>{h}</h3>
              <p>{p}</p>
            </article>
          ))}
        </div>
      </section>
      <AuthorProof compact />
      <section className={styles.organizer}>
        <div className={`wrap ${styles.organizerGrid}`}>
          <div>
            <p className="eyebrow">Для организатора</p>
            <h2>
              Подготовим занятие
              <br />
              вместе с вами.
            </h2>
            <Link href="/contact?type=training" className="text-link">
              Обсудить аудиторию и задачи
              <Icon />
            </Link>
          </div>
          <div>
            <details open>
              <summary>Очно или онлайн?</summary>
              <p>
                Оба формата возможны. Длительность и состав группы согласуем при
                подготовке.
              </p>
            </details>
            <details>
              <summary>Что понадобится участникам?</summary>
              <p>
                Для практики — устройство и доступ к выбранным инструментам.
                Оборудование и учебные данные уточним заранее.
              </p>
            </details>
            <details>
              <summary>Можно ли работать с задачами команды?</summary>
              <p>
                Да. Сначала согласуем примеры и подготовим обезличенные данные
                для упражнения.
              </p>
            </details>
            <details>
              <summary>Как выбрать программу?</summary>
              <p>
                Расскажите об аудитории и желаемом результате. На этой основе
                предложим содержание и формат.
              </p>
            </details>
          </div>
        </div>
      </section>
      <PracticeObject />
    </>
  );
}
