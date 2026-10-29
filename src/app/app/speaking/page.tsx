import Image from "next/image";
import Link from "next/link";
import { author } from "@/content/author";
import { Intro } from "@/components/site/Content";
export const metadata = { title: "Выступления и мастер-классы" };
export default function Page() {
  return (
    <>
      <Intro label="Для вашей аудитории" title="Показать. Объяснить. Вовлечь.">
        <p>Выступления об ИИ с работающими примерами и практикой.</p>
      </Intro>
      <Image
        src={author.speaking.image}
        width={1600}
        height={1067}
        alt="Сергей Федоренко на сцене с микрофоном"
        sizes="(max-width:760px) 95vw,720px"
        style={{ width: "100%", height: "auto", borderRadius: 12 }}
      />
      <div className="mini-speaking">
        <h2>О чём можем поговорить</h2>
        <ul>
          <li>Первая рабочая задача для ИИ: данные, результат и проверка.</li>
          <li>Агенты и автоматизация: возможности и границы действий.</li>
          <li>От таблиц к цифровому продукту: разбор реальных сценариев.</li>
        </ul>
        <p>Согласуем тему, длительность и формат под ваше мероприятие.</p>
        <Link className="button" href="/app/contact?type=speaking">
          Пригласить выступить ↗
        </Link>
      </div>
    </>
  );
}
