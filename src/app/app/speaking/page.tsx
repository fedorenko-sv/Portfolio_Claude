import Image from "next/image";
import { author } from "@/content/author";
import SpeakingBuilder from "@/components/miniapp/SpeakingBuilder";
import s from "@/components/miniapp/Pocket.module.css";
export const metadata = { title: "Выступление для вашей аудитории" };
export default function Page() {
  return (
    <>
      <div className={s.pageIntro}>
        <p>Выступления и мастер-классы</p>
        <h1>
          Показать так,
          <br />
          чтобы захотелось
          <br />
          попробовать.
        </h1>
        <p>Живые инструменты, понятные примеры и разговор с аудиторией.</p>
      </div>
      <figure className={s.speakerPhoto}>
        <Image
          src={author.speaking.image}
          width={1600}
          height={1067}
          alt="Сергей Федоренко на сцене с микрофоном"
          sizes="(max-width:640px) 90vw,590px"
          priority
        />
        <figcaption>
          <span>Из личного архива</span>
          <strong>
            {author.speaking.place} · {author.speaking.date}
          </strong>
        </figcaption>
      </figure>
      <SpeakingBuilder />
      <aside className={s.organizerNote}>
        <h2>Организатору на заметку</h2>
        <p>
          Для подготовки пригодятся тема мероприятия, состав аудитории, желаемый
          результат и технические условия. Для практикума отдельно уточним
          устройства участников.
        </p>
      </aside>
    </>
  );
}
