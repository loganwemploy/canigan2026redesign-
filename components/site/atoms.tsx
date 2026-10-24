import { cn } from "@/lib/utils";

export { Display } from "@/components/site/display";

/** Tracked all-caps section label with the Emberleaf leading rule. */
export function PlateLabel({
  label,
  className,
  tone = "ink",
}: {
  label: string;
  className?: string;
  tone?: "ink" | "paper";
}) {
  return (
    <div className={cn("flex items-baseline gap-3", className)}>
      <span
        className={cn(
          "label-caps",
          tone === "paper" ? "text-[var(--lime)]" : "text-[var(--deep)]",
        )}
      >
        {label}
      </span>
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
          tone === "paper" ? "rgba(255, 255, 255, 0.5)" : "rgba(34, 83, 58, 0.42)"
        } 1px, transparent 1.2px)`,
        backgroundSize: "9px 1px",
        backgroundRepeat: "repeat-x",
      }}
    />
  );
}

/** The recurring frosted "plate" that most sections sit inside. */
export function Plate({
  children,
  className,
  inner = true,
}: {
  children: React.ReactNode;
  className?: string;
  inner?: boolean;
}) {
  return <div className={cn("plate", inner && "plate-inner", className)}>{children}</div>;
}

/** Section wrapper providing the page's consistent vertical and horizontal rhythm. */
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
    <section id={id} className={cn("sec", className)}>
      <div className="wrap">{children}</div>
    </section>
  );
}
