import Link from "next/link";
import Image from "next/image";
import {
  CaseCards,
  ContactBand,
  MaterialCards,
} from "@/components/site/Content";
import PhoneScene from "@/components/site/PhoneScene";
import ProjectViewer from "@/components/site/ProjectViewer";
import Icon from "@/components/site/Icon";

export const metadata = { alternates: { canonical: "/" } };
export default function Home() {
  return (
    <>
      <section className="home-hero theme-dark">
        <div className="wrap">
          <div className="hero-meta">
            <p className="eyebrow">
              Разработка · ИИ в работе · Обучение команд
            </p>
            <span>Липецк · очно и онлайн</span>
          </div>
          <h1>
            Создаю цифровые
            <br className="desktop-break" /> инструменты.
            <Icon size={64} />
          </h1>
          <div className="home-hero-bottom">
            <div className="hero-device">
              <PhoneScene />
              <div className="device-caption">
                <p>Меню для ресторана</p>
                <ProjectViewer
                  id="gastro"
                  title="Интерактивное меню для ресторана"
                  className="text-link"
                />
              </div>
            </div>
            <div className="hero-author">
              <h2>
                Я Сергей.
                <br />
                Разработчик
                <br className="author-break" /> и преподаватель.
              </h2>
              <p>
                Обучаю команды работать с ИИ
                <br className="desktop-break" /> и создаю продукты под рабочую
                задачу.
              </p>
              <div className="actions">
                <Link href="/contact" className="button">
                  Обсудить задачу
                  <Icon />
                </Link>
                <Link href="/training" className="text-link">
                  Выбрать обучение
                  <Icon />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="home-projects section-light">
        <div className="wrap">
          <div className="section-rule">
            <p className="eyebrow">От задачи к решению</p>
            <span />
          </div>
          <div className="section-title-row">
            <h2>
              Инструменты
              <br />
              для рабочей жизни.
            </h2>
            <Link href="/cases" className="text-link">
              Все проекты
              <Icon />
            </Link>
          </div>
          <CaseCards />
        </div>
      </section>
      <section className="approach-section theme-dark" id="about">
        <div className="wrap approach-layout">
          <div>
            <p className="eyebrow">О моей практике</p>
            <h2>
              Начинаем с того,
              <br />
              как устроена работа.
            </h2>
            <p>
              Я совмещаю разработку цифровых продуктов и преподавание
              практического применения ИИ. Сначала разбираемся в задаче, затем
              собираем понятный сценарий и проверяем его на практике.
            </p>
            <Link href="/speaking" className="text-link">
              Обучение и выступления
              <Icon />
            </Link>
          </div>
          <ol className="approach-steps">
            {[
              [
                "Задача",
                "Что должно измениться для человека, который делает эту работу.",
              ],
              ["Сценарий", "Какие действия и данные нужно связать."],
              ["Проверка", "По каким признакам понятно, что решение помогает."],
            ].map(([title, text], i) => (
              <li key={title}>
                <span>0{i + 1}</span>
                <div>
                  <h3>{title}</h3>
                  <p>{text}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>
      <section className="practice-feature theme-cherry">
        <div className="wrap practice-feature-inner">
          <div>
            <p className="eyebrow">Бесплатная практика</p>
            <h2>
              Попробуем
              <br />
              на вашей задаче.
            </h2>
            <p>
              Короткое упражнение: от исходных данных
              <br className="desktop-break" /> до результата и способа проверки.
            </p>
            <Link href="/practice/first-ai-task" className="button">
              Начать практику
              <Icon />
            </Link>
          </div>
          <Image
            src="/images/practice-folder.png"
            alt=""
            width={1536}
            height={1024}
            className="practice-object"
          />
        </div>
      </section>
      <section className="home-materials wrap">
        <div className="section-rule">
          <p className="eyebrow">Открытая библиотека</p>
          <span />
        </div>
        <h2>Перед первым шагом.</h2>
        <MaterialCards />
      </section>
      <ContactBand />
    </>
  );
}
