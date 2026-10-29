"use client";
import { track } from "@/lib/analytics";
export default function TrackedLink({
  href,
  children,
  className,
  id = "contact",
  event = "contact_click",
  topic,
  placement,
}: {
  topic?: string;
  placement?: string;
  href: string;
  children: React.ReactNode;
  className?: string;
  id?: string;
  event?: string;
}) {
  return (
    <a
      href={href}
      className={className}
      onClick={() => track(event, { id, source: "website", topic, placement })}
    >
      {children}
    </a>
  );
}
