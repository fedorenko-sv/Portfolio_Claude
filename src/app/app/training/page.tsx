import { Intro, ProgramCards } from "@/components/site/Content";
export default function Page() {
  return (
    <>
      <Intro label="Занятия и программы" title="Практика ИИ для команды" />
      <ProgramCards base="/app/training" />
    </>
  );
}
