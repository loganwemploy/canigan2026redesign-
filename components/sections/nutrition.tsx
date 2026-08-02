import Image from "next/image";
import { Reveal } from "@/components/motion/reveal";
import { Drift } from "@/components/motion/effects";
import { DotLeader, DotRule, Section } from "@/components/site/atoms";
import { Button } from "@/components/ui/button";
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
                <h3 className="font-display text-[1.45rem] leading-[1.3] text-ink">
                  {column.heading}
                </h3>
                <DotLeader count={9} className="mt-1.5 block" />
                {column.paragraphs.map((paragraph, j) => (
                  <p key={j} className="mt-5 text-base leading-[1.75] text-petrol">
                    {paragraph.text.split("\n").map((line, k) => (
                      <span key={k} className="block">
                        {line}
                      </span>
                    ))}
                  </p>
                ))}
              </div>
            ))}
          </Reveal>

          {/* pushes the strip to the plate's lower edge on desktop */}
          <div className="flex-1" />

          <Reveal variant="up" delay={0.15} className="mt-10 flex">
            <Button
              asChild
              className="cta-long h-12 self-start rounded-full bg-terra px-6 text-base font-bold text-paper hover:bg-terradeep"
            >
              {isExternal ? (
                <a href={data.ctaUrl} target="_blank" rel="noreferrer">
                  {data.ctaLabel}
                </a>
              ) : (
                <a href={data.ctaUrl}>{data.ctaLabel}</a>
              )}
            </Button>
          </Reveal>

          <div className="mt-8">
            <DotRule />
            <div className="mt-4 flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
              <span className="text-base font-bold text-petrol">{data.strip}</span>
              <span className="font-display text-[0.88rem] text-terra">{data.plate}</span>
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
              alt="Natural wellness products and fresh ingredients from Canigan Health Options"
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
