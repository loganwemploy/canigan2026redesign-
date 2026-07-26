"use client";

import type { ReactNode } from "react";
import { useSiteEditor } from "@/components/site-editor/editor-context";
import type { EditorTarget } from "@/lib/editor-fields";
import { cn } from "@/lib/utils";

/** Clickable overlay for the 1:1 site editor — wraps any CMS-backed element. */
export function Editable({
  target,
  children,
  className,
}: {
  target: EditorTarget;
  children: ReactNode;
  className?: string;
}) {
  const { enabled, selected, select } = useSiteEditor();

  if (!enabled) return <>{children}</>;

  const isActive =
    selected?.kind === target.kind &&
    selected.path === target.path &&
    selected.label === target.label;

  return (
    <div
      className={cn(
        "group relative cursor-pointer rounded-[4px] transition-[box-shadow,outline]",
        isActive
          ? "outline outline-2 outline-terra outline-offset-2"
          : "hover:outline hover:outline-2 hover:outline-terra/50 hover:outline-offset-2",
        className,
      )}
      onClick={(event) => {
        event.preventDefault();
        event.stopPropagation();
        select(target);
      }}
      role="button"
      tabIndex={0}
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          select(target);
        }
      }}
      aria-label={`Edit ${target.label}`}
    >
      {children}
      <span
        className={cn(
          "pointer-events-none absolute -top-2 -right-2 z-20 rounded-full bg-terra px-2 py-0.5 text-[0.55rem] font-bold tracking-[0.12em] uppercase text-paper shadow",
          isActive ? "opacity-100" : "opacity-0 group-hover:opacity-100",
        )}
      >
        Edit
      </span>
    </div>
  );
}
