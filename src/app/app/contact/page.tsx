import Contact from "@/components/Contact";
import s from "@/components/miniapp/Pocket.module.css";
export const metadata = { title: "Обсудить задачу" };
export default function Page() {
  return (
    <>
      <header className={s.pageIntro}>
        <p>Лично Сергею</p>
        <h1>С чего начнём?</h1>
        <p>
          Расскажите о задаче. Шаблон поможет собрать главное — его можно
          изменить своими словами.
        </p>
      </header>
      <Contact />
    </>
  );
}
