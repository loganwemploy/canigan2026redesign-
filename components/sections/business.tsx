"use client";

import { ArrowRight, Plus } from "lucide-react";
import { Reveal } from "@/components/motion/reveal";
import { DotLeader, Section } from "@/components/site/atoms";
import { CmsDisplay, CmsText } from "@/components/site-editor/inline-edit";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import type { HomeData } from "@/lib/home-types";

export function Business({ data }: { data: HomeData["business"] }) {
  return (
    <Section id="business" className="business">
      {/* ── wide screens: every pillar laid out in a grid ── */}
      <div className="biz-desktop">
        <Reveal variant="up" stagger={0.08} className="biz-grid">
          <div className="biz-cell biz-intro">
            <CmsText kind="home" path="business.plate" className="label-caps">
              {data.plate}
            </CmsText>
            <CmsDisplay kind="home" path="business.heading" as="h2" className="biz-title">
              {data.heading}
            </CmsDisplay>
            <DotLeader count={9} className="biz-dots" />
            <Button asChild size="lg">
              <a href="#contact">
                Ask Candy how it works
                <ArrowRight aria-hidden />
              </a>
            </Button>
          </div>

          {data.items.map((item, i) => (
            <div key={i} className="biz-cell">
              <span className="biz-num" aria-hidden>
                {String(i + 1).padStart(2, "0")}
              </span>
              <CmsText kind="home" path={`business.items.${i}.title`} as="h3" className="biz-name">
                {item.title}
              </CmsText>
              <CmsText
                kind="home"
                path={`business.items.${i}.body`}
                multiline
                as="p"
                className="biz-body"
              >
                {item.body}
              </CmsText>
            </div>
          ))}
        </Reveal>
      </div>

      {/* ── phones: the same pillars as an accordion ── */}
      <div className="biz-mobile">
        <Reveal variant="up" className="biz-head">
          <CmsText kind="home" path="business.plate" className="label-caps">
            {data.plate}
          </CmsText>
          <CmsDisplay kind="home" path="business.heading" as="h2" className="biz-title">
            {data.heading}
          </CmsDisplay>
          <DotLeader count={9} className="biz-dots" />
        </Reveal>

        <Accordion type="single" collapsible className="biz-acc">
          {data.items.map((item, i) => (
            <AccordionItem key={i} value={`pillar-${i}`} className="biz-item">
              <AccordionTrigger className="biz-trigger items-center py-5 font-medium no-underline hover:no-underline">
                <span className="biz-trigger-label">
                  <CmsText kind="home" path={`business.items.${i}.title`}>{item.title}</CmsText>
                </span>
                <span aria-hidden className="biz-plus">
                  <Plus strokeWidth={1.75} />
                </span>
              </AccordionTrigger>
              <AccordionContent className="biz-content">
                <CmsText kind="home" path={`business.items.${i}.body`} multiline>
                  {item.body}
                </CmsText>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>

        <div className="biz-foot">
          <Button asChild size="lg">
            <a href="#contact">
              Ask Candy how it works
              <ArrowRight aria-hidden />
            </a>
          </Button>
        </div>
      </div>
    </Section>
  );
}
