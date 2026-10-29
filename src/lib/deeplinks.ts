const destinations: Record<string, string> = {
  "check-answer": "/app/practice/check-answer",
  "process-map": "/app/guides/process-map",
  "task-brief": "/app/guides/task-brief",
  "team-session": "/app/guides/team-session",
  "agent-boundaries": "/app/guides/agent-boundaries",
  "first-ai-task": "/app/practice/first-ai-task",
  "first-automation": "/app/materials/first-automation",
  "verify-ai": "/app/materials/verify-ai",
  "crm-checklist": "/app/materials/crm-checklist",
  edcrm: "/app/solutions/edcrm",
  rehab: "/app/solutions/rehab",
  gastro: "/app/solutions/gastro",
  "english-lab": "/app/solutions/english-lab",
  library: "/app/library",
  training: "/app/training",
  speaking: "/app/speaking",
  contact: "/app/contact",
};
export function resolveStart(id: string | null | undefined): string {
  return id && Object.hasOwn(destinations, id) ? destinations[id] : "/app";
}
// The username is public configuration, never a bot token. Unknown input stays local.
export function miniAppLink(
  username: string | undefined,
  start = "home",
): string {
  const bot = username?.replace(/^@/, "");
  const destination = resolveStart(start);
  if (!bot || bot.length > 32 || !/^[a-z][a-z0-9_]{1,28}bot$/i.test(bot))
    return destination;
  return `https://t.me/${bot}?startapp=${encodeURIComponent(destination === "/app" ? "home" : start)}`;
}
