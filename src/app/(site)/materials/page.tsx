import { Intro, MaterialCards } from "@/components/site/Content";
export const metadata = {
  title: "Материалы",
  alternates: { canonical: "/materials" },
};
export default function Page() {
  return (
    <>
      <Intro
        label="Открытая библиотека"
        title="Материалы, которые можно применить"
      >
        <p>
          Три памятки для начала: выбрать задачу, проверить ответ ИИ, описать
          процесс перед внедрением CRM.
        </p>
      </Intro>
      <MaterialCards />
    </>
  );
}
