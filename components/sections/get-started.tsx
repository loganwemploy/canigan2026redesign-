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
    <Section id="start" className="start">
      <Plate inner={false} className="start-plate">
        <Reveal variant="up" className="start-head">
          <CmsPlateLabel kind="home" path="getStarted.label" label={data.label} />
          <CmsDisplay kind="home" path="getStarted.heading" as="h2" className="start-title">
            {data.heading}
          </CmsDisplay>
        </Reveal>

        <DotRule className="start-rule" />

        {/* One list: a row of four on wide screens, a column on phones. */}
        <Reveal as="ol" variant="up" stagger={0.1} className="start-steps">
          {steps.map((step, i) => (
            <li key={i} className="start-step">
              <span className="start-num">{String(i + 1).padStart(2, "0")}</span>
              <CmsText kind="home" path={`getStarted.steps.${i}.label`} className="start-label">
                {step.label}
              </CmsText>
              {i !== lastIndex ? (
                <>
                  <ArrowRight aria-hidden className="start-arrow start-arrow-x" />
                  <ArrowDown aria-hidden className="start-arrow start-arrow-y" />
                </>
              ) : null}
            </li>
          ))}
        </Reveal>

        <Reveal variant="up" className="start-cta">
          <Button asChild size="lg">
            <a href={data.primaryCta.url} target="_blank" rel="noreferrer">
              <CmsText kind="home" path="getStarted.primaryCta.label">{data.primaryCta.label}</CmsText>
              <ArrowRight aria-hidden />
            </a>
          </Button>
        </Reveal>
      </Plate>
    </Section>
  );
}
