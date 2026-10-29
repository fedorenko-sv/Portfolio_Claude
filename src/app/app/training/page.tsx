import Image from "next/image";
import Link from "next/link";
import Icon from "@/components/site/Icon";
import s from "@/components/miniapp/Pocket.module.css";
export const metadata = { title: "Практика и обучение" };
export default function Page() {
  return (
    <div className={s.training}>
      <div className={s.pageIntro}>
        <p>От знакомства к своему результату</p>
        <h1>
          Не просто прочитать.
          <br />
          Попробовать.
        </h1>
        <p>
          Начните с короткого упражнения. Затем перенесите подход на свою
          рабочую задачу.
        </p>
      </div>
      <Link href="/app/practice/check-answer" className={s.lessonFeature}>
        <span>Мини-тренажёр · три примера</span>
        <h2>
          Можно ли доверять
          <br />
          этому ответу?
        </h2>
        <div className={s.answerGraphic} aria-hidden>
          <span>Звучит уверенно.</span>
          <span>
            А где источник? <b>?</b>
          </span>
        </div>
        <strong>
          Найти неподтверждённый факт
          <Icon />
        </strong>
      </Link>
      <div className={s.sectionHeading}>
        <h2>Ваш маршрут практики</h2>
      </div>
      <div className={s.learningPath}>
        {[
          [
            "/app/guides/task-brief",
            "Сформулировать",
            "Дать контекст, данные и критерии результата.",
            "Шаблон запроса",
          ],
          [
            "/app/practice/check-answer",
            "Проверить",
            "Отличить исходные факты от догадок в ответе.",
            "Короткое упражнение",
          ],
          [
            "/app/practice/first-ai-task",
            "Применить",
            "Собрать карточку своей задачи и следующий шаг.",
            "Ваша рабочая задача",
          ],
        ].map(([href, title, text, tag]) => (
          <Link key={href} href={href}>
            <span className={s.pathDot} aria-hidden />
            <div>
              <small>{tag}</small>
              <h3>{title}</h3>
              <p>{text}</p>
            </div>
            <Icon />
          </Link>
        ))}
      </div>
      <section className={s.teamBlock}>
        <Image
          src="/images/author/speaking.webp"
          width={1600}
          height={1067}
          alt="Сергей Федоренко выступает перед аудиторией"
          sizes="(max-width:640px) 90vw,590px"
        />
        <div>
          <p className={s.smallLabel}>Для вашей команды</p>
          <h2>
            Одна общая задача.
            <br />
            Своя попытка у каждого.
          </h2>
          <p>
            На занятии разбираем пример, пробуем инструменты и проверяем
            результат. Подберём содержание под опыт участников и условия работы.
          </p>
          <details>
            <summary>С чего начать подготовку</summary>
            <p>
              Расскажите, кто будет участвовать, какие задачи повторяются в
              работе и что люди должны научиться делать. Подготовим обезличенный
              пример.
            </p>
          </details>
          <details>
            <summary>Что понадобится для практики</summary>
            <p>
              Устройства, интернет и доступ к выбранным инструментам. Всё
              проверим заранее; если доступа нет, обсудим формат общей
              демонстрации.
            </p>
          </details>
          <Link href="/app/guides/team-session" className={s.inlineLink}>
            Памятка организатору
            <Icon />
          </Link>
          <Link href="/app/contact?type=training" className={s.primary}>
            Обсудить обучение
            <Icon />
          </Link>
        </div>
      </section>
    </div>
  );
}
