import Image from "next/image";
import Link from "next/link";
import Icon from "./Icon";
import SurfaceLight from "./SurfaceLight";
import styles from "./Editorial.module.css";

export default function EditorialHero() {
  return (
    <section className={styles.hero} id="about">
      <div className={`wrap ${styles.heroGrid}`}>
        <div className={styles.heroInk}>
          <p className={styles.smallLabel}>
            Разработка · обучение · выступления
          </p>
          <h1>
            Создаю продукты.
            <br />
            <span>Учу применять ИИ.</span>
          </h1>
          <p className={styles.heroLead}>
            Рабочие инструменты для бизнеса. Практические занятия для команд.
            Выступления, на которых можно попробовать самому.
          </p>
          <div className={styles.heroActions}>
            <Link className="button" href="/contact">
              Обсудить задачу
              <Icon />
            </Link>
            <a className={styles.heroDemo} href="#live-menu">
              Сразу попробовать
              <Icon name="down" />
            </a>
          </div>
          <div className={styles.heroRoutes}>
            <Link href="/solutions">
              <span>Для бизнеса</span>
              <Icon size={17} />
            </Link>
            <Link href="/training">
              <span>Для команды</span>
              <Icon size={17} />
            </Link>
            <Link href="/speaking">
              <span>Для аудитории</span>
              <Icon size={17} />
            </Link>
          </div>
          <SurfaceLight />
        </div>
        <figure className={styles.heroPortrait}>
          <div className={styles.portraitBacking} aria-hidden />
          <Image
            src="/images/author/portrait.webp"
            alt="Сергей Федоренко"
            width={1000}
            height={1250}
            sizes="(max-width:700px) 85vw,38vw"
            priority
          />
          <figcaption>
            <span>
              От первого вопроса
              <br />
              до работающего решения.
            </span>
            <span className={styles.signature} aria-hidden>
              СФ
            </span>
          </figcaption>
        </figure>
      </div>
    </section>
  );
}
