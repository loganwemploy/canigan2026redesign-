"use client";

import { ArrowUpRight, Check } from "lucide-react";
import { Reveal } from "@/components/motion/reveal";
import { DotRule, Plate, Section } from "@/components/site/atoms";
import { CmsDisplay, CmsText } from "@/components/site-editor/inline-edit";
import { Button } from "@/components/ui/button";
import type { HomeData } from "@/lib/home-types";

const PROGRAM_DETAILS = [
  {
    value: "15%",
    label: "Member pricing",
    body: "Current Members receive 15% off product pricing.",
  },
  {
    value: "5–15%",
    label: "Product points",
    body: "Qualifying consecutive loyalty orders of $100 or more can earn product points that increase over time.",
  },
  {
    value: "10%+",
    label: "Customer-sales tier",
    body: "The current Ambassador customer-sales commission structure begins at 10%; qualifications and plan rules apply.",
  },
  {
    value: "$50 + $25",
    label: "Qualifying Star Club structure",
    body: "Current rules list $50 per qualifying $500 in first-order product sales from at least three new enrollments, with a possible $25 qualifying Ambassador-paired boost.",
  },
] as const;

export function Benchmarks({ data }: { data: HomeData["benchmarks"] }) {
  return (
    <Section id="benchmarks" data-claims-mode="verified-program-details" data-source-label={data.label}>
      <Plate inner={false} className="dot-grid px-6 py-10 sm:px-9 sm:py-12">
        <Reveal variant="up">
          <div className="flex items-center gap-4">
            <span className="label-caps whitespace-nowrap text-[0.82rem] text-ink">Current program details</span>
            <DotRule className="flex-1" />
          </div>
          <CmsDisplay as="h2" kind="home" path="benchmarks.heading" className="mt-6 max-w-[28ch] text-[clamp(1.85rem,3vw,2.45rem)] text-ink">
            {data.heading}
          </CmsDisplay>
          <CmsText
            kind="home"
            path="benchmarks.disclaimer"
            multiline
            as="p"
            className="mt-4 max-w-[68ch] text-base leading-8 text-inksoft"
          >
            {data.disclaimer}
          </CmsText>
        </Reveal>

        <Reveal variant="up" stagger={0.08} className="mt-10 grid gap-3 md:grid-cols-2 xl:grid-cols-4">
          {PROGRAM_DETAILS.map((detail) => (
            <article key={detail.label} data-program-detail className="flex min-h-[250px] flex-col rounded-[18px] border border-[var(--hairline-soft)] bg-cream2 p-6">
              <span className="text-[clamp(2rem,3.5vw,3.25rem)] font-bold tracking-[-0.055em] text-forest">{detail.value}</span>
              <h3 className="mt-2 text-lg font-bold text-ink">{detail.label}</h3>
              <p className="mt-5 text-base leading-8 text-petrol">{detail.body}</p>
              <Check className="mt-auto size-4 text-forest" aria-hidden />
            </article>
          ))}
        </Reveal>

        <Reveal variant="fade" className="mt-8 block">
          <p className="max-w-[74ch] text-[0.9rem] leading-[1.75] italic text-inksoft">
            Member value and Ambassador compensation are separate. Product points are not cash. Ambassador earnings depend on qualifying customer product sales, expenses, skill, and effort and are not guaranteed. Terms can change.
          </p>
          <div className="mt-5 flex flex-wrap gap-3">
            <Button asChild className="h-12 rounded-full bg-terra px-7 text-base font-bold text-paper hover:bg-terradeep">
              <a href={data.cta.url}>
                <CmsText kind="home" path="benchmarks.cta.label">{data.cta.label}</CmsText>
              </a>
            </Button>
            <a href="https://images.shaklee.com/ShakleeCompPlanENG.pdf" target="_blank" rel="noreferrer" className="inline-flex min-h-12 items-center rounded-full border border-forest/30 px-5 text-base font-bold text-forest hover:bg-white">
              Official compensation summary <ArrowUpRight className="ml-2 size-3.5" aria-hidden />
            </a>
          </div>
        </Reveal>
      </Plate>
    </Section>
  );
}
