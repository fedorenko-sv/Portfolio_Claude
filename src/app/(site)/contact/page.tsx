import { Intro } from "@/components/site/Content";
import Contact from "@/components/Contact";
export const metadata = {
  title: "Контакт",
  alternates: { canonical: "/contact" },
};
export default function Page() {
  return (
    <>
      <Intro label="Личная связь" title="С какой задачей вы пришли?">
        <p>
          Выберите тему и напишите напрямую. Начнём с процесса, аудитории и
          желаемого результата.
        </p>
      </Intro>
      <Contact />
    </>
  );
}
