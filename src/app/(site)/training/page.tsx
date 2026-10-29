import Link from "next/link";
import Image from "next/image";
import { author } from "@/content/author";
import { ProgramCards } from "@/components/site/Content";
import PracticeObject from "@/components/site/PracticeObject";
import LessonLab from "@/components/site/LessonLab";
import Icon from "@/components/site/Icon";
import styles from "@/components/site/Editorial.module.css";
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
            <p className={styles.smallLabel}>Практика ИИ · для команды</p>
            <h1>
              Научиться.
              <br />
              <span>
                Попробовать.
                <br />
                Применить.
              </span>
            </h1>
            <p>
              Практические занятия для специалистов, руководителей и команд.
              Начинаем с рабочей задачи и доходим до результата, который можно
              проверить.
            </p>
            <Link href="/contact?type=training" className="button">
              Подобрать обучение
              <Icon />
            </Link>
          </div>
          <figure>
            <Image
              src={author.speaking.image}
              alt="Сергей проводит мастер-класс по применению ИИ"
              width={1600}
              height={1067}
              sizes="(max-width:700px) 90vw,50vw"
              priority
            />
            <figcaption>
              Практика перед аудиторией · {author.speaking.place},{" "}
              {author.speaking.date}
            </figcaption>
          </figure>
        </div>
      </section>
      <section className={styles.outcomes}>
        <div className={`wrap ${styles.outcomeGrid}`}>
          <div>
            <p className={styles.smallLabel}>С чем уйдут участники</p>
            <h2>
              Не просто узнать.
              <br />
              Сделать самому.
            </h2>
          </div>
          <div className={styles.outcomeItems}>
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
                <Icon name="check" size={28} />
                <h3>{h}</h3>
                <p>{p}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
      <LessonLab />
      <section id="programs" className={styles.section}>
        <div className="wrap">
          <p className={styles.smallLabel}>Обучение по запросу</p>
          <h2>
            Выберем формат
            <br />
            под задачи команды.
          </h2>
          <p>Тему, содержание и условия согласуем перед стартом.</p>
          <ProgramCards />
        </div>
      </section>
      <PracticeObject />
      <section className={styles.section}>
        <div className={`wrap ${styles.faqGrid}`}>
          <div>
            <p className={styles.smallLabel}>Для организатора</p>
            <h2>Подготовим занятие вместе с вами.</h2>
            <p>
              Уточним аудиторию, задачи и доступные инструменты. Начнём с того,
              что пригодится в работе.
            </p>
            <Link className="text-link" href="/contact?type=training">
              Обсудить обучение
              <Icon />
            </Link>
          </div>
          <div>
            {[
              [
                "Очно или онлайн?",
                "Оба формата возможны. Длительность и состав группы согласуем при подготовке.",
              ],
              [
                "Что понадобится участникам?",
                "Для практики — устройство и доступ к выбранным инструментам. Оборудование и учебные данные уточним заранее.",
              ],
              [
                "Можно ли работать с задачами команды?",
                "Да. Сначала согласуем примеры и подготовим обезличенные данные для упражнения.",
              ],
              [
                "Как выбрать программу?",
                "Расскажите об аудитории и желаемом результате. На этой основе предложим содержание и формат.",
              ],
            ].map(([q, a], i) => (
              <details key={q} open={i === 0}>
                <summary>{q}</summary>
                <p>{a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
