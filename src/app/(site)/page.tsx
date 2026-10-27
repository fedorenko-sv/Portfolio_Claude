import Link from "next/link";
import {
  CaseCards,
  ContactBand,
  MaterialCards,
} from "@/components/site/Content";
export const metadata = { alternates: { canonical: "/" } };
export default function Home() {
  return (
    <>
      <section className="hero">
        <div className="hero-meta">
          <p className="eyebrow">РАЗРАБОТКА · ИИ В РАБОТЕ · ОБУЧЕНИЕ КОМАНД</p>
          <span>Липецк · очно и онлайн</span>
        </div>
        <h1>
          <span className="hero-primary">
            Создаю цифровые
            <br className="hero-line" /> инструменты.
          </span>
          <span className="hero-secondary">
            Обучаю команды
            <br /> применять ИИ.
          </span>
        </h1>
        <div className="hero-bottom">
          <div className="author-note">
            <p>
              Я Сергей Федоренко.
              <br />
              Разработчик и преподаватель.
              <br />
              Липецк · работаю очно и онлайн.
            </p>
          </div>
          <div className="hero-description">
            <p>
              Разрабатываю сайты, CRM и платформы, провожу практические занятия
              по нейросетям и агентам. Помогаю пройти путь от рабочей задачи до
              проверенного решения.
            </p>
            <div className="actions">
              <Link href="/training" className="button">
                Обучить команду ↗
              </Link>
              <Link href="/contact" className="button secondary">
                Обсудить задачу ↗
              </Link>
            </div>
          </div>
        </div>
        <Link href="/cases" className="hero-foot">
          Посмотреть проекты <span aria-hidden="true">↓</span>
        </Link>
      </section>
      <section className="section">
        <div className="section-heading">
          <p className="eyebrow">С чего начнём</p>
          <h2>
            Что сейчас
            <br />
            мешает работе?
          </h2>
        </div>
        <div className="problem-grid">
          {[
            [
              "Заявки и договорённости теряются",
              "/solutions",
              "Выстроить путь от обращения до следующего шага",
            ],
            [
              "Команда пробует ИИ, но результат трудно проверить",
              "/training",
              "Научиться задавать критерии и проверять ответ",
            ],
            [
              "Процесс держится на таблицах и переписках",
              "/solutions",
              "Найти небольшой участок для автоматизации",
            ],
            [
              "Нужна собственная платформа или Mini App",
              "/cases",
              "Посмотреть продуктовые сценарии",
            ],
          ].map(([title, href, text]) => (
            <Link href={href} key={title} className="problem">
              <h3>{title}</h3>
              <p>{text}</p>
              <span aria-hidden="true">↗</span>
            </Link>
          ))}
        </div>
      </section>
      <section className="section">
        <div className="section-heading">
          <p className="eyebrow">Избранные проекты</p>
          <h2>
            Проекты для конкретных
            <br />
            рабочих задач.
          </h2>
          <Link href="/cases" className="text-link">
            Все проекты ↗
          </Link>
        </div>
        <CaseCards limit={3} />
        <p className="section-note">
          Образовательный маршрут:{" "}
          <Link href="/cases/english-lab">
            English Lab — урок, ответы и просмотр преподавателем ↗
          </Link>
        </p>
      </section>
      <section className="work-section section" id="about">
        <div>
          <p className="eyebrow">О моей практике</p>
          <h2>
            Начинаю с того,
            <br />
            как устроена работа.
          </h2>
          <p>
            Я совмещаю разработку цифровых продуктов и преподавание
            практического применения ИИ для бизнеса и организаций.
          </p>
          <Link className="text-link" href="/speaking">
            Обучение и выступления ↗
          </Link>
        </div>
        <ol className="work-list">
          <li>
            <span>Обучение</span>
            <h3>Попробовать на своей задаче</h3>
            <p>
              Практические занятия: постановка запроса, использование
              инструментов и проверка результата.
            </p>
          </li>
          <li>
            <span>Автоматизация</span>
            <h3>Начать с ограниченного участка</h3>
            <p>
              Разбираем процесс, выбираем границы и проверяем решение на пилоте.
            </p>
          </li>
          <li>
            <span>Разработка</span>
            <h3>Собрать нужный сценарий</h3>
            <p>Сайты, CRM и платформы под конкретный сценарий работы.</p>
          </li>
        </ol>
      </section>
      <section className="practice-band">
        <div>
          <p className="eyebrow">БЕСПЛАТНАЯ ПРАКТИКА</p>
          <h2>
            Выберите первую
            <br />
            задачу для ИИ.
          </h2>
          <p>
            Короткое упражнение → карточка задачи: исходные данные, ожидаемый
            результат и способ проверки.
          </p>
          <Link className="button" href="/practice/first-ai-task">
            Пройти практику ↗
          </Link>
        </div>
        <div className="practice-illustration" aria-hidden="true">
          <span>01 / ИСХОДНЫЕ ДАННЫЕ</span>
          <span>02 / ОЖИДАЕМЫЙ РЕЗУЛЬТАТ</span>
          <span>03 / СПОСОБ ПРОВЕРКИ</span>
          <strong>
            Ваша первая
            <br />
            рабочая задача.
          </strong>
          <small>Без регистрации · на вашем устройстве</small>
        </div>
      </section>
      <section className="section">
        <div className="section-heading">
          <p className="eyebrow">Открытая библиотека</p>
          <h2>
            Что стоит знать
            <br />
            перед началом.
          </h2>
        </div>
        <MaterialCards />
      </section>
      <ContactBand />
    </>
  );
}
