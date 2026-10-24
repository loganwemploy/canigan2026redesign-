"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cn } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger, useGSAP);

/**
 * Emberleaf-style display heading.
 *
 * - Newlines from the CMS become stacked lines; when there is more than one,
 *   the last line is set in a lighter italic accent (see `[data-multi]` in
 *   ember.css).
 * - Every word sits in a clipping wrapper and slides up when the heading
 *   scrolls into view (or straight away for the hero). The words are pre-hidden
 *   in CSS under `scripting: enabled`, exactly like `[data-reveal]`, so there is
 *   no flash before hydration and nothing is hidden without JavaScript.
 */
export function Display({
  children,
  className,
  as: Tag = "h2",
  reveal = "scroll",
}: {
  children: string;
  className?: string;
  as?: "h1" | "h2" | "h3";
  /** "hero" animates immediately and a touch slower; "none" skips the words entirely. */
  reveal?: "scroll" | "hero" | "none";
}) {
  const ref = useRef<HTMLHeadingElement>(null);
  const lines = children.split("\n");
  const animated = reveal !== "none" && Tag !== "h3";

  useGSAP(
    () => {
      const el = ref.current;
      if (!el || !animated) return;
      const words = el.querySelectorAll<HTMLElement>(".w");
      if (words.length === 0) return;
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      if (reveal === "hero") {
        gsap.fromTo(
          words,
          { yPercent: 115, rotate: 4, opacity: 1 },
          {
            yPercent: 0,
            rotate: 0,
            duration: 1.1,
            ease: "expo.out",
            stagger: 0.07,
            delay: 0.12,
            clearProps: "transform",
          },
        );
        return;
      }

      gsap.fromTo(
        words,
        { yPercent: 115, opacity: 1 },
        {
          yPercent: 0,
          duration: 1,
          ease: "expo.out",
          stagger: 0.06,
          clearProps: "transform",
          scrollTrigger: { trigger: el, start: "top 90%", once: true },
        },
      );
    },
    { scope: ref },
  );

  return (
    <Tag
      ref={ref}
      className={cn(Tag === "h1" && "display", className)}
      data-multi={lines.length > 1 ? "" : undefined}
    >
      {lines.map((line, lineIndex) => (
        <span key={lineIndex} className={cn("block", lineIndex > 0 && "mt-[0.06em]")}>
          {animated
            ? line.split(" ").filter(Boolean).map((word, wordIndex) => (
                <span key={wordIndex}>
                  {wordIndex > 0 ? " " : null}
                  <span className="wi">
                    <span className="w">{word}</span>
                  </span>
                </span>
              ))
            : line}
        </span>
      ))}
    </Tag>
  );
}
