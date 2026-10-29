"use client";
import { useEffect, useRef } from "react";

/** A surface-local reflection: one transform per frame, no React pointer state. */
export default function SurfaceLight() {
  const light = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    const node = light.current,
      host = node?.parentElement;
    if (!node || !host) return;
    const fine = matchMedia("(hover:hover) and (pointer:fine)");
    const reduce = matchMedia("(prefers-reduced-motion:reduce)");
    let frame = 0,
      x = 0,
      y = 0;
    const move = (event: PointerEvent) => {
      if (!fine.matches || reduce.matches) return;
      const rect = host.getBoundingClientRect();
      x = event.clientX - rect.left - rect.width / 2;
      y = event.clientY - rect.top - rect.height / 2;
      if (!frame)
        frame = requestAnimationFrame(() => {
          frame = 0;
          node.style.transform = `translate(${x}px, ${y}px)`;
        });
    };
    const leave = () => {
      cancelAnimationFrame(frame);
      frame = 0;
      node.style.transform = "translate(0,0)";
    };
    host.addEventListener("pointermove", move);
    host.addEventListener("pointerleave", leave);
    return () => {
      cancelAnimationFrame(frame);
      host.removeEventListener("pointermove", move);
      host.removeEventListener("pointerleave", leave);
    };
  }, []);
  return <span className="surface-light" aria-hidden ref={light} />;
}
