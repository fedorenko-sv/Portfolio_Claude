import Image from "next/image";
import Link from "next/link";
import { author } from "@/content/author";
import Icon from "./Icon";
import styles from "./Growth.module.css";
export default function AuthorProof({
  compact = false,
}: {
  compact?: boolean;
}) {
  return (
    <section className={styles.proof}>
      <div className="wrap">
        <div className={styles.rule}>
          <p className="eyebrow">
            {compact ? "Кто проводит занятие" : "Объясняю на рабочих примерах"}
          </p>
          <span />
          <Link href={compact ? "/contact?type=training" : "/speaking"}>
            {compact ? "Обсудить обучение" : "Выступления"}
            <Icon />
          </Link>
        </div>
        <div
          className={`${styles.proofGrid} ${compact ? styles.authorBio : ""}`}
        >
          <div className={styles.stagePhoto}>
            <Image
              src={compact ? author.portrait : author.speaking.image}
              alt={
                compact
                  ? "Сергей Федоренко"
                  : "Сергей Федоренко выступает с микрофоном перед экраном с темой мастер-класса"
              }
              width={compact ? 1000 : 1600}
              height={compact ? 1250 : 1067}
              sizes="(max-width: 700px) 90vw, 60vw"
            />
            <span>
              {compact
                ? author.name
                : `${author.speaking.date} · ${author.speaking.place}`}
            </span>
          </div>
          <div className={styles.proofText}>
            <p className="eyebrow">
              {compact ? author.role : "Практика ИИ · мастер-класс"}
            </p>
            <h2>
              {compact ? (
                <>
                  От инструмента —<br />
                  <em>к пониманию.</em>
                </>
              ) : (
                <>
                  Не только рассказать.
                  <br />
                  <em>Показать в работе.</em>
                </>
              )}
            </h2>
            <p>{compact ? author.intro : `${author.speaking.title}.`}</p>
            <p>
              {compact
                ? "На занятии разбираем не только запрос к ИИ, но и исходные данные, ограничения и проверку результата."
                : "Разбираем инструменты, действия и границы применения. Тему и упражнения подбираем под аудиторию."}
            </p>
            <Link
              href={
                compact ? "/contact?type=training" : "/contact?type=speaking"
              }
              className="text-link"
            >
              {compact
                ? "Обсудить занятие для команды"
                : "Пригласить выступить"}
              <Icon />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
