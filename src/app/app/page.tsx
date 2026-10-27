import Link from "next/link";
import { Intro } from "@/components/site/Content";
import LaunchNotice from "@/components/miniapp/LaunchNotice";
export default function Page() {
  return (
    <>
      <LaunchNotice />
      <Intro
        label="Начните с одной задачи"
        title="Меньше теории. Больше своей практики."
      >
        <p>
          Бесплатное упражнение, полезные памятки и примеры цифровых продуктов.
        </p>
      </Intro>
      <section className="note-panel">
        <p className="eyebrow">ПРАКТИКА / 01</p>
        <h2>Выберите первую задачу для ИИ</h2>
        <p>Составьте карточку: входные данные, результат и проверка.</p>
        <Link className="button" href="/app/practice/first-ai-task">
          Начать или продолжить ↗
        </Link>
        <p className="small">Прогресс на этом устройстве. Без регистрации.</p>
      </section>
      <div className="app-shortcuts">
        <Link href="/app/materials">
          Материалы <span>Три практических памятки ↗</span>
        </Link>
        <Link href="/app/training">
          Обучение <span>Форматы для команды ↗</span>
        </Link>
        <Link href="/app/solutions">
          Решения <span>Кейсы и границы реализации ↗</span>
        </Link>
      </div>
    </>
  );
}
