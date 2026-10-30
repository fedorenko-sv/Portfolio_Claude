import Image from "next/image";
import Link from "next/link";
import Icon from "./Icon";
import { author } from "@/content/author";
import styles from "./Editorial.module.css";
export default function SpeakingProof() {
  return (
    <section className={styles.proof}>
      <div className={`wrap ${styles.proofGrid}`}>
        <div className={styles.proofPhotos}>
          <Image
            src={author.speaking.image}
            alt="Сергей Федоренко показывает работу ИИ-агентов на мастер-классе"
            width={1600}
            height={1067}
            sizes="(max-width:700px) 90vw,58vw"
          />
          <figure>
            <Image
              src="/images/author/audience.webp"
              alt="Участники мастер-класса в зрительном зале"
              width={1200}
              height={800}
              sizes="(max-width:700px) 42vw,24vw"
            />
            <figcaption>Живые вопросы. Живой разговор.</figcaption>
          </figure>
        </div>
        <div className={styles.proofCopy}>
          <p className={styles.smallLabel}>Практика перед аудиторией</p>
          <h2>
            Показываю то,
            <br />с чем работаю сам.
          </h2>
          <p>
            Инструменты, реальные сценарии и границы применения ИИ. На
            выступлении — не только слайды: разбираем действия и пробуем вместе.
          </p>
          <p className={styles.proofDate}>
            {author.speaking.date} · {author.speaking.place}
          </p>
          <Link className={styles.whiteAction} href="/speaking">
            Выступления и мастер-классы
            <Icon />
          </Link>
        </div>
      </div>
    </section>
  );
}
