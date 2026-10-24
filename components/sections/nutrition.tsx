"use client";

import Image from "next/image";
import { ArrowRight } from "lucide-react";
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
    <Section id="nutrition" className="nutrition">
      <div className="nutri-grid">
        {/* ── left: the two text columns, CTA, and footer strip ── */}
        <div className="nutri-panel">
          <Reveal variant="up" stagger={0.12} className="nutri-cols">
            {data.columns.map((column, i) => (
              <div key={i} className="nutri-col">
                <CmsText
                  kind="home"
                  path={`nutrition.columns.${i}.heading`}
                  as="h3"
                  className="nutri-heading"
                >
                  {column.heading}
                </CmsText>
                <DotLeader count={9} className="nutri-dots" />
                {column.paragraphs.map((paragraph, j) => (
                  <CmsText
                    key={j}
                    kind="home"
                    path={`nutrition.columns.${i}.paragraphs.${j}.text`}
                    multiline
                    as="p"
                    className="nutri-text"
                  >
                    {paragraph.text}
                  </CmsText>
                ))}
              </div>
            ))}
          </Reveal>

          {/* pushes the strip to the panel's lower edge on desktop */}
          <div className="nutri-spacer" aria-hidden />

          <Reveal variant="up" delay={0.15} className="nutri-cta">
            <Button asChild size="lg">
              {isExternal ? (
                <a href={data.ctaUrl} target="_blank" rel="noreferrer">
                  <CmsText kind="home" path="nutrition.ctaLabel">{data.ctaLabel}</CmsText>
                  <ArrowRight aria-hidden />
                </a>
              ) : (
                <a href={data.ctaUrl}>
                  <CmsText kind="home" path="nutrition.ctaLabel">{data.ctaLabel}</CmsText>
                  <ArrowRight aria-hidden />
                </a>
              )}
            </Button>
          </Reveal>

          <div className="nutri-foot">
            <DotRule />
            <div className="nutri-strip">
              <CmsText kind="home" path="nutrition.strip" className="nutri-strip-text">
                {data.strip}
              </CmsText>
              <CmsText kind="home" path="nutrition.plate" className="label-caps">
                {data.plate}
              </CmsText>
            </div>
          </div>
        </div>

        {/* ── right: full-height photograph with a decorative arc ── */}
        <Reveal variant="curtain" duration={1.1} className="nutri-photo">
          <Drift className="nutri-drift" amount={3}>
            {/* decorative blurred copy so the whole infographic can show without letterbox bars */}
            <Image
              src={src}
              alt=""
              aria-hidden
              fill
              sizes="(min-width:768px) 45vw, 100vw"
              className="nutri-fill"
            />
            <Image
              src={src}
              alt={data.imageAlt || "Women enjoying nutritious food, outdoor exercise, and a quiet wellness moment"}
              fill
              sizes="(min-width:768px) 45vw, 100vw"
              className="nutri-img"
            />
            <div aria-hidden className="nutri-arc" />
          </Drift>
        </Reveal>
      </div>
    </Section>
  );
}
