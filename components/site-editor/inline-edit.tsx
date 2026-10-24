"use client";

import {
  useEffect,
  useRef,
  useState,
  type ElementType,
  type FocusEvent,
  type KeyboardEvent,
  type MouseEvent,
} from "react";
import { Display, PlateLabel } from "@/components/site/atoms";
import { useSiteEditor } from "@/components/site-editor/editor-context";
import { getByPath } from "@/lib/editor-fields";
import { cn } from "@/lib/utils";

const IDLE =
  "cursor-text rounded-[2px] outline-none transition-[box-shadow,background-color] hover:bg-terra/8 hover:ring-1 hover:ring-terra/40";
const ACTIVE =
  "cursor-text rounded-[2px] bg-terra/10 outline-none ring-2 ring-terra/60";

type FieldKind = "home" | "zoom";

function readValue(kind: FieldKind, path: string, home: unknown, meeting: unknown): string {
  const raw = kind === "home" ? getByPath(home, path) : getByPath(meeting, path);
  if (typeof raw === "boolean") return raw ? "true" : "false";
  return typeof raw === "string" ? raw : "";
}

function renderLines(text: string) {
  return text.split("\n").map((line, i) => (
    <span key={i} className={cn("block", i > 0 && "mt-[0.18em]")}>
      {line || "\u00A0"}
    </span>
  ));
}

/**
 * Pure visual edit: the page text itself becomes editable on click.
 * No sidebar, no separate input — click → type → blur autosaves.
 */
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
  const [editing, setEditing] = useState(false);
  const ref = useRef<HTMLElement>(null);
  const value = enabled ? readValue(kind, path, home, meeting) : children;
  const display = multiline ? value : value.replace(/\n/g, " ");

  useEffect(() => {
    if (!editing || !ref.current) return;
    const el = ref.current;
    el.focus();
    const range = document.createRange();
    range.selectNodeContents(el);
    range.collapse(false);
    const sel = window.getSelection();
    sel?.removeAllRanges();
    sel?.addRange(range);
  }, [editing]);

  if (!enabled) {
    if (multiline) {
      return <Tag className={className}>{renderLines(children)}</Tag>;
    }
    return <Tag className={className}>{children}</Tag>;
  }

  function commit(next: string) {
    const normalized = multiline ? next.replace(/\u00A0/g, " ") : next.replace(/\n/g, " ").trim();
    if (kind === "home") updateHome(path, normalized);
    else updateMeeting(path, normalized);
    setEditing(false);
  }

  function startEdit(event: MouseEvent) {
    event.preventDefault();
    event.stopPropagation();
    setEditing(true);
  }

  if (!editing) {
    return (
      <Tag
        role="button"
        tabIndex={0}
        aria-label="Click to edit"
        className={cn(className, IDLE)}
        onClick={startEdit}
        onKeyDown={(e: KeyboardEvent) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            setEditing(true);
          }
        }}
      >
        {multiline ? renderLines(display) : display || "\u00A0"}
      </Tag>
    );
  }

  return (
    <Tag
      ref={ref as never}
      contentEditable
      suppressContentEditableWarning
      className={cn(className, ACTIVE, multiline && "whitespace-pre-wrap")}
      onClick={(e: MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
      }}
      onBlur={(e: FocusEvent<HTMLElement>) => commit(e.currentTarget.innerText)}
      onKeyDown={(e: KeyboardEvent<HTMLElement>) => {
        if (!multiline && e.key === "Enter") {
          e.preventDefault();
          (e.currentTarget as HTMLElement).blur();
        }
        if (e.key === "Escape") {
          e.preventDefault();
          setEditing(false);
        }
      }}
    >
      {display}
    </Tag>
  );
}

/** Serif display headings — click to edit in place. */
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
  const { enabled } = useSiteEditor();

  if (!enabled) {
    return (
      <Display as={as} className={className}>
        {children}
      </Display>
    );
  }

  return (
    <CmsText
      kind={kind}
      path={path}
      multiline
      as={as}
      className={cn("font-display leading-[1.1] tracking-[-0.025em]", className)}
    >
      {children}
    </CmsText>
  );
}

/** Tracked all-caps label — click to edit in place. */
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
          tone === "paper" ? "text-[var(--lime)]" : "text-[var(--deep)]",
        )}
      >
        {label}
      </CmsText>
    </div>
  );
}
