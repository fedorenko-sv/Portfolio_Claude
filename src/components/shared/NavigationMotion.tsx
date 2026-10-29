"use client";
import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

export default function NavigationMotion() {
  const path = usePathname();
  const previous = useRef(path);
  useEffect(() => {
    if (previous.current === path) return;
    previous.current = path;
    const main = document.getElementById("main");
    if (!main || matchMedia("(prefers-reduced-motion:reduce)").matches) return;
    // Preserve router focus/scroll, form state, fixed controls and semantic DOM.
    const animation = main.animate([{ opacity: 0.55 }, { opacity: 1 }], {
      duration: 200,
      easing: "cubic-bezier(0.23,1,0.32,1)",
    });
    return () => animation.cancel();
  }, [path]);
  return null;
}
