"use client";
import { useEffect, useState } from "react";
import { resolveStart } from "@/lib/deeplinks";
export default function LaunchNotice() {
  const [unknown, setUnknown] = useState(false);
  useEffect(() => {
    const id = new URLSearchParams(window.location.search).get(
      "tgWebAppStartParam",
    );
    // Query is only used as an allowlisted content identifier, never as identity.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setUnknown(Boolean(id && resolveStart(id) === "/app"));
  }, []);
  return unknown ? (
    <p className="note-panel" role="status">
      Такой раздел не найден. Выберите практику или материал ниже.
    </p>
  ) : null;
}
