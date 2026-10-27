const destinations: Record<string, string> = {
  "first-ai-task": "/app/practice/first-ai-task",
  "first-automation": "/app/materials/first-automation",
  "verify-ai": "/app/materials/verify-ai",
  "crm-checklist": "/app/materials/crm-checklist",
  edcrm: "/app/solutions/edcrm",
  rehab: "/app/solutions/rehab",
  gastro: "/app/solutions/gastro",
  "english-lab": "/app/solutions/english-lab",
};
export function resolveStart(id: string | null | undefined): string {
  return id && Object.hasOwn(destinations, id) ? destinations[id] : "/app";
}
