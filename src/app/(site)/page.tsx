import Link from "next/link";
import Image from "next/image";
import { catalogFor } from "@/content/catalog";
import PhoneScene from "@/components/site/PhoneScene";
import ProjectViewer from "@/components/site/ProjectViewer";
import Icon from "@/components/site/Icon";
export const metadata = { alternates: { canonical: "/" } };
export default function Home() {
  return (
    <>
      <section className="home-hero theme-dark">
        <div className="wrap">
          <h1>
            Создаю цифровые
            <br className="desktop-break" /> инструменты.
            <Icon size={64} />
          </h1>
          <div className="home-hero-bottom">
            <div className="hero-device">
              <PhoneScene interactive />
              <div className="device-caption">
                <p>Меню для ресторана</p>
                <ProjectViewer
                  id="gastro"
                  title="Интерактивное меню для ресторана"
                  className="text-link"
                  label="Открыть меню"
                />
              </div>
            </div>
            <div className="hero-author" id="about">
              <h2>
                Я Сергей. Разработчик
                <br className="desktop-break" /> и преподаватель.
              </h2>
              <p>
                Обучаю команды применять ИИ
                <br className="desktop-break" /> и создаю продукты под рабочую
                задачу.
              </p>
              <div className="actions">
                <Link href="/contact" className="button">
                  Обсудить задачу
                  <Icon />
                </Link>
                <Link href="/cases" className="text-link">
                  Смотреть проекты
                  <Icon />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="home-selection">
        <div className="wrap">
          <div className="section-rule">
            <p className="eyebrow">От задачи к решению</p>
            <span />
            <Link href="/cases" className="subtle-link">
              Все проекты
              <Icon />
            </Link>
          </div>
          <div className="selection-grid">
            {catalogFor().cases.map((p) => (
              <article key={p.id}>
                <ProjectViewer id={p.id} title={p.title} preview />
                <p className="eyebrow">{p.audience.split("·")[0]}</p>
                <h2>
                  <Link href={"/cases/" + p.slug}>{p.title}</Link>
                </h2>
                <div className="selection-journey">
                  {p.journey.slice(0, 3).map((s, j) => (
                    <span key={s}>
                      {j > 0 && <Icon name="right" size={20} />} {s}
                    </span>
                  ))}
                </div>
                <div className="actions">
                  <ProjectViewer
                    id={p.id}
                    title={p.title}
                    className="text-link"
                  />
                  <Link href={"/cases/" + p.slug} className="subtle-link">
                    О проекте
                    <Icon />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
      <section className="practice-feature theme-dark">
        <div className="wrap practice-feature-inner">
          <div>
            <h2>
              Попробуем
              <br />
              на вашей задаче.
            </h2>
            <p>
              Практическое упражнение: от исходных
              <br className="desktop-break" /> данных до проверки результата.
            </p>
            <Link className="button" href="/practice/first-ai-task">
              Пройти практику
              <Icon />
            </Link>
          </div>
          <Image
            src="/images/practice-folder-v2.png"
            alt=""
            width={1280}
            height={1280}
            className="practice-object"
          />
        </div>
      </section>
      <section className="home-closing theme-dark">
        <div className="wrap">
          <Link href="/contact">
            Есть задача? Давайте обсудим.
            <Icon size={62} />
          </Link>
          <Link href="/materials" className="subtle-link">
            Материалы для первого шага
            <Icon />
          </Link>
        </div>
      </section>
    </>
  );
}
