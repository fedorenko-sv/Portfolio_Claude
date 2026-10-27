import { Intro, ProgramCards } from "@/components/site/Content";
export const metadata = {
  title: "Обучение",
  alternates: { canonical: "/training" },
};
export default function Page() {
  return (
    <>
      <Intro
        label="Практическое применение ИИ"
        title="Практические занятия по ИИ для команды."
      >
        <p>
          Занятия для специалистов, руководителей и команд: от выбора задачи до
          собственного результата с понятным способом проверки.
        </p>
      </Intro>
      <ProgramCards />
    </>
  );
}
