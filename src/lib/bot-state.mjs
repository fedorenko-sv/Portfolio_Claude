import { DatabaseSync } from "node:sqlite";
export function openBotState(path) {
  const db = new DatabaseSync(path);
  db.exec(
    "PRAGMA journal_mode=WAL; CREATE TABLE IF NOT EXISTS processed_updates (id INTEGER PRIMARY KEY, state TEXT NOT NULL, created_at INTEGER NOT NULL);",
  );
  const claim = db.prepare(
    "INSERT OR IGNORE INTO processed_updates VALUES (?, 'claimed', ?)",
  );
  const finish = db.prepare(
    "UPDATE processed_updates SET state = ? WHERE id = ?",
  );
  return {
    claim(id) {
      if (!Number.isSafeInteger(id)) throw new Error("Invalid update ID");
      return Number(claim.run(id, Date.now()).changes) === 1;
    },
    finish(id, state) {
      if (!["sent", "ignored", "delivery_unknown"].includes(state))
        throw new Error("Invalid state");
      finish.run(state, id);
    },
    nextOffset() {
      return Number(
        db
          .prepare(
            "SELECT COALESCE(MAX(id), -1) + 1 AS next FROM processed_updates",
          )
          .get().next,
      );
    },
    close() {
      db.close();
    },
  };
}
