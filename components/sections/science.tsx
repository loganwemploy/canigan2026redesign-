"use client";

import { ArrowRight, FlaskConical, HeartPulse, Repeat2, ShieldCheck } from "lucide-react";
import { Reveal } from "@/components/motion/reveal";
import { Section } from "@/components/site/atoms";
import { Button } from "@/components/ui/button";
import { CmsDisplay, CmsText } from "@/components/site-editor/inline-edit";
import { ASSESSMENT_URL } from "@/cms/content";
import type { HomeData } from "@/lib/home-types";

const ICONS = [FlaskConical, ShieldCheck, HeartPulse, Repeat2] as const;
const TONES = ["tone-paper", "tone-deep", "tone-leaf", "tone-ink"] as const;

export function Science({ data }: { data: HomeData["science"] }) {
  return (
    <Section id="science" className="science">
      <Reveal variant="up" className="sec-head science-head">
        <span className="eyebrow">
          Step 2 · <CmsText kind="home" path="science.label">{data.label}</CmsText>
        </span>
        <CmsDisplay kind="home" path="science.title" as="h2" className="science-title">
          {data.title}
        </CmsDisplay>
        <CmsText kind="home" path="science.heading" multiline as="p" className="lead science-lead">
          {data.heading}
        </CmsText>
      </Reveal>

      <Reveal variant="up" stagger={0.1} className="cards sci-cards">
        {data.cards.map((card, index) => {
          const Icon = ICONS[index] ?? FlaskConical;
          return (
            <article key={card.title} className={`sci-card ${TONES[index] ?? TONES[0]}`}>
              <div className="sci-top">
                <span className="sci-ico">
                  <Icon aria-hidden />
                </span>
                <span className="sci-num">0{index + 1}</span>
              </div>
              <div className="sci-body">
                <CmsText
                  kind="home"
                  path={`science.cards.${index}.title`}
                  as="h3"
                  className="sci-title"
                >
                  {card.title}
                </CmsText>
                <CmsText
                  kind="home"
                  path={`science.cards.${index}.body`}
                  multiline
                  as="p"
                  className="sci-text"
                >
                  {card.body}
                </CmsText>
              </div>
            </article>
          );
        })}
      </Reveal>

      <Reveal variant="up" className="science-cta">
        <Button asChild size="lg">
          <a href={ASSESSMENT_URL} target="_blank" rel="noreferrer">
            Build your plan <ArrowRight aria-hidden />
          </a>
        </Button>
      </Reveal>
    </Section>
  );
}
