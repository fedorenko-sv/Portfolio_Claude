export type Showcase = {
  id: string;
  url: string;
  mode: "embedded";
  format: "phone" | "wide";
  context: string;
  sourceCommit: string;
};
export const showcases: Showcase[] = [
  {
    id: "edcrm",
    url: "/showcase/crm/index.html#/crm/leads",
    mode: "embedded",
    format: "wide",
    context:
      "Рабочее место администратора образовательного центра. Пример с учебными данными.",
    sourceCommit: "7702fd48e07a6db2d1fd6fbdc0475ef450abafb6",
  },
  {
    id: "rehab",
    url: "/showcase/rehab/index.html#/bookings",
    mode: "embedded",
    format: "wide",
    context:
      "Бронирование, размещение и сопровождение гостей. Учебный сценарий в пределах этого просмотра.",
    sourceCommit: "e553e9d47b982a07ee99e5f750f6ceb6e559f591",
  },
  {
    id: "english-lab",
    url: "/showcase/lessons/index.html",
    mode: "embedded",
    format: "wide",
    context:
      "Проведите учебное занятие, ответьте на вопросы и посмотрите результат со стороны преподавателя.",
    sourceCommit: "e76d4b0a5abaaf908f0a45911a4cf71241f7f316",
  },
  {
    id: "gastro",
    url: "/showcase/menu/index.html",
    mode: "embedded",
    format: "phone",
    context: "Настоящее меню: разделы, блюда и свой список выбранных позиций.",
    sourceCommit: "a10f09be551c8b892cecd2df28a60f606a424442",
  },
];
export function showcaseFor(id: string) {
  return showcases.find((s) => s.id === id);
}
export function canEmbed(item: Showcase | undefined) {
  return item?.mode === "embedded";
}
