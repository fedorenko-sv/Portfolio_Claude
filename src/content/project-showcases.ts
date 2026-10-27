export type Showcase = {
  id: string;
  url: string;
  mode: "embedded" | "external";
  format: "phone" | "wide";
  context: string;
  accessNote?: string;
};

// Curated destinations only. Never accept iframe URLs from query parameters.
export const showcases: Showcase[] = [
  {
    id: "edcrm",
    url: "https://robotics-crm.vercel.app/",
    mode: "external",
    format: "wide",
    context: "Образовательный центр: от заявки до занятия и счёта.",
    accessNote:
      "По этой ссылке открыт сайт центра. Рабочее место сотрудника требует отдельного входа.",
  },
  {
    id: "rehab",
    url: "https://rehab-inpatient-demo.vercel.app/bookings",
    mode: "embedded",
    format: "wide",
    context:
      "Открытая версия с тестовым сценарием бронирования. Её состав отличается от описанной актуальной версии проекта.",
  },
  {
    id: "english-lab",
    url: "https://english-lab-peach.vercel.app/admin",
    mode: "external",
    format: "wide",
    context: "Интерактивные уроки, ответы учеников и личная библиотека лекций.",
    accessNote:
      "Кабинет преподавателя открывается отдельно и требует входа. Личные материалы доступны только владельцу.",
  },
  {
    id: "gastro",
    url: "https://gastro-vibe-2wvv-git-margarita-pilot-thuys-projects-df10afab.vercel.app/",
    mode: "external",
    format: "phone",
    context: "Меню, визуальные подборки и свой список выбранных блюд.",
    accessNote:
      "Ресторанное меню открывается по ссылке проекта. Для этой версии может потребоваться доступ Vercel.",
  },
];

export function showcaseFor(id: string): Showcase | undefined {
  return showcases.find((item) => item.id === id);
}

export function canEmbed(item: Showcase | undefined): boolean {
  return item?.mode === "embedded";
}
