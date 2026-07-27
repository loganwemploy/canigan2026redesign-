import { ArrowDown, ArrowRight } from "lucide-react";
import { Reveal } from "@/components/motion/reveal";
import { PatternField } from "@/components/motion/effects";
import { Display, Section } from "@/components/site/atoms";
import { Button } from "@/components/ui/button";
import type { HomeData } from "@/lib/home-types";

function Prose({ text, className }: { text: string; className?: string }) {
  return (
    <p className={className}>
      {text.split("\n").map((line, i) => (
        <span key={i} className="block">
          {line}
        </span>
      ))}
    </p>
  );
}

export function Challenge({ data }: { data: HomeData["challenge"] }) {
  return (
    <Section id="challenge">
      <div className="relative overflow-hidden rounded-[10px] border border-[var(--hairline-soft)]">
        <div className="grid grid-cols-1 md:grid-cols-2 md:min-h-[560px]">
          <div className="relative border-b border-[var(--hairline-soft)] bg-cream2 md:border-b-0">
            <PatternField />
            <div className="relative flex h-full flex-col items-center justify-center px-7 pt-16 pb-20 text-center sm:px-12 md:px-12 md:pt-16 md:pb-44 lg:px-16">
              <Reveal variant="left" duration={1}>
                <span className="label-caps block text-inksoft">{data.label}</span>
                <Display
                  as="h2"
                  className="mt-7 text-[clamp(1.7rem,2.8vw,2.35rem)] text-ink"
                >
                  {data.heading}
                </Display>
                <Prose
                  text={data.body}
                  className="mx-auto mt-7 max-w-[42ch] text-[0.92rem] leading-[1.95] text-inksoft"
                />
              </Reveal>
            </div>

            <div className="absolute bottom-0 left-1/2 z-10 -translate-x-1/2 translate-y-1/2 md:top-1/2 md:right-0 md:bottom-auto md:left-auto md:translate-x-1/2 md:-translate-y-1/2">
              <Reveal variant="scale" delay={0.35} duration={0.7}>
                <span className="grid size-9 place-items-center rounded-full bg-terra text-[var(--paper-white)] shadow-[0_1px_10px_rgba(56,66,47,0.18)]">
                  <ArrowDown aria-hidden className="size-4 md:hidden" />
                  <ArrowRight aria-hidden className="hidden size-4 md:block" />
                </span>
              </Reveal>
            </div>
          </div>

          <div className="relative bg-parch">
            <PatternField />
            <div className="relative flex h-full flex-col items-center justify-center px-7 pt-20 pb-16 text-center sm:px-12 md:px-12 md:pt-16 md:pb-44 lg:px-16">
              <Reveal variant="right" duration={1}>
                <span className="label-caps inline-flex rounded-full bg-pine px-4 py-1.5 text-[0.6rem] text-paper">
                  {data.goalBadge}
                </span>
                <Display
                  as="h2"
                  className="mt-7 text-[clamp(1.7rem,2.8vw,2.35rem)] text-ink"
                >
                  {data.goalHeading}
                </Display>
                <Prose
                  text={data.goalBody}
                  className="mx-auto mt-7 max-w-[42ch] text-[0.92rem] leading-[1.95] text-inksoft"
                />
                <Button
                  asChild
                  className="mt-8 h-11 rounded-full bg-terra px-7 text-[0.68rem] font-bold tracking-[0.18em] uppercase text-paper hover:bg-terradeep"
                >
                  <a href="#nutrition">See how nutrition helps</a>
                </Button>
              </Reveal>
            </div>
          </div>
        </div>

        <div
          aria-hidden
          className="pointer-events-none absolute inset-y-0 left-1/2 hidden w-px bg-[var(--hairline-soft)] md:block"
        />
      </div>
    </Section>
  );
}
