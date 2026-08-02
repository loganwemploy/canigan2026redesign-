import { Check, X } from "lucide-react";
import { Reveal } from "@/components/motion/reveal";
import { Section } from "@/components/site/atoms";
import type { HomeData } from "@/lib/home-types";

const OLD_WAY = ["Generic wellness advice", "Products without a clear plan", "Trying to piece it together alone"];
const CANIGAN_WAY = ["A free personalized assessment", "A simple, science-backed routine", "Candy beside you for the follow-through"];

export function Challenge({ data }: { data: HomeData["challenge"] }) {
  return (
    <Section id="challenge" className="bg-white py-20 sm:py-28 lg:py-36">
      <Reveal variant="up" className="grid gap-12 lg:grid-cols-[0.82fr_1.18fr] lg:gap-24">
        <div>
          <span className="text-sm font-bold text-inksoft">01 / A better starting point</span>
          <h2 className="mt-6 max-w-[12ch] text-[clamp(2.8rem,5vw,5.5rem)] font-bold leading-[0.96] tracking-[-0.06em] text-ink">
            You don&apos;t need more wellness noise.
          </h2>
        </div>

        <div className="lg:pt-16">
          <p className="max-w-[54ch] text-xl leading-8 text-ink/80">{data.body.replace(/\n/g, " ")}</p>
          <div className="mt-12 grid gap-8 md:grid-cols-2">
            <div>
              <span className="inline-flex rounded-full bg-ink px-4 py-2 text-xs font-bold text-white">Before Canigan</span>
              <ul className="mt-6 space-y-5">
                {OLD_WAY.map((item) => <li key={item} className="flex gap-3 text-base text-ink/75"><X className="mt-0.5 size-5 shrink-0" aria-hidden />{item}</li>)}
              </ul>
            </div>
            <div>
              <span className="inline-flex rounded-full bg-[#0a9875] px-4 py-2 text-xs font-bold text-white">With Canigan</span>
              <ul className="mt-6 space-y-5">
                {CANIGAN_WAY.map((item) => <li key={item} className="flex gap-3 text-base font-semibold text-[#0a9875]"><Check className="mt-0.5 size-5 shrink-0" aria-hidden />{item}</li>)}
              </ul>
            </div>
          </div>
        </div>
      </Reveal>
    </Section>
  );
}
