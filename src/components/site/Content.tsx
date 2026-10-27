import Link from "next/link";
import {
  catalogFor,
  type Case,
  type Material,
  type Program,
} from "@/content/catalog";
import ViewEvent from "@/components/shared/ViewEvent";
export const statusLabels = {
  prototype: "Прототип",
  demo: "Демо",
  pilot: "Пилот",
  production: "Внедрение",
};
export function Intro({
  label,
  title,
  children,
}: {
  label: string;
  title: string;
  children?: React.ReactNode;
}) {
  return (
    <div className="page-intro">
      <p className="eyebrow">{label}</p>
      <h1>{title}</h1>
      {children && <div className="intro-text">{children}</div>}
    </div>
  );
}
export function CaseCards({
  base = "/cases",
  limit,
}: {
  base?: string;
  limit?: number;
}) {
  return (
    <div className="case-grid">
      {catalogFor()
        .cases.slice(0, limit)
        .map((item) => (
          <Link
            href={`${base}/${item.slug}`}
            className={`case-card case-${item.id}`}
            key={item.id}
          >
            <div className="case-top">
              <span>{item.audience}</span>
              <span className="badge">{statusLabels[item.status]}</span>
            </div>
            <div
              className="case-route"
              aria-label={`Маршрут: ${item.journey.join(", ")}`}
            >
              <span className="route-caption">Рабочий маршрут</span>
              {item.journey.slice(0, 4).map((step) => (
                <span key={step}>{step}</span>
              ))}
            </div>
            <div className="case-bottom">
              <span className="project-name">
                {item.id === "edcrm"
                  ? "EdCRM"
                  : item.id === "english-lab"
                    ? "English Lab"
                    : item.id === "rehab"
                      ? "Rehab"
                      : "Gastro"}
              </span>
              <h3>{item.title}</h3>
              <p>{item.limitations[0]}</p>
              <span className="text-link">
                Подробнее о проекте <span aria-hidden="true">↗</span>
              </span>
            </div>
          </Link>
        ))}
    </div>
  );
}
export function MaterialCards({ base = "/materials" }: { base?: string }) {
  return (
    <div className="editorial-list">
      {catalogFor().materials.map((item, i) => (
        <Link
          href={`${base}/${item.slug}`}
          className="editorial-row"
          key={item.id}
        >
          <span className="row-number">0{i + 1}</span>
          <div>
            <p className="eyebrow">ПАМЯТКА · ПРАКТИКА</p>
            <h3>{item.title}</h3>
            <p>{item.summary}</p>
          </div>
          <span aria-hidden="true" className="row-arrow">
            ↗
          </span>
        </Link>
      ))}
    </div>
  );
}
export function ProgramCards({ base = "/training" }: { base?: string }) {
  const { programs } = catalogFor();
  return programs.length ? (
    <div className="program-grid">
      {programs.map((p) => (
        <Link className="program-card" key={p.id} href={`${base}/${p.slug}`}>
          <p className="eyebrow">
            {p.approvalStatus === "draft"
              ? "ПРОЕКТ ПРОГРАММЫ · НА СОГЛАСОВАНИИ"
              : p.format}
          </p>
          <h3>{p.title}</h3>
          <p>{p.audience.join(" · ")}</p>
          <ul>
            {p.outcomes.map((x) => (
              <li key={x}>{x}</li>
            ))}
          </ul>
          <span className="text-link">Открыть программу ↗</span>
        </Link>
      ))}
    </div>
  ) : (
    <div className="note-panel">
      <h3>Подберём формат под вашу задачу</h3>
      <p>
        Индивидуальная программа обсуждается до занятия: аудитория, учебные
        задачи, инструменты и способ проверки результата.
      </p>
      <Link className="text-link" href="/contact?type=training">
        Обсудить обучение ↗
      </Link>
    </div>
  );
}
export function CaseDetail({ item }: { item: Case }) {
  return (
    <>
      <ViewEvent event="case_view" id={item.id} />
      <Intro
        label={`${item.audience} / ${statusLabels[item.status]}`}
        title={item.title}
      >
        <p>{item.problem}</p>
      </Intro>
      <div className="detail-grid">
        <article className="prose">
          <h2>Что входит в сценарий</h2>
          <ul>
            {item.implemented.map((x) => (
              <li key={x}>{x}</li>
            ))}
          </ul>
          <h2>Путь пользователя</h2>
          <ol className="journey-list">
            {item.journey.map((x) => (
              <li key={x}>{x}</li>
            ))}
          </ol>
          <h2>Основания описания</h2>
          {item.allowedClaims.map((x) => (
            <p key={x}>{x}</p>
          ))}
          {item.evidence.map((url, i) => (
            <p key={url}>
              <a href={url} rel="noreferrer">
                Публичный источник проекта {i + 1} ↗
              </a>
            </p>
          ))}
          <h2>Моя роль</h2>
          <p>
            Разработка интерфейса и сценария цифрового продукта. Объём
            подтверждённых возможностей указан выше; результаты внедрения
            отдельно не измерялись.
          </p>
        </article>
        <aside className="note-panel">
          <p className="eyebrow">СТАТУС И ГРАНИЦЫ</p>
          <h2>{statusLabels[item.status]}</h2>
          {item.limitations.map((x) => (
            <p key={x}>{x}</p>
          ))}
          <p>Публичные медиа этого сценария пока не подготовлены.</p>
        </aside>
      </div>
      <ContactBand title="Обсудим похожий процесс?" />
    </>
  );
}
export function MaterialDetail({
  item,
  app = false,
}: {
  item: Material;
  app?: boolean;
}) {
  return (
    <>
      <Intro
        label={`Практический материал · проверено ${item.verifiedAt}`}
        title={item.title}
      >
        <p>{item.summary}</p>
      </Intro>
      <article className="prose reading">
        {item.steps.map((step, i) => (
          <section key={step.title}>
            <h2>
              {i + 1}. {step.title}
            </h2>
            <p>{step.text}</p>
          </section>
        ))}
        <aside className="note-panel">
          <h2>Учебный пример</h2>
          <p>{item.example}</p>
        </aside>
        <h2>Проверочный список</h2>
        <ul>
          {item.checklist.map((x) => (
            <li key={x}>{x}</li>
          ))}
        </ul>
        {item.sourceUrls.length > 0 && (
          <>
            <h2>Источники</h2>
            {item.sourceUrls.map((url) => (
              <p key={url}>
                <a href={url}>{url}</a>
              </p>
            ))}
          </>
        )}
        <Link
          className="button"
          href={`${app ? "/app" : ""}/practice/first-ai-task`}
        >
          Составить свою карточку задачи ↗
        </Link>
        <p>
          <Link href={app ? "/app/training" : "/training"}>
            Посмотреть форматы обучения
          </Link>
        </p>
      </article>
    </>
  );
}
export function ProgramDetail({ item }: { item: Program }) {
  return (
    <>
      <ViewEvent event="program_view" id={item.id} />
      <Intro
        label={
          item.approvalStatus === "draft"
            ? "Проект программы · только preview"
            : "Обучение"
        }
        title={item.title}
      >
        <p>
          {item.format} · {item.delivery_mode}
        </p>
      </Intro>
      <article className="prose reading">
        {item.approvalStatus === "draft" && (
          <aside className="note-panel">
            Содержание и возможность проведения ещё согласуются. Это проект
            программы, без открытой записи, цены и назначенной даты.
          </aside>
        )}
        <h2>Для кого</h2>
        <p>{item.audience.join(", ")}.</p>
        <h2>До занятия</h2>
        <p>{item.prerequisites}</p>
        <h2>Что попробуем</h2>
        <ul>
          {item.outcomes.map((x) => (
            <li key={x}>{x}</li>
          ))}
        </ul>
        <h2>План занятия</h2>
        <ol>
          {item.agenda.map((x) => (
            <li key={x}>{x}</li>
          ))}
        </ol>
        <h2>Формат</h2>
        <p>{item.duration || "Длительность согласуем при подготовке."}</p>
        <p>{item.equipment}</p>
        <Link className="button" href="/contact?type=training">
          Обсудить программу ↗
        </Link>
      </article>
    </>
  );
}
export function ContactBand({
  title = "Есть задача, которую хочется упростить?",
}: {
  title?: string;
}) {
  return (
    <section className="contact-band">
      <div>
        <p className="eyebrow">НАЧНЁМ С РАЗГОВОРА</p>
        <h2>{title}</h2>
        <p>
          Опишите процесс, команду и желаемый результат. Выберем понятный
          следующий шаг.
        </p>
      </div>
      <Link className="button" href="/contact">
        Обсудить задачу ↗
      </Link>
    </section>
  );
}
