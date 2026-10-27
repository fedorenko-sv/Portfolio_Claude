// Separate long-running process. Never execute in a serverless function.
import { openBotState } from "../src/lib/bot-state.mjs";
import { replyFor } from "../src/lib/bot.ts";
const token = process.env.TELEGRAM_BOT_TOKEN;
const site = process.env.SITE_URL;
const dbPath = process.env.BOT_STATE_PATH;
if (!token || !site || !dbPath)
  throw new Error(
    "Set TELEGRAM_BOT_TOKEN, SITE_URL and BOT_STATE_PATH through a secret manager.",
  );
replyFor("/start", site);
const state = openBotState(dbPath);
async function api(method, body) {
  const response = await fetch(
    `https://api.telegram.org/bot${token}/${method}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
      signal: AbortSignal.timeout(40000),
    },
  );
  const data = await response.json();
  if (!response.ok || !data.ok)
    throw new Error("Telegram request failed; details intentionally omitted.");
  return data.result;
}
let offset = state.nextOffset();
let running = true;
process.once("SIGINT", () => {
  running = false;
});
process.once("SIGTERM", () => {
  running = false;
});
while (running) {
  try {
    const updates = await api("getUpdates", {
      offset,
      timeout: 25,
      allowed_updates: ["message"],
    });
    for (const update of updates) {
      if (!Number.isSafeInteger(update.update_id)) continue;
      const inserted = state.claim(update.update_id);
      offset = Math.max(offset, update.update_id + 1);
      if (!inserted) continue;
      const message = update.message;
      const reply =
        typeof message?.text === "string" && message.chat?.type === "private"
          ? replyFor(message.text, site)
          : null;
      if (!reply) {
        state.finish(update.update_id, "ignored");
        continue;
      }
      try {
        await api("sendMessage", { chat_id: message.chat.id, ...reply });
        state.finish(update.update_id, "sent");
      } catch {
        // Ambiguous delivery is never retried automatically: prevents duplicate replies.
        state.finish(update.update_id, "delivery_unknown");
        console.error("Reply delivery unknown; user may issue /start again.");
      }
    }
  } catch {
    console.error(
      "Polling unavailable; retrying without logging payloads or credentials.",
    );
    await new Promise((resolve) => setTimeout(resolve, 5000));
  }
}
state.close();
