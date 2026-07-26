"use client";

import { useRef, type ElementType, type ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

// Photography finishes decoding after hydration, which shifts every trigger
// position down the page; recalculate once everything has settled.
if (typeof window !== "undefined") {
  window.addEventListener("load", () => ScrollTrigger.refresh(), { once: true });
}

type Variant = "up" | "fade" | "curtain" | "left" | "right" | "scale";

const FROM: Record<Variant, gsap.TweenVars> = {
  up: { y: 34, opacity: 0 },
  fade: { opacity: 0 },
  curtain: { clipPath: "inset(0% 0% 100% 0%)", opacity: 0 },
  left: { x: -40, opacity: 0 },
  right: { x: 40, opacity: 0 },
  scale: { scale: 1.06, opacity: 0 },
};

const TO: Record<Variant, gsap.TweenVars> = {
  up: { y: 0, opacity: 1 },
  fade: { opacity: 1 },
  curtain: { clipPath: "inset(0% 0% 0% 0%)", opacity: 1 },
  left: { x: 0, opacity: 1 },
  right: { x: 0, opacity: 1 },
  scale: { scale: 1, opacity: 1 },
};

/**
 * Pre-animation hiding is done in CSS via `[data-reveal]`, gated on the `js` class
 * that layout.tsx stamps on <html> before first paint. Without JS the attribute has
 * no effect, so crawlers, print, and no-script visitors get the fully visible page
 * instead of a blank one.
 */

export interface RevealProps {
  children: ReactNode;
  variant?: Variant;
  stagger?: number;
  delay?: number;
  duration?: number;
  className?: string;
  as?: ElementType;
  start?: string;
}

export function Reveal({
  children,
  variant = "up",
  stagger,
  delay = 0,
  duration = 0.9,
  className,
  as: Tag = "div",
  start = "top 85%",
}: RevealProps) {
  const scope = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const root = scope.current;
      if (!root) return;

      // Hand control from the CSS pre-hide to GSAP. Once this is gone the element
      // is visible by default, so every early return below still shows content.
      root.removeAttribute("data-reveal");

      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const targets = stagger ? (Array.from(root.children) as HTMLElement[]) : [root];
      if (reduced || !targets.length) return;

      gsap.fromTo(targets, FROM[variant], {
        ...TO[variant],
        duration,
        delay,
        ease: "power3.out",
        stagger: stagger ?? 0,
        scrollTrigger: { trigger: root, start, once: true },
      });
    },
    { scope },
  );

  return (
    <Tag ref={scope} className={className} data-reveal="">
      {children}
    </Tag>
  );
}

export function Parallax({
  children,
  className,
  amount = 60,
}: {
  children: ReactNode;
  className?: string;
  amount?: number;
}) {
  const scope = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      const el = scope.current?.firstElementChild;
      if (!el) return;
      gsap.fromTo(
        el,
        { yPercent: -amount / 10 },
        {
          yPercent: amount / 10,
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
    <div ref={scope} className={className}>
      {children}
    </div>
  );
}
