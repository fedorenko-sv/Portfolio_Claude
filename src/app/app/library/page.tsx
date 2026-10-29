import Library from "@/components/miniapp/Library";
import { miniappLibrary } from "@/content/miniapp";
import s from "@/components/miniapp/Pocket.module.css";
export const metadata = { title: "Библиотека практики" };
export default function Page() {
  return (
    <>
      <div className={s.pageIntro}>
        <p>Памятки, шаблоны и практика</p>
        <h1>
          Полезное.
          <br />
          На потом и на сейчас.
        </h1>
        <p>
          Найдите материал под задачу. Сохраните в избранное, чтобы вернуться к
          нему.
        </p>
      </div>
      <Library entries={miniappLibrary()} />
    </>
  );
}
