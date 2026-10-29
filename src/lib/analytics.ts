const events = [
  "program_view",
  "case_view",
  "demo_open",
  "practice_start",
  "practice_complete",
  "contact_click",
  "lead_submitted",
  "service_select",
  "video_play",
  "video_complete",
  "showcase_open",
  "contact_template_copy",
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
    ...(typeof values.topic === "string" &&
    ["training", "speaking", "development", "automation"].includes(values.topic)
      ? { topic: values.topic }
      : {}),
    ...(typeof values.placement === "string" &&
    ["home", "training", "speaking", "cases", "contact", "solutions"].includes(
      values.placement,
    )
      ? { placement: values.placement }
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
