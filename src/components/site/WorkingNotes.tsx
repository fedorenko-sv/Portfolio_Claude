import Link from "next/link";
import Icon from "./Icon";
import styles from "./Experiences.module.css";
const notes = [
  {
    label: "Продукт",
    title: "Куда нажать — понятно.",
    text: "Интерфейс должен отвечать на вопросы человека: где я сейчас, что уже произошло и что делать дальше.",
    checks: [
      "У действия есть видимый результат",
      "Ошибка объясняет, как её исправить",
      "Процесс можно пройти с телефона",
    ],
    href: "/cases",
    action: "Посмотреть в проектах",
  },
  {
    label: "Обучение",
    title: "Можно повторить самому.",
    text: "Ценность занятия — в самостоятельной попытке. Объяснение превращается в опыт, когда участник пробует и проверяет результат.",
    checks: [
      "Есть задача и исходные данные",
      "Хватает времени на попытку",
      "Понятно, как проверить ответ",
    ],
    href: "/training",
    action: "Попробовать упражнение",
  },
  {
    label: "Выступление",
    title: "Есть о чём поговорить.",
    text: "Хорошая демонстрация даёт аудитории точку входа: узнать свою задачу, задать вопрос и увидеть возможный следующий шаг.",
    checks: [
      "Пример понятен без специальной подготовки",
      "Инструмент видно в действии",
      "Есть место для вопросов",
    ],
    href: "/speaking",
    action: "Посмотреть темы",
  },
];
export default function WorkingNotes() {
  return (
    <section className={styles.notes} aria-labelledby="notes-heading">
      <div className="wrap">
        <div className={styles.sectionHead}>
          <div>
            <p className={styles.eyebrow}>Заметки о работе</p>
            <h2 id="notes-heading">
              Что для меня
              <br />
              <span>значит «готово».</span>
            </h2>
          </div>
          <p>
            Три простых критерия, к которым я возвращаюсь. Откройте заметку —
            внутри то, что я считаю важным в результате.
          </p>
        </div>
        <div className={styles.noteGrid}>
          {notes.map((note, i) => (
            <details className={styles.foldedNote} key={note.label}>
              <summary>
                <span>{note.label}</span>
                <h3>{note.title}</h3>
                <div className={styles.noteDrawing} aria-hidden="true">
                  {i === 0 ? (
                    <>
                      <i />
                      <i />
                      <i />
                    </>
                  ) : i === 1 ? (
                    <>
                      <b>?</b>
                      <b>→</b>
                      <b>✓</b>
                    </>
                  ) : (
                    <>
                      <em />
                      <em />
                      <em />
                      <em />
                      <em />
                    </>
                  )}
                </div>
                <small>
                  Развернуть заметку <span>+</span>
                </small>
              </summary>
              <div className={styles.noteInside}>
                <p>{note.text}</p>
                <ul>
                  {note.checks.map((check) => (
                    <li key={check}>
                      <Icon name="check" size={17} />
                      {check}
                    </li>
                  ))}
                </ul>
                <Link href={note.href}>
                  {note.action}
                  <Icon />
                </Link>
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
