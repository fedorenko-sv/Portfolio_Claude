import { Intro, CaseCards } from "@/components/site/Content";
export const metadata = {
  title: "Проекты",
  alternates: { canonical: "/cases" },
};
export default function Page() {
  return (
    <>
      <Intro label="Цифровые продукты" title="Инструменты для реальной работы.">
        <p>
          Проекты для образования, размещения гостей и ресторанного сервиса.
          Посмотрите, как устроен каждый сценарий — от первого действия до
          результата.
        </p>
      </Intro>
      <CaseCards />
    </>
  );
}
