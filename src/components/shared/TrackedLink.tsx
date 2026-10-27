"use client";
import { track } from "@/lib/analytics";
export default function TrackedLink({
  href,
  children,
  className,
  id = "contact",
  event = "contact_click",
}: {
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
      onClick={() => track(event, { id, source: "website" })}
    >
      {children}
    </a>
  );
}
