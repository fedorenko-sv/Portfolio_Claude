import Link from "next/link";
import { ContactBand } from "@/components/site/Content";
import ProjectViewer from "@/components/site/ProjectViewer";
import PhoneScene from "@/components/site/PhoneScene";
import Icon from "@/components/site/Icon";
export const metadata = {
  title: "Для бизнеса",
  alternates: { canonical: "/solutions" },
};
const directions = [
  [
    "Заявки и работа с клиентами",
    "Связать обращение, историю общения, ответственного и следующий шаг. Добавить расписание и расчёты там, где этого требует процесс.",
    "edcrm",
    "CRM для образовательных центров",
  ],
  [
    "Размещение и расписание",
    "Согласовать бронирование, номерной фонд, заселение и план пребывания. Учитывать переносы и изменения в общей истории.",
    "rehab",
    "Система размещения и сопровождения гостей",
  ],
  [
    "Уроки и учебные материалы",
    "Организовать публикацию материалов, доступ участников и просмотр результатов. Дать преподавателю удобное место для подготовки занятий.",
    "english-lab",
    "Платформа интерактивных уроков и лекций",
  ],
  [
    "Меню и гостевой сервис",
    "Представить блюда через понятное меню и визуальный просмотр. Помочь гостю собрать свой выбор.",
    "gastro",
    "Интерактивное меню для ресторана",
  ],
];
export default function Page() {
  return (
    <>
      <section className="page-hero business-hero theme-dark">
        <div className="wrap page-hero-inner">
          <div className="page-hero-copy">
            <p className="eyebrow">Разработка / под рабочий процесс</p>
            <h1>
              Собрать работу
              <br />в понятную
              <br />
              систему.
            </h1>
            <p className="lead">
              Разрабатываю инструменты, которые связывают нужные действия и
              данные.
            </p>
            <div className="actions">
              <Link href="/contact" className="button">
                Обсудить задачу
                <Icon />
              </Link>
              <a href="#directions" className="text-link">
                Посмотреть решения
                <Icon name="down" />
              </a>
            </div>
          </div>
          <div className="hero-device">
            <PhoneScene />
          </div>
        </div>
      </section>
      <section id="directions" className="business-directions wrap">
        <div className="section-rule">
          <p className="eyebrow">От задачи к инструменту</p>
          <span />
        </div>
        <div className="solution-list">
          {directions.map(([title, text, slug, project], i) => (
            <section key={slug}>
              <span className="row-number">0{i + 1}</span>
              <div>
                <h2>{title}</h2>
              </div>
              <div className="solution-description">
                <p>{text}</p>
                <p className="solution-project">{project}</p>
                <Link href={`/cases/${slug}`} className="text-link">
                  Посмотреть проект
                  <Icon />
                </Link>
              </div>
            </section>
          ))}
        </div>
      </section>
      <section className="business-steps theme-dark">
        <div className="wrap">
          <p className="eyebrow">Как начнём</p>
          <h2>
            Одна задача.
            <br />
            Понятный первый шаг.
          </h2>
          <div className="business-steps-list">
            {[
              [
                "Разберём процесс",
                "Кто участвует, какие данные нужны, где возникают задержки и что происходит в исключительных случаях.",
              ],
              [
                "Выберем первый сценарий",
                "Определим ограниченный участок, который имеет смысл собрать и проверить первым.",
              ],
              [
                "Проверим и наметим развитие",
                "Пройдём рабочий маршрут, соберём обратную связь и решим, что доработать дальше.",
              ],
            ].map(([title, text], i) => (
              <div className="business-step" key={title}>
                <span>0{i + 1}</span>
                <h3>{title}</h3>
                <p>{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="business-example wrap">
        <p className="eyebrow">Из проекта</p>
        <div className="business-example-layout">
          <h2>
            Один маршрут
            <br />
            вместо разрозненных действий.
          </h2>
          <div>
            <p>
              В образовательном центре заявка связана с учеником и родителем,
              группа — с расписанием, а счёт — с нужной семьёй.
            </p>
            <p className="example-quote">
              Каждый видит свою часть общего процесса.
            </p>
            <ProjectViewer id="edcrm" title="CRM для образовательных центров" />
          </div>
        </div>
      </section>
      <ContactBand title="Расскажите, как устроена ваша работа" />
    </>
  );
}
