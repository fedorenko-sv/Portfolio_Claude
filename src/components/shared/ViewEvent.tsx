"use client";
import { useEffect, useRef } from "react";
import { track } from "@/lib/analytics";
export default function ViewEvent({
  event,
  id,
}: {
  event: string;
  id: string;
}) {
  const seen = useRef("");
  useEffect(() => {
    const key = `${event}:${id}`;
    if (seen.current !== key) {
      seen.current = key;
      track(event, { id });
    }
  }, [event, id]);
  return null;
}
