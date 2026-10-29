"use client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import type { WorkroomController } from "./workroom-renderer";
import styles from "./Workroom.module.css";
const fallback = [
  "/media/projects/edcrm-result.webp",
  "/images/practice-folder-v2.png",
  "/images/author/speaking.webp",
];
export default function WorkroomScene({ active }: { active: number }) {
  const host = useRef<HTMLDivElement>(null),
    controller = useRef<WorkroomController | null>(null);
  const selection = useRef(active);
  const [ready, setReady] = useState(false);
  useEffect(() => {
    selection.current = active;
    controller.current?.select(active);
  }, [active]);
  useEffect(() => {
    const node = host.current;
    if (!node) return;
    let disposed = false,
      started = false,
      inView = false;
    const reduced = matchMedia("(prefers-reduced-motion: reduce)");
    const motion = () => controller.current?.motion(reduced.matches);
    reduced.addEventListener("change", motion);
    const connection = (
      navigator as Navigator & { connection?: { saveData?: boolean } }
    ).connection;
    const lost = (event: Event) => {
      event.preventDefault();
      controller.current?.visible(false);
      setReady(false);
    };
    node.addEventListener("webglcontextlost", lost, true);
    const observer = new IntersectionObserver(
      async (entries) => {
        inView = entries[0].isIntersecting;
        controller.current?.visible(inView);
        if (!inView || started || connection?.saveData) return;
        started = true;
        try {
          const { createWorkroom } = await import("./workroom-renderer");
          if (disposed) return;
          controller.current = createWorkroom(
            node,
            selection.current,
            reduced.matches,
          );
          controller.current.visible(inView);
          setReady(true);
        } catch {
          if (!disposed) setReady(false);
        }
      },
      { rootMargin: "80px" },
    );
    observer.observe(node);
    return () => {
      disposed = true;
      observer.disconnect();
      reduced.removeEventListener("change", motion);
      node.removeEventListener("webglcontextlost", lost, true);
      controller.current?.dispose();
      controller.current = null;
    };
  }, []);
  return (
    <div className={styles.scene}>
      <div className={`${styles.fallback} ${ready ? styles.hidden : ""}`}>
        <Image
          src={fallback[active]}
          width={1000}
          height={700}
          alt=""
          sizes="(max-width:760px) 95vw,60vw"
        />
      </div>
      <div
        className={styles.canvas}
        style={{ visibility: ready ? "visible" : "hidden" }}
        ref={host}
        aria-hidden="true"
      />
      <span className={styles.stageCaption}>Экран. Папка. Микрофон.</span>
    </div>
  );
}
