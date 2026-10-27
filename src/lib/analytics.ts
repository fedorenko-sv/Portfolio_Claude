const events = [
  "program_view",
  "case_view",
  "demo_open",
  "practice_start",
  "practice_complete",
  "contact_click",
  "lead_submitted",
];
const sources = ["direct", "website", "telegram", "channel", "training"];
const ids = [
  "first-ai-task",
  "first-automation",
  "verify-ai",
  "crm-checklist",
  "edcrm",
  "rehab",
  "gastro",
  "english-lab",
  "everyday-ai",
  "agents",
  "team-ai",
  "contact",
];
export function eventPayload(
  event: string,
  values: Record<string, unknown> = {},
) {
  if (!events.includes(event)) return null;
  return {
    event,
    ...(typeof values.id === "string" && ids.includes(values.id)
      ? { id: values.id }
      : {}),
    source:
      typeof values.source === "string" && sources.includes(values.source)
        ? values.source
        : "direct",
  };
}
export function track(event: string, values: Record<string, unknown> = {}) {
  const detail = eventPayload(event, values);
  if (detail && typeof window !== "undefined")
    window.dispatchEvent(new CustomEvent("fedorenko:analytics", { detail }));
}
