import Link from "next/link";
import Image from "next/image";
import { author } from "@/content/author";
import Icon from "@/components/site/Icon";
import styles from "@/components/site/Growth.module.css";
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
            <p className="eyebrow">Выступления и мастер-классы</p>
            <h1>
              ИИ, который
              <br />
              <em>
                можно показать
                <br />в работе.
              </em>
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
          <Image
            src={author.speaking.image}
            width={1600}
            height={1067}
            alt="Сергей Федоренко на сцене с микрофоном"
            sizes="(max-width:700px) 90vw,50vw"
            priority
          />
        </div>
      </section>
      <section className={`wrap ${styles.section}`}>
        <p className="eyebrow">Из опыта · {author.speaking.date}</p>
        <div className={styles.eventGrid}>
          <div>
            <h2>{author.speaking.title}</h2>
            <p>
              Мастер-класс в Липецке. Разговор о том, как перейти от ответов ИИ
              к действиям с помощью инструментов и агентов.
            </p>
            <p>
              Формат вашего выступления обсудим отдельно: от вводного знакомства
              до практического занятия.
            </p>
            <Link className="text-link" href="/contact?type=speaking">
              Обсудить ваше мероприятие
              <Icon />
            </Link>
          </div>
          <div>
            <p className="eyebrow">Для организатора</p>
            <p>
              Согласуем аудиторию, цель, формат и доступные инструменты.
              Практику строим на учебных примерах.
            </p>
          </div>
        </div>
        <figure className={styles.audiencePhoto}>
          <Image
            src="/images/author/audience.webp"
            width={1200}
            height={800}
            alt="Участники мероприятия в зрительном зале"
            sizes="(max-width:700px) 90vw,70vw"
          />
          <figcaption>
            Атмосфера живого мероприятия. Фото предоставлено Сергеем Федоренко.
          </figcaption>
        </figure>
      </section>
      <section className={styles.organizer}>
        <div className={`wrap ${styles.section}`}>
          <p className="eyebrow">Темы для обсуждения</p>
          <h2>
            От интереса —<br />к понятному действию.
          </h2>
          <div className={styles.learningGrid}>
            {[
              [
                "Первая задача для ИИ",
                "Как выбрать рабочий пример, подготовить данные и проверить ответ.",
              ],
              [
                "Агенты и автоматизация",
                "Инструменты, разрешения и границы действий.",
              ],
              [
                "От таблиц к процессу",
                "Как превратить разрозненные действия в понятный цифровой сценарий.",
              ],
            ].map(([h, p]) => (
              <article key={h}>
                <h3>{h}</h3>
                <p>{p}</p>
                <Link className="text-link" href="/contact?type=speaking">
                  Обсудить тему
                  <Icon />
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
