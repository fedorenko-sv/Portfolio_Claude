import { Intro, ProgramCards } from "@/components/site/Content";
import Image from "next/image";
import Link from "next/link";
import Icon from "@/components/site/Icon";
import styles from "@/components/miniapp/Training.module.css";
export default function Page() {
  return (
    <>
      <Intro label="Обучение" title="Знания, которые становятся навыком.">
        <p>
          Разбираем рабочую задачу. Пробуем инструменты. Проверяем результат.
        </p>
      </Intro>
      <figure className={styles.photo}>
        <Image
          src="/images/author/speaking.webp"
          alt="Сергей Федоренко проводит выступление о применении ИИ"
          width={1600}
          height={1067}
          sizes="(max-width:640px) 95vw,592px"
          priority
        />
        <figcaption>Показываю. Пробуем вместе.</figcaption>
      </figure>
      <Link className={styles.practice} href="/app/practice/first-ai-task">
        <span className={styles.symbol} aria-hidden>
          ✳
        </span>
        <span>
          <strong>Начните со своей задачи</strong>
          <small>Бесплатная практика в приложении</small>
        </span>
        <Icon />
      </Link>
      <div className={styles.outcomes}>
        <h2>Что останется с вами</h2>
        <ul>
          <li>Понятная постановка задачи для ИИ.</li>
          <li>Результат, который вы сделали сами.</li>
          <li>Критерии проверки и следующий шаг.</li>
        </ul>
      </div>
      <h2 className={styles.title}>Поработаем с вашей командой.</h2>
      <ProgramCards base="/app/training" />
    </>
  );
}
