"use client";

import {
  useEffect,
  useRef,
  type ElementType,
  type KeyboardEvent,
  type FocusEvent,
} from "react";
import { Display, PlateLabel } from "@/components/site/atoms";
import { useSiteEditor } from "@/components/site-editor/editor-context";
import { getByPath } from "@/lib/editor-fields";
import { cn } from "@/lib/utils";

const EDIT_RING =
  "cursor-text rounded-[2px] outline-none transition-shadow hover:ring-1 hover:ring-terra/35 focus:ring-2 focus:ring-terra/55";

type FieldKind = "home" | "zoom";

function readValue(kind: FieldKind, path: string, home: unknown, meeting: unknown): string {
  const raw = kind === "home" ? getByPath(home, path) : getByPath(meeting, path);
  if (typeof raw === "boolean") return raw ? "true" : "false";
  return typeof raw === "string" ? raw : "";
}

function renderLines(text: string, lineClassName?: string) {
  return text.split("\n").map((line, i) => (
    <span key={i} className={cn("block", i > 0 && lineClassName)}>
      {line}
    </span>
  ));
}

/** Inline text — the visible copy is the input. No separate form fields. */
export function CmsText({
  kind,
  path,
  className,
  multiline = false,
  as: Tag = "span",
  children,
}: {
  kind: FieldKind;
  path: string;
  className?: string;
  multiline?: boolean;
  as?: ElementType;
  children: string;
}) {
  const { enabled, home, meeting, updateHome, updateMeeting } = useSiteEditor();
  const ref = useRef<HTMLElement>(null);
  const value = enabled ? readValue(kind, path, home, meeting) : children;

  useEffect(() => {
    const el = ref.current;
    if (!enabled || !el || document.activeElement === el) return;
    el.innerText = multiline ? value : value.replace(/\n/g, " ");
  }, [enabled, value, multiline]);

  if (!enabled) {
    if (multiline) {
      return <Tag className={className}>{renderLines(children)}</Tag>;
    }
    return <Tag className={className}>{children}</Tag>;
  }

  function commit(next: string) {
    const normalized = multiline ? next : next.replace(/\n/g, " ").trim();
    if (kind === "home") updateHome(path, normalized);
    else updateMeeting(path, normalized);
  }

  return (
    <Tag
      ref={ref as never}
      contentEditable
      suppressContentEditableWarning
      className={cn(className, EDIT_RING)}
      onBlur={(e: FocusEvent<HTMLElement>) => commit(e.currentTarget.innerText)}
      onKeyDown={(e: KeyboardEvent<HTMLElement>) => {
        if (!multiline && e.key === "Enter") {
          e.preventDefault();
          (e.currentTarget as HTMLElement).blur();
        }
      }}
    />
  );
}

/** Serif display headings — preserves line breaks, editable in place. */
export function CmsDisplay({
  kind,
  path,
  className,
  as = "h2",
  children,
}: {
  kind: FieldKind;
  path: string;
  className?: string;
  as?: "h1" | "h2" | "h3";
  children: string;
}) {
  const { enabled, home, meeting, updateHome, updateMeeting } = useSiteEditor();
  const Tag = as;
  const ref = useRef<HTMLElement>(null);
  const value = enabled ? readValue(kind, path, home, meeting) : children;

  useEffect(() => {
    const el = ref.current;
    if (!enabled || !el || document.activeElement === el) return;
    el.innerText = value;
  }, [enabled, value]);

  if (!enabled) {
    return (
      <Display as={as} className={className}>
        {children}
      </Display>
    );
  }

  return (
    <Tag
      ref={ref as never}
      contentEditable
      suppressContentEditableWarning
      className={cn(
        "font-display leading-[1.1] tracking-[-0.025em] whitespace-pre-wrap",
        className,
        EDIT_RING,
      )}
      onBlur={(e: FocusEvent<HTMLElement>) => {
        if (kind === "home") updateHome(path, e.currentTarget.innerText);
        else updateMeeting(path, e.currentTarget.innerText);
      }}
    />
  );
}

/** Tracked all-caps label — editable in place. */
export function CmsPlateLabel({
  kind,
  path,
  label,
  className,
  tone = "ink",
}: {
  kind: FieldKind;
  path: string;
  label: string;
  className?: string;
  tone?: "ink" | "paper";
}) {
  const { enabled } = useSiteEditor();

  if (!enabled) {
    return <PlateLabel label={label} className={className} tone={tone} />;
  }

  return (
    <div className={cn("flex items-baseline gap-3", className)}>
      <CmsText
        kind={kind}
        path={path}
        className={cn(
          "label-caps",
          tone === "paper" ? "text-[var(--paper-white)]/90" : "text-ink/85",
        )}
      >
        {label}
      </CmsText>
    </div>
  );
}
