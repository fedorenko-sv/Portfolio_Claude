import { catalogFor } from "./catalog";
import { projectFilms } from "./media";
import { pocketGuides } from "./pocket-guides";
import type { LibraryEntry } from "@/lib/library";
export function miniappLibrary(): LibraryEntry[] {
  const catalog = catalogFor();
  return [
    {
      id: "practice:check-answer",
      title: "Найдите догадку в ответе ИИ",
      summary:
        "Три учебных примера: выдуманная конкретика, неподтверждённое условие и слишком широкий вывод.",
      kind: "practice",
      href: "/app/practice/check-answer",
    },
    {
      id: "practice:first-ai-task",
      title: "Первая рабочая задача для ИИ",
      summary:
        "Сформулируйте данные, результат и способ проверки. В конце — ваша карточка задачи.",
      kind: "practice",
      href: "/app/practice/first-ai-task",
    },
    ...pocketGuides.map((g) => ({
      id: `guide:${g.slug}`,
      title: g.title,
      summary: g.subtitle,
      kind: "material" as const,
      href: `/app/guides/${g.slug}`,
    })),
    ...catalog.materials.map((m) => ({
      id: `material:${m.id}`,
      title: m.title,
      summary: m.summary,
      kind: "material" as const,
      href: `/app/materials/${m.slug}`,
    })),
    ...catalog.cases.map((c) => ({
      id: `project:${c.id}`,
      title: c.title,
      summary: c.summary,
      kind: "project" as const,
      href: `/app/solutions/${c.slug}`,
      image: projectFilms.find((f) => f.id === c.id)?.poster,
    })),
  ];
}
