export type ProjectMedia = {
  id: string;
  title: string;
  line: string;
  poster: string;
  src: string;
  duration: string;
  steps: string[];
  description: string;
  portrait?: boolean;
};
export const projectFilms: ProjectMedia[] = [
  {
    id: "edcrm",
    title: "От заявки к ученику",
    line: "CRM для образовательных центров",
    poster: "/media/projects/edcrm-result.webp",
    src: "/media/projects/edcrm.mp4",
    duration: "24 сек",
    steps: ["Заявка", "Зачисление", "Карточка ученика"],
    description:
      "Зачисление из заявки и переход к списку учеников. Запись локальной версии на учебных данных.",
  },
  {
    id: "rehab",
    title: "От брони к размещению",
    line: "Система размещения и сопровождения гостей",
    poster: "/media/projects/rehab-summary.webp",
    src: "/media/projects/rehab.mp4",
    duration: "30 сек",
    steps: ["Данные гостя", "Размещение", "Расчёт"],
    description:
      "Оформление заявки, выбор размещения и расчёт перед сохранением. Запись локальной версии на учебных данных.",
  },
  {
    id: "english-lab",
    title: "Урок начинается с кода",
    line: "Платформа интерактивных уроков и лекций",
    poster: "/media/projects/english-lab-result.webp",
    src: "/media/projects/english-lab.mp4",
    duration: "26 сек",
    steps: ["Запуск", "Вход по коду", "Работа с уроком"],
    description:
      "Преподаватель запускает занятие, участник входит по коду и открывает урок. В записи — отдельная локальная версия платформы.",
  },
  {
    id: "gastro",
    title: "Меню, которое хочется листать",
    line: "Интерактивное меню для ресторана",
    poster: "/media/projects/gastro.webp",
    src: "/media/projects/gastro.mp4",
    duration: "12 сек",
    steps: ["Категория", "Блюда", "Выбор гостя"],
    portrait: true,
    description:
      "Переход между разделами меню. В записи — отдельная локальная версия с учебным набором блюд.",
  },
];
export function filmFor(id: string) {
  return projectFilms.find((f) => f.id === id);
}
