import test from "node:test";
import assert from "node:assert/strict";
import * as bot from "../src/lib/bot.ts";
test("start and help offer HTTPS Mini App without collecting identity", () => {
  assert.equal(typeof bot.replyFor, "function");
  const reply = bot.replyFor("/start", "https://example.test");
  assert.equal(
    reply.reply_markup.inline_keyboard[0][0].web_app.url,
    "https://example.test/app",
  );
  assert.match(
    bot.replyFor("/help", "https://example.test").text,
    /устройстве/,
  );
});
test("unknown commands are ignored and unsafe app origins rejected", () => {
  assert.equal(typeof bot.replyFor, "function");
  assert.equal(bot.replyFor("hello", "https://example.test"), null);
  assert.throws(() => bot.replyFor("/start", "http://example.test"), /HTTPS/);
});
