import { Intro, CaseCards } from "@/components/site/Content";
export default function Page() {
  return (
    <>
      <Intro
        label="Проекты и сценарии"
        title="Цифровые инструменты под задачу"
      />
      <CaseCards base="/app/solutions" />
    </>
  );
}
