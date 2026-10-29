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
      touchTimer = 0,
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
    const leave = (event: PointerEvent) => {
      if (event.pointerType === "touch") return;
      cancelAnimationFrame(frame);
      frame = 0;
      node.style.transform = "translate(0,0)";
    };
    const touch = (event: PointerEvent) => {
      if (event.pointerType !== "touch" || reduce.matches) return;
      clearTimeout(touchTimer);
      const rect = host.getBoundingClientRect();
      node.style.transform = `translate(${event.clientX - rect.left - rect.width / 2}px, ${event.clientY - rect.top - rect.height / 2}px)`;
      node.style.opacity = "0.85";
      touchTimer = window.setTimeout(() => {
        node.style.opacity = "";
      }, 900);
    };
    host.addEventListener("pointerdown", touch, { passive: true });
    host.addEventListener("pointermove", move);
    host.addEventListener("pointerleave", leave);
    return () => {
      cancelAnimationFrame(frame);
      clearTimeout(touchTimer);
      host.removeEventListener("pointerdown", touch);
      host.removeEventListener("pointermove", move);
      host.removeEventListener("pointerleave", leave);
    };
  }, []);
  return <span className="surface-light" aria-hidden ref={light} />;
}
