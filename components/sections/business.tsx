"use client";

import { Plus } from "lucide-react";
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
    <Section id="business">
      <div className="hidden overflow-hidden rounded-[10px] border border-[var(--hairline-soft)] bg-cream2 md:block">
        <Reveal
          variant="up"
          stagger={0.08}
          className="-mr-px -mb-px grid grid-cols-3 [&>*]:border-r [&>*]:border-b [&>*]:border-[var(--hairline-soft)]"
        >
          <div className="dot-grid flex min-h-[270px] flex-col p-7">
            <CmsText kind="home" path="business.plate" className="font-display text-[0.88rem] text-terra">
              {data.plate}
            </CmsText>
            <CmsDisplay
              kind="home"
              path="business.heading"
              as="h2"
              className="mt-5 text-[clamp(1.65rem,2.6vw,2.25rem)] text-ink"
            >
              {data.heading}
            </CmsDisplay>
            <DotLeader count={9} className="mt-4 block" />
            <Button
              asChild
              className="mt-auto h-12 self-start rounded-full bg-terra px-6 text-base font-bold text-paper hover:bg-terradeep"
            >
              <a href="#contact">Ask Candy how it works</a>
            </Button>
          </div>

          {data.items.map((item, i) => (
            <div key={i} className="min-h-[270px] p-7">
              <CmsText
                kind="home"
                path={`business.items.${i}.title`}
                as="h3"
                className="font-display text-[1.12rem] leading-[1.3] text-ink"
              >
                {item.title}
              </CmsText>
              <CmsText
                kind="home"
                path={`business.items.${i}.body`}
                multiline
                as="p"
                className="mt-3.5 text-base leading-[1.75] text-petrol"
              >
                {item.body}
              </CmsText>
            </div>
          ))}
        </Reveal>
      </div>

      <div className="overflow-hidden rounded-[10px] border border-[var(--hairline-soft)] md:hidden">
        <Reveal variant="up">
          <div className="dot-grid bg-cream2 p-7">
            <CmsText kind="home" path="business.plate" className="font-display text-[0.88rem] text-terra">
              {data.plate}
            </CmsText>
            <CmsDisplay kind="home" path="business.heading" as="h2" className="mt-5 text-[clamp(1.65rem,7vw,2.15rem)] text-ink">
              {data.heading}
            </CmsDisplay>
            <DotLeader count={9} className="mt-4 block" />
          </div>
        </Reveal>

        <Accordion type="single" collapsible className="bg-cream2">
          {data.items.map((item, i) => (
            <AccordionItem
              key={i}
              value={`pillar-${i}`}
              className="border-t border-b-0 border-[var(--hairline-soft)] px-7"
            >
              <AccordionTrigger className="group py-5 text-left font-display text-[1.12rem] leading-[1.3] text-ink hover:no-underline [&>svg]:hidden">
                <span className="pr-4">
                  <CmsText kind="home" path={`business.items.${i}.title`}>{item.title}</CmsText>
                </span>
                <span
                  aria-hidden
                  className="mt-1 shrink-0 text-terra transition-transform duration-200 group-data-[state=open]:rotate-45"
                >
                  <Plus className="size-4" strokeWidth={1.5} />
                </span>
              </AccordionTrigger>
              <AccordionContent className="pb-6 text-base leading-[1.75] text-petrol">
                <CmsText kind="home" path={`business.items.${i}.body`} multiline>
                  {item.body}
                </CmsText>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>

        <div className="border-t border-[var(--hairline-soft)] bg-cream2 px-7 py-6">
          <Button
            asChild
            className="h-12 w-full rounded-full bg-terra px-7 text-base font-bold text-paper hover:bg-terradeep"
          >
            <a href="#contact">Ask Candy how it works</a>
          </Button>
        </div>
      </div>
    </Section>
  );
}
