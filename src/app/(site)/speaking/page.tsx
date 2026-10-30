import Link from "next/link";
import Image from "next/image";
import { author } from "@/content/author";
import Icon from "@/components/site/Icon";
import styles from "@/components/site/Editorial.module.css";
export const metadata = {
  title: "Выступления",
  alternates: { canonical: "/speaking" },
};
export default function Speaking() {
  return (
    <>
      <section className={styles.pageHero}>
        <div className={`wrap ${styles.pageHeroGrid}`}>
          <div>
            <p className={styles.smallLabel}>Выступления и мастер-классы</p>
            <h1>
              ИИ, который
              <br />
              <span>
                можно показать
                <br />в работе.
              </span>
            </h1>
            <p>
              Понятные примеры, живые демонстрации и практика для аудитории.
              Подготовим тему под ваше мероприятие.
            </p>
            <Link className="button" href="/contact?type=speaking">
              Пригласить выступить
              <Icon />
            </Link>
          </div>
          <figure>
            <Image
              src={author.speaking.image}
              width={1600}
              height={1067}
              alt="Сергей Федоренко на сцене с микрофоном"
              sizes="(max-width:700px) 90vw,50vw"
              priority
            />
            <figcaption>
              Инструменты и сценарии, которые можно показать вживую.
            </figcaption>
          </figure>
        </div>
      </section>
      <section className={styles.event}>
        <div className={`wrap ${styles.eventGrid}`}>
          <div>
            <p className={styles.smallLabel}>
              Из опыта · {author.speaking.date} · {author.speaking.place}
            </p>
            <h2>{author.speaking.title}</h2>
            <p>
              Мастер-класс в Липецке. Разговор о том, как перейти от ответов ИИ
              к действиям с помощью инструментов и агентов.
            </p>
            <p>
              Формат вашего выступления обсудим отдельно: от вводного знакомства
              до практического занятия.
            </p>
            <Link className={styles.whiteAction} href="/contact?type=speaking">
              Обсудить ваше мероприятие
              <Icon />
            </Link>
          </div>
          <figure>
            <Image
              src="/images/author/audience.webp"
              width={1200}
              height={800}
              alt="Участники мероприятия в зрительном зале"
              sizes="(max-width:700px) 90vw,50vw"
            />
            <figcaption>Живое мероприятие. Фото из личного архива.</figcaption>
          </figure>
        </div>
      </section>
      <section className={styles.section}>
        <div className="wrap">
          <p className={styles.smallLabel}>Темы для обсуждения</p>
          <h2>
            От интереса —<br />к понятному действию.
          </h2>
          <div className={styles.topics}>
            {[
              [
                "Первая задача для ИИ",
                "Как выбрать рабочий пример, подготовить данные и проверить ответ.",
              ],
              [
                "Агенты и автоматизация",
                "Инструменты, разрешения и границы самостоятельных действий.",
              ],
              [
                "От таблиц к процессу",
                "Как превратить разрозненные действия в понятный цифровой сценарий.",
              ],
            ].map(([h, p]) => (
              <article key={h}>
                <h3>{h}</h3>
                <p>{p}</p>
                <Link href="/contact?type=speaking">
                  Обсудить тему
                  <Icon />
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>
      <section className={styles.closing}>
        <div className={`wrap ${styles.closingGrid}`}>
          <div>
            <p className={styles.smallLabel}>Для организатора</p>
            <h2>
              Начнём с вашей
              <br />
              аудитории.
            </h2>
            <p>
              Согласуем цель, формат и доступные инструменты.
              <br />
              Практику подготовим на учебных примерах.
            </p>
          </div>
          <Link className="button" href="/contact?type=speaking">
            Обсудить выступление
            <Icon />
          </Link>
        </div>
      </section>
    </>
  );
}
