"use client";

import Image from "next/image";
import { Reveal } from "@/components/motion/reveal";
import { Drift } from "@/components/motion/effects";
import { DotLeader, DotRule, Section } from "@/components/site/atoms";
import { Button } from "@/components/ui/button";
import { CmsText } from "@/components/site-editor/inline-edit";
import { resolveImage } from "@/lib/drive";
import { FALLBACK_IMAGES } from "@/cms/content";
import type { HomeData } from "@/lib/home-types";

export function Nutrition({ data }: { data: HomeData["nutrition"] }) {
  const src = resolveImage(data.image, FALLBACK_IMAGES.nutrition);
  const isExternal = /^https?:\/\//i.test(data.ctaUrl);

  return (
    <Section id="nutrition">
      <div className="grid grid-cols-1 overflow-hidden rounded-[10px] border border-[var(--hairline-soft)] md:min-h-[620px] md:grid-cols-[1fr_0.85fr]">
        {/* ── left: the two text columns, CTA, and footer strip ── */}
        <div className="flex flex-col bg-cream2 p-6 sm:p-8 md:p-10">
          <Reveal
            variant="up"
            stagger={0.12}
            className="grid grid-cols-1 gap-8 md:grid-cols-2 md:gap-10"
          >
            {data.columns.map((column, i) => (
              <div key={i}>
                <CmsText
                  kind="home"
                  path={`nutrition.columns.${i}.heading`}
                  as="h3"
                  className="font-display text-[1.45rem] leading-[1.3] text-ink"
                >
                  {column.heading}
                </CmsText>
                <DotLeader count={9} className="mt-1.5 block" />
                {column.paragraphs.map((paragraph, j) => (
                  <CmsText
                    key={j}
                    kind="home"
                    path={`nutrition.columns.${i}.paragraphs.${j}.text`}
                    multiline
                    as="p"
                    className="mt-5 text-base leading-[1.75] text-petrol"
                  >
                    {paragraph.text}
                  </CmsText>
                ))}
              </div>
            ))}
          </Reveal>

          {/* pushes the strip to the plate's lower edge on desktop */}
          <div className="flex-1" />

          <Reveal variant="up" delay={0.15} className="mt-10 flex">
            <Button
              asChild
              className="h-12 self-start rounded-full bg-terra px-6 text-base font-bold text-paper hover:bg-terradeep"
            >
              {isExternal ? (
                <a href={data.ctaUrl} target="_blank" rel="noreferrer">
                  <CmsText kind="home" path="nutrition.ctaLabel">{data.ctaLabel}</CmsText>
                </a>
              ) : (
                <a href={data.ctaUrl}>
                  <CmsText kind="home" path="nutrition.ctaLabel">{data.ctaLabel}</CmsText>
                </a>
              )}
            </Button>
          </Reveal>

          <div className="mt-8">
            <DotRule />
            <div className="mt-4 flex flex-col gap-1 sm:flex-row sm:flex-wrap sm:items-baseline sm:justify-between sm:gap-x-6 sm:gap-y-1">
              <CmsText kind="home" path="nutrition.strip" className="text-base font-bold text-petrol">
                {data.strip}
              </CmsText>
              <CmsText kind="home" path="nutrition.plate" className="font-display text-[0.88rem] text-terra sm:text-right">
                {data.plate}
              </CmsText>
            </div>
          </div>
        </div>

        {/* ── right: full-height photograph with a decorative arc ── */}
        <Reveal
          variant="curtain"
          duration={1.1}
          className="relative aspect-[4/3] w-full overflow-hidden bg-parch md:aspect-auto md:h-full"
        >
          <Drift className="absolute inset-0" amount={6}>
            <Image
              src={src}
              alt={data.imageAlt || "Women enjoying nutritious food, outdoor exercise, and a quiet wellness moment"}
              fill
              sizes="(min-width:768px) 45vw, 100vw"
              className="scale-110 object-cover object-center"
            />
            <div
              aria-hidden
              className="pointer-events-none absolute top-[8%] left-1/2 aspect-square w-[130%] -translate-x-1/2 rounded-full border border-[var(--paper-white)]/30"
            />
          </Drift>
        </Reveal>
      </div>
    </Section>
  );
}
