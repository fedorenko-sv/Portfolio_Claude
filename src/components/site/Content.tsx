import Link from "next/link";
import {
  catalogFor,
  type Case,
  type Material,
  type Program,
} from "@/content/catalog";
import ViewEvent from "@/components/shared/ViewEvent";
import ProjectViewer from "./ProjectViewer";
import Icon from "./Icon";
import ProjectFilm from "./ProjectFilm";
import growth from "./Growth.module.css";

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
    <div className="project-list">
      {catalogFor()
        .cases.slice(0, limit)
        .map((item) => (
          <article className="project-row" key={item.id}>
            <div className="project-index">
              <p className="eyebrow">{item.audience}</p>
            </div>
            <ProjectViewer id={item.id} title={item.title} preview />
            <div className="project-row-body">
              <h3>
                <Link href={`${base}/${item.slug}`}>{item.title}</Link>
              </h3>
              <div className="project-description">
                <p>{item.summary}</p>
                <div className="actions">
                  <ProjectViewer
                    id={item.id}
                    title={item.title}
                    className="text-link"
                  />
                  <Link href={`${base}/${item.slug}`} className="subtle-link">
                    Подробнее о проекте
                    <Icon />
                  </Link>
                </div>
              </div>
            </div>
            <div className="project-journey" aria-label="Путь пользователя">
              {item.journey.slice(0, 4).map((step, i) => (
                <span key={step}>
                  {i > 0 && <Icon name="right" size={17} />}
                  {step}
                </span>
              ))}
            </div>
          </article>
        ))}
    </div>
  );
}

export function MaterialCards({ base = "/materials" }: { base?: string }) {
  return (
    <div className="editorial-list">
      {catalogFor().materials.map((item) => (
        <Link
          href={`${base}/${item.slug}`}
          className="editorial-row"
          key={item.id}
        >
          <div>
            <p className="eyebrow">Материал / практика</p>
            <h3>{item.title}</h3>
            <p>{item.summary}</p>
          </div>
          <Icon size={32} />
        </Link>
      ))}
    </div>
  );
}

export function ProgramCards({ base = "/training" }: { base?: string }) {
  const { programs } = catalogFor();
  return programs.length ? (
    <div className="program-list">
      {programs.map((p, i) => (
        <article className="program-row" key={p.id}>
          <div className="program-name">
            <h3>
              <Link href={`${base}/${p.slug}`}>{p.title}</Link>
            </h3>
            <p className="eyebrow">{p.audience.join(" · ")}</p>
          </div>
          <div className="program-result">
            <p>{p.summary}</p>
            {i === 0 && (
              <ul className="check-list">
                {p.outcomes.map((x) => (
                  <li key={x}>
                    <Icon name="check" size={19} />
                    {x}
                  </li>
                ))}
              </ul>
            )}
            <p className="small">{p.format}</p>
            <Link className="text-link" href={`${base}/${p.slug}`}>
              Посмотреть программу
              <Icon />
            </Link>
          </div>
        </article>
      ))}
      <p className="catalog-note">
        Содержание, даты и формат согласуем перед стартом.
      </p>
    </div>
  ) : (
    <div className="note-panel">
      <h3>Подберём формат под вашу задачу</h3>
      <p>
        Обсудим аудиторию, учебные задачи, инструменты и способ проверки
        результата.
      </p>
      <Link
        className="text-link"
        href={`${base.startsWith("/app/") ? "/app" : ""}/contact?type=training`}
      >
        Обсудить обучение
        <Icon />
      </Link>
    </div>
  );
}

export function CaseDetail({ item }: { item: Case }) {
  return (
    <>
      <ViewEvent event="case_view" id={item.id} />
      <Intro label={item.audience} title={item.title}>
        <p>{item.summary}</p>
      </Intro>
      <section className={`wrap ${growth.caseFilm}`}>
        <ProjectFilm id={item.id} />
        <p>
          В записи — отдельная локальная версия на учебных данных. Во встроенном
          просмотре доступны выбранные действия.
        </p>
      </section>
      <section className="case-introduction wrap">
        <p className="eyebrow">Задача проекта</p>
        <h2>{item.problem}</h2>
      </section>
      <section className="case-workspace theme-dark">
        <div className="wrap">
          <p className="eyebrow">Путь пользователя</p>
          <ol className="case-flow">
            {item.journey.map((step) => (
              <li key={step}>{step}</li>
            ))}
          </ol>
          <ProjectViewer id={item.id} title={item.title} preview />
          <div className="case-launch">
            <div>
              <h2>Посмотрите, как устроен сценарий</h2>
              <p>
                Откройте приложение или перейдите к доступной версии проекта.
              </p>
            </div>
            <ProjectViewer id={item.id} title={item.title} />
          </div>
        </div>
      </section>
      <section className="case-details wrap detail-grid">
        <div>
          <p className="eyebrow">Возможности</p>
          <h2>Что связано в одной системе</h2>
          <ul className="feature-list">
            {item.implemented.map((x) => (
              <li key={x}>
                <Icon name="check" />
                {x}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="eyebrow">Деталь решения</p>
          <p className="case-insight">{item.insight}</p>
          <details className="case-limits">
            <summary>Что учесть при просмотре</summary>
            {item.limitations.map((x) => (
              <p key={x}>{x}</p>
            ))}
          </details>
        </div>
      </section>
      <ContactBand title="Есть похожая задача?" />
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
      <Intro label="Практический материал" title={item.title}>
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
          Составить карточку задачи
          <Icon />
        </Link>
        <p className="small material-date">Проверено {item.verifiedAt}</p>
      </article>
    </>
  );
}

export function ProgramDetail({ item }: { item: Program }) {
  return (
    <>
      <ViewEvent event="program_view" id={item.id} />
      <Intro label="Практика ИИ / программа занятия" title={item.title}>
        <p>
          {item.format} · {item.delivery_mode}
        </p>
      </Intro>
      <article className="prose reading">
        {item.approvalStatus === "draft" && (
          <p className="program-draft">
            Содержание и формат согласуем перед стартом. Дата занятия пока не
            назначена.
          </p>
        )}
        <h2>Для кого</h2>
        <p>{item.audience.join(", ")}.</p>
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
        <h2>Подготовка</h2>
        <p>{item.prerequisites}</p>
        <p>{item.equipment}</p>
        <p>{item.duration || "Длительность согласуем при подготовке."}</p>
        <Link className="button" href="/contact?type=training">
          Запросить программу
          <Icon />
        </Link>
      </article>
    </>
  );
}

export function ContactBand({
  title = "С какой задачи начнём?",
}: {
  title?: string;
}) {
  return (
    <section className="contact-band theme-cherry">
      <div className="wrap contact-band-inner">
        <div>
          <p className="eyebrow">Начнём с разговора</p>
          <h2>{title}</h2>
        </div>
        <div>
          <p>
            Расскажите, что хотите изменить в работе или чему научить команду.
            Обсудим подходящий следующий шаг.
          </p>
          <Link className="button" href="/contact">
            Обсудить задачу
            <Icon />
          </Link>
        </div>
      </div>
    </section>
  );
}
