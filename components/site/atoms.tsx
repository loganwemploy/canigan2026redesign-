import { cn } from "@/lib/utils";

/** Tracked all-caps section label, optionally followed by a terracotta plate mark. */
export function PlateLabel({
  label,
  plate,
  className,
  tone = "ink",
}: {
  label: string;
  plate?: string | null;
  className?: string;
  tone?: "ink" | "paper";
}) {
  return (
    <div className={cn("flex items-baseline gap-3", className)}>
      <span
        className={cn(
          "label-caps",
          tone === "paper" ? "text-[var(--paper-white)]/90" : "text-ink/85",
        )}
      >
        {label}
      </span>
      {plate ? (
        <span className="font-display text-[0.72rem] not-italic tracking-wide text-terra">
          <span className="italic">{plate}</span>
        </span>
      ) : null}
    </div>
  );
}

/** A run of evenly-spaced dots used as an editorial rule. */
export function DotLeader({
  count = 12,
  className,
  tone = "ink",
}: {
  count?: number;
  className?: string;
  tone?: "ink" | "paper";
}) {
  return (
    <span
      aria-hidden
      className={cn(
        "dot-leader",
        tone === "paper" && "text-[var(--paper-white)]/70",
        className,
      )}
    >
      {"·".repeat(count)}
    </span>
  );
}

/** Full-width dotted rule that fills its container. */
export function DotRule({ className, tone = "ink" }: { className?: string; tone?: "ink" | "paper" }) {
  return (
    <div
      aria-hidden
      className={cn("h-px w-full", className)}
      style={{
        backgroundImage: `radial-gradient(circle, ${
          tone === "paper" ? "rgba(246,243,232,0.55)" : "rgba(56,66,47,0.42)"
        } 1px, transparent 1.2px)`,
        backgroundSize: "9px 1px",
        backgroundRepeat: "repeat-x",
      }}
    />
  );
}

/** The recurring rounded, hairline-framed "plate" that most sections sit inside. */
export function Plate({
  children,
  className,
  inner = true,
}: {
  children: React.ReactNode;
  className?: string;
  inner?: boolean;
}) {
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-[10px] border border-[var(--hairline-soft)] bg-cream2",
        inner && "px-6 py-12 sm:px-10 sm:py-16",
        className,
      )}
    >
      {children}
    </div>
  );
}

/**
 * Serif-italic display heading; preserves newlines from the CMS.
 * Line-height and inter-line gaps are intentionally open for older readers
 * ("silver fox") — large italic type needs air or it packs shut.
 */
export function Display({
  children,
  className,
  as: Tag = "h2",
}: {
  children: string;
  className?: string;
  as?: "h1" | "h2" | "h3";
}) {
  const lines = children.split("\n");
  return (
    <Tag
      className={cn(
        "font-display leading-[1.28] tracking-[0.012em] sm:leading-[1.26]",
        className,
      )}
    >
      {lines.map((line, i) => (
        <span
          key={i}
          className={cn("block", i > 0 && "mt-[0.18em]")}
        >
          {line}
        </span>
      ))}
    </Tag>
  );
}

/** Section wrapper providing the page's consistent horizontal rhythm. */
export function Section({
  id,
  children,
  className,
}: {
  id?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section id={id} className={cn("px-3 py-4 sm:px-5 sm:py-5", className)}>
      {children}
    </section>
  );
}
