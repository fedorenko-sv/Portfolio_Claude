import Link from "next/link";
import TrackedLink from "@/components/shared/TrackedLink";
import Image from "next/image";
import { author } from "@/content/author";
import { offers } from "@/content/offers";
import { projectFilms } from "@/content/media";
import PhoneScene from "@/components/site/PhoneScene";
import ProjectViewer from "@/components/site/ProjectViewer";
import ProjectFilm from "@/components/site/ProjectFilm";
import AuthorProof from "@/components/site/AuthorProof";
import PracticeObject from "@/components/site/PracticeObject";
import Icon from "@/components/site/Icon";
import styles from "@/components/site/Growth.module.css";
export const metadata = { alternates: { canonical: "/" } };
export default function Home() {
  return (
    <>
      <section className={styles.hero} id="about">
        <div className={`wrap ${styles.heroGrid}`}>
          <div className={styles.heroCopy}>
            <p className="eyebrow">
              Сергей Федоренко · разработчик и преподаватель
            </p>
            <h1>
              Создаю цифровые
              <br />
              инструменты.
              <br />
              <em>
                Обучаю
                <br className={styles.mobileBreak} /> применять ИИ.
              </em>
            </h1>
            <p>{author.intro}</p>
            <div className="actions">
              <Link className="button" href="/training">
                Обсудить обучение
                <Icon />
              </Link>
              <Link className="text-link" href="/cases">
                Посмотреть проекты
                <Icon />
              </Link>
            </div>
            <Link href="/speaking" className={styles.heroFootnote}>
              Пригласить выступить
              <Icon size={18} />
            </Link>
          </div>
          <figure className={styles.portrait}>
            <Image
              src={author.portrait}
              alt="Сергей Федоренко"
              width={1000}
              height={1250}
              sizes="(max-width: 700px) 90vw, 40vw"
              priority
            />
            <figcaption>
              <span>
                От идеи —<br />к работающему решению.
              </span>
              <Icon size={34} />
            </figcaption>
          </figure>
        </div>
      </section>
      <section
        className={`wrap ${styles.offers}`}
        aria-label="Направления работы"
      >
        {offers.map((o) => (
          <TrackedLink
            href={o.href}
            key={o.id}
            className={styles.offer}
            event="service_select"
            topic={o.id}
            placement="home"
          >
            <p className="eyebrow">{o.note}</p>
            <h2>{o.title}</h2>
            <p>{o.text}</p>
            <span>
              {o.action}
              <Icon />
            </span>
          </TrackedLink>
        ))}
      </section>
      <section className={styles.projects}>
        <div className="wrap">
          <div className={styles.rule}>
            <p className="eyebrow">От задачи к решению</p>
            <span />
            <Link href="/cases">
              Все проекты
              <Icon />
            </Link>
          </div>
          <div className={styles.featureProject}>
            <div>
              <p className="eyebrow">Образование · управление центром</p>
              <h2>
                Из заявки —<br />
                <em>в учебную группу.</em>
              </h2>
              <p>
                Ученики, родители и работа администратора связаны одним
                сценарием. Посмотрите, как устроен переход от заявки к
                зачислению.
              </p>
              <div className={styles.journey}>
                <span>Заявка</span>
                <Icon name="right" />
                <span>Ученик</span>
                <Icon name="right" />
                <span>Группа</span>
              </div>
              <div className="actions">
                <ProjectViewer
                  id="edcrm"
                  title="CRM для образовательных центров"
                  className="text-link"
                />
                <Link href="/cases/edcrm" className="subtle-link">
                  О проекте
                  <Icon />
                </Link>
              </div>
            </div>
            <ProjectFilm id="edcrm" placement="home" />
          </div>
        </div>
      </section>
      <AuthorProof />
      <section className={`wrap ${styles.moreProjects}`}>
        <div className={styles.rule}>
          <p className="eyebrow">Другие рабочие сценарии</p>
          <span />
        </div>
        <div className={styles.projectPair}>
          {projectFilms
            .filter((p) => ["rehab", "english-lab"].includes(p.id))
            .map((p) => (
              <article key={p.id}>
                <ProjectFilm id={p.id} placement="home" />
                <p className="eyebrow">
                  {p.id === "rehab"
                    ? "Размещение и расписание"
                    : "Образование и материалы"}
                </p>
                <h2>{p.title}</h2>
                <p>{p.line}</p>
                <div className="actions">
                  <ProjectViewer
                    id={p.id}
                    title={p.line}
                    className="text-link"
                  />
                  <Link href={`/cases/${p.id}`} className="subtle-link">
                    О проекте
                    <Icon />
                  </Link>
                </div>
              </article>
            ))}
        </div>
      </section>
      <section className={styles.restaurant}>
        <div className={`wrap ${styles.restaurantGrid}`}>
          <div className="hero-device">
            <PhoneScene interactive />
          </div>
          <div>
            <p className="eyebrow">Гостевой сервис · интерактивное меню</p>
            <h2>
              Продукт, который
              <br />
              <em>можно потрогать.</em>
            </h2>
            <p>
              Листайте разделы, знакомьтесь с блюдами и собирайте свой выбор.
              Внутри телефона — работающее меню.
            </p>
            <div className="actions">
              <ProjectViewer
                id="gastro"
                title="Интерактивное меню для ресторана"
                label="Открыть меню"
                className="button"
              />
              <Link href="/cases/gastro" className="text-link">
                Видео и подробности
                <Icon />
              </Link>
            </div>
            <p className={styles.caption}>
              Нажмите «Управлять меню», чтобы попробовать прямо в телефоне.
            </p>
          </div>
        </div>
      </section>
      <PracticeObject />
      <section className={`wrap ${styles.closing}`}>
        <p className="eyebrow">Разработка · обучение · выступления</p>
        <Link href="/contact">
          Что хотите изменить
          <br />в своей работе?
          <Icon size={56} />
        </Link>
        <p>
          Расскажите о процессе, команде или мероприятии. Начнём с одного
          понятного шага.
        </p>
      </section>
    </>
  );
}
