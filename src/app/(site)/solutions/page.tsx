import Link from "next/link";
import LiveProduct from "@/components/site/LiveProduct";
import styles from "@/components/site/Editorial.module.css";
import ProcessWorkbench from "@/components/site/ProcessWorkbench";
import Icon from "@/components/site/Icon";
export const metadata = {
  title: "Для бизнеса",
  alternates: { canonical: "/solutions" },
};
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
      <ProcessWorkbench />
      <section className="business-method wrap">
        <div className="section-rule">
          <p className="eyebrow">Как мы работаем</p>
          <span />
        </div>
        <h2>Начнём с понятного шага.</h2>
        <div>
          {[
            [
              "Разберём задачу",
              "Покажите, где сейчас живёт процесс: в таблице, переписке или нескольких системах. Зафиксируем роли и точку, в которой теряется контекст.",
            ],
            [
              "Проверим сценарий",
              "Соберём путь на одном примере: от входящего запроса до результата. До разработки договоримся, по каким признакам поймём, что он работает.",
            ],
            [
              "Спланируем пилот",
              "Выберем небольшой участок для запуска, подготовим данные и список ограничений. Определим, кто проверяет результат и что делаем дальше.",
            ],
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
