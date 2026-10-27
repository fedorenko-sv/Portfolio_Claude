import { Intro, MaterialCards } from "@/components/site/Content";
export default function Page() {
  return (
    <>
      <Intro label="Открытая библиотека" title="Материалы для работы" />
      <MaterialCards base="/app/materials" />
    </>
  );
}
