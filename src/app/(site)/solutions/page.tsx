import Link from "next/link";
import { Intro, ContactBand } from "@/components/site/Content";
export const metadata = {
  title: "Решения",
  alternates: { canonical: "/solutions" },
};
const solutions = [
  [
    "Заявки и работа с клиентами",
    "Опишем источники, ответственных, состояния и следующий шаг. Начнём с одного маршрута, который можно проверить.",
    "/cases/edcrm",
    "Сценарий образовательного центра",
  ],
  [
    "Размещение и расписание",
    "Свяжем бронирование, ресурсы и изменения расписания. Сначала проверим сценарий на нейтральных данных.",
    "/cases/rehab",
    "Демонстрационный контур Rehab",
  ],
  [
    "Гостевой интерфейс",
    "Меню, выбор, заказ и понятный следующий шаг. Реальные интеграции обсуждаем отдельно от прототипа.",
    "/cases/gastro",
    "Гостевой сценарий Gastro",
  ],
  [
    "Платформы и Mini App",
    "Выделим роль пользователя, задачу и минимальный полезный маршрут. Оценим границы пилота до расширения системы.",
    "/cases/english-lab",
    "Учебный маршрут English Lab",
  ],
];
export default function Page() {
  return (
    <>
      <Intro
        label="Автоматизация и разработка"
        title="Инструмент под процесс. С понятными границами."
      >
        <p>
          Разберём текущий маршрут, определим критерий результата и выберем
          небольшой проверяемый участок.
        </p>
      </Intro>
      <div className="solution-list">
        {solutions.map(([title, text, href, action], i) => (
          <section key={title}>
            <span className="row-number">0{i + 1}</span>
            <div>
              <h2>{title}</h2>
              <p>{text}</p>
              <Link className="text-link" href={href}>
                {action} ↗
              </Link>
            </div>
          </section>
        ))}
      </div>
      <ContactBand />
    </>
  );
}
