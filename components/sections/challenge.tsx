"use client";

import { Check, X } from "lucide-react";
import { Reveal } from "@/components/motion/reveal";
import { Section } from "@/components/site/atoms";
import { CmsDisplay, CmsText } from "@/components/site-editor/inline-edit";
import type { HomeData } from "@/lib/home-types";
import type { AudienceProfile } from "@/lib/audiences";

const OLD_WAY = ["Generic wellness advice", "Products without a clear plan", "Trying to piece it together alone"];
const CANIGAN_WAY = ["A free personalized assessment", "A simple, science-backed routine", "Candy beside you for the follow-through"];

export function Challenge({ data, audience }: { data: HomeData["challenge"]; audience?: AudienceProfile }) {
  const oldWay = audience?.oldWay ?? OLD_WAY;
  const caniganWay = audience?.caniganWay ?? CANIGAN_WAY;
  return (
    <Section id="challenge" className="challenge">
      <Reveal variant="up" className="sec-head challenge-head">
        <span className="eyebrow">Step 1 · A better starting point</span>
        <CmsDisplay kind="home" path="challenge.heading" as="h2" className="challenge-title">
          {audience?.challengeTitle ?? data.heading}
        </CmsDisplay>
      </Reveal>

      <Reveal variant="up" className="challenge-body">
        <CmsText kind="home" path="challenge.body" multiline as="p" className="lead">
          {data.body}
        </CmsText>

        <div className="compare">
          <div className="compare-card compare-old">
            <span className="label-caps">Before Canigan</span>
            <ul>
              {oldWay.map((item) => (
                <li key={item}>
                  <span className="compare-ico" aria-hidden>
                    <X />
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="compare-card compare-new">
            <span className="label-caps">With Canigan</span>
            <ul>
              {caniganWay.map((item) => (
                <li key={item}>
                  <span className="compare-ico" aria-hidden>
                    <Check />
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Reveal>
    </Section>
  );
}
