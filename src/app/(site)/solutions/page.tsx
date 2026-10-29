import Link from "next/link";
import LiveProduct from "@/components/site/LiveProduct";
import styles from "@/components/site/Editorial.module.css";
import ProjectViewer from "@/components/site/ProjectViewer";
import Icon from "@/components/site/Icon";
export const metadata = {
  title: "Для бизнеса",
  alternates: { canonical: "/solutions" },
};
const directions = [
  [
    "Заявки и клиенты",
    "CRM, ответственные и следующий шаг по каждой заявке.",
    "edcrm",
    "CRM для образовательных центров",
  ],
  [
    "Размещение и расписание",
    "Бронирование, ресурсы и согласованные изменения.",
    "rehab",
    "Система размещения и сопровождения гостей",
  ],
  [
    "Меню и гостевой сервис",
    "Выбор блюда, просмотр меню и понятный путь гостя.",
    "gastro",
    "Интерактивное меню для ресторана",
  ],
  [
    "Уроки и учебные материалы",
    "Материалы, учебные группы и результаты участников.",
    "english-lab",
    "Платформа интерактивных уроков и лекций",
  ],
];
export default function Business() {
  return (
    <>
      <section
        className={`business-editorial theme-dark ${styles.businessIntro}`}
      >
        <div className="wrap">
          <h1>
            Свяжем рабочий процесс
            <br />в понятную систему.
          </h1>
          <div className="business-intro-row">
            <div>
              <p className="eyebrow">Разработка / автоматизация</p>
              <p className="process-line">
                Процесс
                <Icon name="right" size={45} />
                Прототип
                <Icon name="right" size={45} />
                Пилот
              </p>
            </div>
            <div>
              <p>
                Разберём процесс, найдём узкое место
                <br className="desktop-break" /> и соберём понятный рабочий
                сценарий.
              </p>
              <div className="actions">
                <Link href="/contact?type=development" className="button">
                  Разобрать задачу
                  <Icon />
                </Link>
                <Link href="/cases" className="text-link">
                  Посмотреть проекты
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
      <LiveProduct />
      <section className="business-grid-section wrap">
        <div className="section-rule">
          <p className="eyebrow">Что можно собрать</p>
          <span />
        </div>
        <div className="business-grid">
          {directions.map(([title, text, id, project]) => (
            <article key={id}>
              <h2>{title}</h2>
              <p>{text}</p>
              <ProjectViewer
                id={id}
                title={project}
                className="text-link"
                label="Открыть приложение"
              />
            </article>
          ))}
        </div>
      </section>
      <section className="business-method wrap">
        <div className="section-rule">
          <p className="eyebrow">Как мы работаем</p>
          <span />
        </div>
        <h2>Начнём с понятного шага.</h2>
        <div>
          {[
            ["Разберём задачу", "Процесс, роли, ограничения."],
            ["Проверим сценарий", "Прототип и критерии результата."],
            ["Спланируем пилот", "Объём работы и следующий шаг."],
          ].map(([h, p]) => (
            <article key={h}>
              <div>
                <h3>{h}</h3>
                <p>{p}</p>
              </div>
            </article>
          ))}
        </div>
      </section>
      <section className="business-cta theme-cherry">
        <div className="wrap">
          <h2>
            Где работа
            <br />
            теряет время?
          </h2>
          <div>
            <p>
              Опишите процесс и желаемый результат.
              <br />
              Выберем, с чего начать.
            </p>
            <Link href="/contact" className="button">
              Обсудить задачу
              <Icon />
            </Link>
            <p className="business-training">
              Нужно обучение команды?{" "}
              <Link href="/training">
                Курсы
                <Icon />
              </Link>
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
