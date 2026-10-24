"use client";

import { ArrowRight, ArrowUpRight, Check } from "lucide-react";
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
    <Section id="benchmarks" data-claims-mode="verified-program-details" data-source-label={data.label} className="benchmarks">
      <Plate inner={false} className="bench-plate">
        <Reveal variant="up" className="bench-head">
          <div className="bench-label">
            <span className="label-caps">Current program details</span>
            <DotRule className="bench-rule" />
          </div>
          <CmsDisplay as="h2" kind="home" path="benchmarks.heading" className="bench-title">
            {data.heading}
          </CmsDisplay>
          <CmsText kind="home" path="benchmarks.disclaimer" multiline as="p" className="lead bench-lead">
            {data.disclaimer}
          </CmsText>
        </Reveal>

        <Reveal variant="up" stagger={0.08} className="bench-grid">
          {PROGRAM_DETAILS.map((detail) => (
            <article key={detail.label} data-program-detail className="bench-card">
              <span className="bench-value">{detail.value}</span>
              <h3 className="bench-name">{detail.label}</h3>
              <p className="bench-body">{detail.body}</p>
              <Check className="bench-check" aria-hidden />
            </article>
          ))}
        </Reveal>

        <Reveal variant="fade" className="bench-foot">
          <p className="bench-fine">
            Member value and Ambassador compensation are separate. Product points are not cash. Ambassador earnings depend on qualifying customer product sales, expenses, skill, and effort and are not guaranteed. Terms can change.
          </p>
          <div className="bench-actions">
            <Button asChild size="lg">
              <a href={data.cta.url}>
                <CmsText kind="home" path="benchmarks.cta.label">{data.cta.label}</CmsText>
                <ArrowRight aria-hidden />
              </a>
            </Button>
            <a
              href="https://images.shaklee.com/ShakleeCompPlanENG.pdf"
              target="_blank"
              rel="noreferrer"
              className="text-link"
            >
              Official compensation summary <ArrowUpRight aria-hidden />
            </a>
          </div>
        </Reveal>
      </Plate>
    </Section>
  );
}
