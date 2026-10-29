import Image from "next/image";
import Link from "next/link";
import { author } from "@/content/author";
import Icon from "@/components/site/Icon";
import WorkingNotes from "@/components/site/WorkingNotes";
import styles from "@/components/site/Editorial.module.css";
export const metadata = {
  title: "Обо мне",
  alternates: { canonical: "/about" },
};
export default function About() {
  return (
    <>
      <section className={`${styles.pageHero} ${styles.aboutHero}`}>
        <div className={`wrap ${styles.pageHeroGrid}`}>
          <div>
            <p className={styles.smallLabel}>Обо мне</p>
            <h1>
              Сергей
              <br />
              <span>Федоренко.</span>
            </h1>
            <p>Разработчик и преподаватель.</p>
            <p>{author.intro}</p>
            <Link href="/contact" className="button">
              Познакомиться и обсудить задачу
              <Icon />
            </Link>
          </div>
          <figure>
            <Image
              src={author.portrait}
              width={1000}
              height={1250}
              alt="Сергей Федоренко"
              priority
              sizes="(max-width:700px) 90vw,45vw"
            />
          </figure>
        </div>
      </section>
      <WorkingNotes />
      <section className={styles.section}>
        <div className="wrap">
          <div className={styles.aboutBody}>
            <p className={styles.smallLabel}>Что связывает мою работу</p>
            <h2>
              Понять задачу.
              <br />
              Сделать. Передать опыт.
            </h2>
            <p>
              В разработке мне важно, как человек будет пользоваться продуктом:
              куда поступит заявка, кто увидит следующий шаг, где проверить
              результат.
            </p>
            <p>
              В обучении тот же подход. Вместе выбираем задачу, пробуем
              инструменты и разбираем, чему в результате можно доверять, а что
              нужно проверить.
            </p>
          </div>
          <div className={styles.topics}>
            {[
              [
                "Разработка",
                "Сервисы для учебных центров, размещения гостей и ресторанов.",
                "/cases",
                "Посмотреть проекты",
              ],
              [
                "Обучение",
                "Практические занятия для специалистов и команд.",
                "/training",
                "Выбрать обучение",
              ],
              [
                "Выступления",
                "Живые демонстрации инструментов и разбор рабочих сценариев.",
                "/speaking",
                "Темы и выступления",
              ],
            ].map(([h, p, href, label]) => (
              <article key={h}>
                <h3>{h}</h3>
                <p>{p}</p>
                <Link href={href}>
                  {label}
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
