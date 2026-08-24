"use client";

import { ArrowDown, ArrowRight } from "lucide-react";
import { Reveal } from "@/components/motion/reveal";
import { DotRule, Plate, Section } from "@/components/site/atoms";
import { CmsDisplay, CmsPlateLabel, CmsText } from "@/components/site-editor/inline-edit";
import { Button } from "@/components/ui/button";
import type { HomeData } from "@/lib/home-types";

export function GetStarted({ data }: { data: HomeData["getStarted"] }) {
  const steps = data.steps ?? [];
  const lastIndex = steps.length - 1;

  return (
    <Section id="start">
      <Plate inner={false} className="dot-grid px-7 py-10 sm:px-10 sm:py-12">
        <Reveal variant="up">
          <CmsPlateLabel kind="home" path="getStarted.label" label={data.label} />
          <CmsDisplay
            kind="home"
            path="getStarted.heading"
            as="h2"
            className="mt-7 max-w-[40ch] text-[clamp(1.65rem,2.9vw,2.2rem)] leading-[1.38] text-ink"
          >
            {data.heading}
          </CmsDisplay>
        </Reveal>

        {/* Deliberate void. Generous on desktop where the plate has width to
            balance it; on a phone that much dead height just reads as a bug. */}
        <div aria-hidden className="min-h-[72px] sm:min-h-[140px] md:min-h-[240px]" />

        <DotRule />

        <div className="mt-7">
          {/* desktop rail */}
          <Reveal
            variant="up"
            stagger={0.1}
            className="hidden gap-6 md:grid md:grid-cols-4"
          >
            {steps.map((step, i) => (
              <div key={i} className="relative pr-7">
                <span className="font-display block text-[2.1rem] leading-none text-terra">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <CmsText
                  kind="home"
                  path={`getStarted.steps.${i}.label`}
                  className="mt-3 block text-base font-bold leading-7 text-petrol"
                >
                  {step.label}
                </CmsText>
                {i !== lastIndex ? (
                  <ArrowRight aria-hidden className="absolute right-0 top-3 size-4 text-inksoft" />
                ) : null}
              </div>
            ))}
          </Reveal>

          {/* mobile rail */}
          <Reveal variant="up" stagger={0.1} className="space-y-5 md:hidden">
            {steps.map((step, i) => (
              <div key={i}>
                <span className="font-display block text-[2.1rem] leading-none text-terra">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <CmsText
                  kind="home"
                  path={`getStarted.steps.${i}.label`}
                  className="mt-3 block text-base font-bold leading-7 text-petrol"
                >
                  {step.label}
                </CmsText>
                {i !== lastIndex ? (
                  <ArrowDown aria-hidden className="mt-3 size-4 text-inksoft" />
                ) : null}
              </div>
            ))}
          </Reveal>
        </div>

        <Reveal variant="up" className="mt-10">
          <Button
            asChild
            className="h-12 rounded-full bg-terra px-7 text-base font-bold text-paper hover:bg-terradeep"
          >
            <a href={data.primaryCta.url} target="_blank" rel="noreferrer">
              <CmsText kind="home" path="getStarted.primaryCta.label">{data.primaryCta.label}</CmsText>
            </a>
          </Button>
        </Reveal>
      </Plate>
    </Section>
  );
}
