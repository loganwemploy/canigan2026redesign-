"use client";

import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { Reveal } from "@/components/motion/reveal";
import { DotLeader, Section } from "@/components/site/atoms";
import { CmsDisplay, CmsPlateLabel, CmsText } from "@/components/site-editor/inline-edit";
import { Button } from "@/components/ui/button";
import { resolveImage } from "@/lib/drive";
import { FALLBACK_IMAGES } from "@/cms/content";
import type { HomeData } from "@/lib/home-types";

export function Opportunity({ data }: { data: HomeData["opportunity"] }) {
  const photo = resolveImage(data.image, FALLBACK_IMAGES.opportunity);
  const ambPhoto = resolveImage(data.ambImage, FALLBACK_IMAGES.ambassador);

  return (
    <Section id="opportunity" className="opportunity">
      {/* ── BLOCK 1 · headline and the plain-language bullets ─────── */}
      <div className="opp-head">
        <Reveal variant="up" duration={0.95} className="opp-title-wrap">
          <CmsPlateLabel kind="home" path="opportunity.label" label={data.label} />
          <CmsDisplay kind="home" path="opportunity.heading" as="h2" className="opp-title">
            {data.heading}
          </CmsDisplay>
        </Reveal>

        <Reveal variant="right" delay={0.12} duration={0.95} className="opp-bullets">
          <div>
            {data.bullets.map((bullet, i) => (
              <CmsText
                key={i}
                kind="home"
                path={`opportunity.bullets.${i}.text`}
                as="p"
                className="opp-bullet"
              >
                {bullet.text}
              </CmsText>
            ))}
            <DotLeader count={8} className="opp-dots" />
          </div>
        </Reveal>
      </div>

      {/* ── BLOCK 2 · photograph ───────────────────────────────────── */}
      <Reveal variant="curtain" duration={1.15} className="opp-photo">
        <Image
          src={photo}
          alt="A woman working from her phone at home"
          fill
          sizes="100vw"
          className="object-cover object-center"
        />
        <div aria-hidden className="opp-arch" />
      </Reveal>

      {/* ── BLOCK 3 · ambassador band ──────────────────────────────── */}
      <div className="band band-split opp-band">
        <Image
          src={ambPhoto}
          alt=""
          fill
          sizes="100vw"
          className="opp-band-img"
        />
        <div aria-hidden className="opp-band-shade" />
        <span className="orb" aria-hidden />

        <Reveal variant="up" delay={0.1} duration={0.95} className="opp-band-copy">
          <CmsDisplay kind="home" path="opportunity.ambHeading" as="h3" className="opp-band-title">
            {data.ambHeading}
          </CmsDisplay>
          <CmsText kind="home" path="opportunity.ambBody" multiline as="p" className="opp-band-text">
            {data.ambBody}
          </CmsText>
          <Button asChild size="lg" className="on-dark">
            <a href="#contact">
              <CmsText kind="home" path="opportunity.ambCtaLabel">{data.ambCtaLabel}</CmsText>
              <ArrowRight aria-hidden />
            </a>
          </Button>
        </Reveal>
      </div>
    </Section>
  );
}
