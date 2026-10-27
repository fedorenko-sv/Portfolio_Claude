import { CaseCards } from "@/components/site/Content";
import ProjectViewer from "@/components/site/ProjectViewer";
export const metadata = {
  title: "Проекты",
  alternates: { canonical: "/cases" },
};
export default function Page() {
  return (
    <>
      <section className="projects-hero theme-dark">
        <div className="wrap projects-hero-inner">
          <div>
            <p className="eyebrow">Цифровые продукты</p>
            <h1>Инструменты для реальной работы.</h1>
            <p className="projects-lead">
              От первого действия до результата. Проекты для образования,
              размещения гостей и ресторанного сервиса.
            </p>
            <a className="text-link" href="#projects">
              Посмотреть в работе ↓
            </a>
          </div>
          <ProjectViewer
            id="edcrm"
            title="CRM для образовательных центров"
            preview
          />
        </div>
      </section>
      <div id="projects" className="wrap projects-catalog">
        <CaseCards />
      </div>
    </>
  );
}
