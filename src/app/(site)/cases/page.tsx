import { Intro, CaseCards } from "@/components/site/Content";
export const metadata = {
  title: "Проекты",
  alternates: { canonical: "/cases" },
};
export default function Page() {
  return (
    <>
      <Intro label="Цифровые продукты" title="Проекты и рабочие сценарии">
        <p>
          Задача, путь пользователя и границы реализации. Статус каждого проекта
          указан открыто.
        </p>
      </Intro>
      <CaseCards />
    </>
  );
}
