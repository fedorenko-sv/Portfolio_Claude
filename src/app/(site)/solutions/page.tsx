import Link from "next/link";
import PhoneScene from "@/components/site/PhoneScene";
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
      <section className="business-editorial theme-dark">
        <div className="wrap">
          <h1>
            Технологии под
            <br />
            вашу рабочую задачу.
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
                <Link href="/contact" className="button">
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
      <section className="business-live theme-dark">
        <div className="wrap business-live-inner">
          <div className="hero-device">
            <PhoneScene interactive />
          </div>
          <div>
            <p className="eyebrow">Проект в действии</p>
            <h2>
              Меню
              <br />
              для ресторана.
            </h2>
            <p className="editorial-lead">
              Можно попробовать
              <br />
              прямо здесь.
            </p>
            <p>
              Откройте раздел, посмотрите блюдо,
              <br className="desktop-break" /> соберите свой список.
            </p>
            <ProjectViewer
              id="gastro"
              title="Интерактивное меню для ресторана"
              className="button secondary"
              label="Открыть меню"
            />
          </div>
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
          ].map(([h, p], i) => (
            <article key={h}>
              <span className="row-number">0{i + 1}</span>
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
