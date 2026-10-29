export type LibraryKind = "practice" | "material" | "project";
export type LibraryEntry = {
  id: string;
  title: string;
  summary: string;
  kind: LibraryKind;
  href: string;
  image?: string;
};
export const SAVED_KEY = "fedorenko:library:v1";
export const SAVED_TTL = 30 * 86400000;
export const libraryLabels = {
  practice: "Практика",
  material: "Материалы",
  project: "Проекты",
} as const;
const normalize = (s: string) =>
  s.toLocaleLowerCase("ru").replaceAll("ё", "е").trim();
export function searchLibrary(
  entries: LibraryEntry[],
  query: string,
  kind: string,
  saved: string[] = [],
): LibraryEntry[] {
  const words = normalize(query.slice(0, 160)).split(/\s+/).filter(Boolean);
  return entries.filter(
    (e) =>
      (kind === "all" ||
        (kind === "saved" ? saved.includes(e.id) : e.kind === kind)) &&
      words.every((w) =>
        normalize(`${e.title} ${e.summary} ${libraryLabels[e.kind]}`).includes(
          w,
        ),
      ),
  );
}
export function readSaved(
  raw: string | null,
  allowed: string[],
  now = Date.now(),
): string[] {
  try {
    if (!raw || raw.length > 12000) return [];
    const value = JSON.parse(raw);
    if (
      value.version !== 1 ||
      !Number.isFinite(value.updatedAt) ||
      value.updatedAt > now ||
      now - value.updatedAt >= SAVED_TTL ||
      !Array.isArray(value.ids)
    )
      return [];
    return [
      ...new Set<string>(
        value.ids.filter(
          (id: unknown): id is string =>
            typeof id === "string" && allowed.includes(id),
        ),
      ),
    ].slice(0, 100);
  } catch {
    return [];
  }
}
