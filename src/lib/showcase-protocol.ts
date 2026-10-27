export function acceptsShowcaseMessage(
  event: { origin: string; source: unknown; data: unknown },
  frame: unknown,
  origin: string,
): boolean {
  if (!frame || event.source !== frame || event.origin !== origin) return false;
  const data = event.data;
  return (
    !!data &&
    typeof data === "object" &&
    "type" in data &&
    data.type === "showcase:ready" &&
    "version" in data &&
    data.version === 1
  );
}
