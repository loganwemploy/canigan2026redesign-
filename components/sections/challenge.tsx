"use client";

import { Check, X } from "lucide-react";
import { Reveal } from "@/components/motion/reveal";
import { Section } from "@/components/site/atoms";
import { CmsText } from "@/components/site-editor/inline-edit";
import type { HomeData } from "@/lib/home-types";
import type { AudienceProfile } from "@/lib/audiences";

const OLD_WAY = ["Generic wellness advice", "Products without a clear plan", "Trying to piece it together alone"];
const CANIGAN_WAY = ["A free personalized assessment", "A simple, science-backed routine", "Candy beside you for the follow-through"];

export function Challenge({ data, audience }: { data: HomeData["challenge"]; audience?: AudienceProfile }) {
  const oldWay = audience?.oldWay ?? OLD_WAY;
  const caniganWay = audience?.caniganWay ?? CANIGAN_WAY;
  return (
    <Section id="challenge" className="bg-white py-20 sm:py-28 lg:py-36">
      <Reveal variant="up" className="grid gap-12 lg:grid-cols-[0.82fr_1.18fr] lg:gap-24">
        <div>
          <span className="text-base font-bold text-inksoft">Step 1 · A better starting point</span>
          <CmsText
            kind="home"
            path="challenge.heading"
            multiline
            as="h2"
            className="mt-6 max-w-[14ch] text-[clamp(2.6rem,5vw,5.2rem)] font-bold leading-[1.04] tracking-[-0.035em] text-ink"
          >
            {audience?.challengeTitle ?? data.heading}
          </CmsText>
        </div>

        <div className="lg:pt-16">
          <CmsText
            kind="home"
            path="challenge.body"
            multiline
            as="p"
            className="max-w-[54ch] text-xl leading-8 text-ink/80"
          >
            {data.body}
          </CmsText>
          <div className="mt-12 grid gap-8 md:grid-cols-2">
            <div>
              <span className="inline-flex min-h-12 items-center rounded-full bg-ink px-5 py-2 text-base font-bold text-white">Before Canigan</span>
              <ul className="mt-6 space-y-5">
                {oldWay.map((item) => <li key={item} className="flex gap-3 text-base text-ink/90"><X className="mt-0.5 size-5 shrink-0" aria-hidden />{item}</li>)}
              </ul>
            </div>
            <div>
              <span className="inline-flex min-h-12 items-center rounded-full bg-forest px-5 py-2 text-base font-bold text-white">With Canigan</span>
              <ul className="mt-6 space-y-5">
                {caniganWay.map((item) => <li key={item} className="flex gap-3 text-base font-semibold text-forest"><Check className="mt-0.5 size-5 shrink-0" aria-hidden />{item}</li>)}
              </ul>
            </div>
          </div>
        </div>
      </Reveal>
    </Section>
  );
}
