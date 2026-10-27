import Link from "next/link";
import Image from "next/image";
import { ProgramCards } from "@/components/site/Content";
import Icon from "@/components/site/Icon";
export const metadata = {
  title: "Курсы и обучение",
  alternates: { canonical: "/training" },
};
export default function Page() {
  return (
    <>
      <section className="page-hero training-hero theme-dark">
        <div className="wrap page-hero-inner">
          <div className="page-hero-copy">
            <p className="eyebrow">Практика ИИ / для себя и команды</p>
            <h1>
              Учиться ИИ.
              <br />
              Применять
              <br />в своей работе.
            </h1>
            <p className="lead">
              Практические занятия для специалистов, руководителей и команд.
            </p>
            <div className="actions">
              <a href="#programs" className="button">
                Подобрать программу
                <Icon />
              </a>
              <Link href="/practice/first-ai-task" className="text-link">
                Начать с бесплатной практики
                <Icon />
              </Link>
            </div>
            <p className="hero-small">Очно и онлайн · формат по запросу</p>
          </div>
          <Image
            src="/images/practice-folder.png"
            alt="Вишнёвая папка «Практика ИИ» и рабочий лист: задача, данные, результат, проверка"
            width={1536}
            height={1024}
            className="training-object"
            priority
          />
        </div>
      </section>
      <section id="programs" className="catalog-section wrap">
        <div className="section-rule">
          <p className="eyebrow">Программы</p>
          <span />
        </div>
        <h2>Выберите свою задачу.</h2>
        <ProgramCards />
      </section>
      <section className="training-team theme-cherry">
        <div className="wrap training-team-inner">
          <h2>
            Разберём
            <br />
            задачи вашей команды.
          </h2>
          <div>
            <p>
              Выберем рабочие примеры, подходящий формат и способ проверки
              результата.
            </p>
            <Link href="/contact?type=training" className="button">
              Обсудить обучение
              <Icon />
            </Link>
            <div>
              <Link href="/practice/first-ai-task" className="text-link">
                Бесплатная практика
                <Icon />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
