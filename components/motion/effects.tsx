"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { cn } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const prefersReducedMotion = () =>
  typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/** Hairline read-progress rail pinned to the top of the viewport. */
export function ScrollProgress() {
  const bar = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!bar.current || prefersReducedMotion()) return;
    gsap.fromTo(
      bar.current,
      { scaleX: 0 },
      {
        scaleX: 1,
        ease: "none",
        transformOrigin: "left center",
        scrollTrigger: { start: 0, end: () => document.body.scrollHeight - window.innerHeight, scrub: 0.3 },
      },
    );
  });

  return (
    <div aria-hidden className="pointer-events-none fixed inset-x-0 top-0 z-[60] h-[2px]">
      <div ref={bar} className="h-full w-full origin-left scale-x-0 bg-terra/70" />
    </div>
  );
}

/**
 * Counts a currency figure up when it scrolls into view. Keeps the original
 * string as the rendered fallback so the real value is present without JS.
 */
export function CountUp({ value, className }: { value: string; className?: string }) {
  const el = useRef<HTMLSpanElement>(null);

  useGSAP(
    () => {
      const node = el.current;
      if (!node) return;

      const digits = value.replace(/[^0-9.]/g, "");
      const target = Number.parseFloat(digits);
      if (!Number.isFinite(target) || prefersReducedMotion()) return;

      const prefix = value.slice(0, value.search(/[0-9]/));
      const suffix = value.slice(value.search(/[0-9]/) + digits.length);
      const counter = { n: 0 };

      gsap.to(counter, {
        n: target,
        duration: 1.4,
        ease: "power2.out",
        scrollTrigger: { trigger: node, start: "top 88%", once: true },
        onUpdate: () => {
          node.textContent = prefix + Math.round(counter.n).toLocaleString("en-US") + suffix;
        },
        onComplete: () => {
          node.textContent = value;
        },
      });
    },
    { dependencies: [value] },
  );

  return (
    <span ref={el} className={className}>
      {value}
    </span>
  );
}

/**
 * Gentle scroll-linked drift for section imagery. Wraps a single positioned
 * child (typically a next/image with `fill`).
 */
export function Drift({
  children,
  className,
  amount = 8,
}: {
  children: React.ReactNode;
  className?: string;
  amount?: number;
}) {
  const scope = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const target = scope.current?.firstElementChild;
      if (!target || prefersReducedMotion()) return;
      gsap.fromTo(
        target,
        { yPercent: -amount },
        {
          yPercent: amount,
          ease: "none",
          scrollTrigger: {
            trigger: scope.current,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        },
      );
    },
    { scope },
  );

  return (
    <div ref={scope} className={cn("overflow-hidden", className)}>
      {children}
    </div>
  );
}

/**
 * A field of plate marks that drifts as you scroll — used to give the quieter
 * bands some texture instead of flat paper.
 */
export function PatternField({
  className,
  tone = "ink",
}: {
  className?: string;
  tone?: "ink" | "paper";
}) {
  const scope = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!scope.current || prefersReducedMotion()) return;
      gsap.fromTo(
        scope.current,
        { backgroundPositionY: "0px" },
        {
          backgroundPositionY: "120px",
          ease: "none",
          scrollTrigger: { trigger: scope.current, start: "top bottom", end: "bottom top", scrub: true },
        },
      );
    },
    { scope },
  );

  return (
    <div
      ref={scope}
      aria-hidden
      className={cn("pointer-events-none absolute inset-0", className)}
      style={{
        backgroundImage: `radial-gradient(${
          tone === "paper" ? "rgba(246,243,232,0.16)" : "rgba(56,66,47,0.13)"
        } 1px, transparent 1.5px)`,
        backgroundSize: "26px 26px",
      }}
    />
  );
}
