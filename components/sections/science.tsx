import { ArrowRight, FlaskConical, HeartPulse, Repeat2, ShieldCheck } from "lucide-react";
import { Reveal } from "@/components/motion/reveal";
import { Section } from "@/components/site/atoms";
import { Button } from "@/components/ui/button";
import { ASSESSMENT_URL } from "@/cms/content";
import type { HomeData } from "@/lib/home-types";

const ICONS = [FlaskConical, ShieldCheck, HeartPulse, Repeat2] as const;
const TONES = ["bg-white text-ink", "bg-forest-deep text-white", "bg-forest text-white", "bg-petrol text-white"] as const;

export function Science({ data }: { data: HomeData["science"] }) {
  return (
    <Section id="science" className="pb-20 sm:pb-28">
      <Reveal variant="up" className="mb-12 grid gap-6 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
        <div>
          <span className="text-base font-bold text-inksoft">Step 2 · {data.label}</span>
          <h2 className="mt-5 max-w-[16ch] text-[clamp(2.5rem,4.5vw,4.6rem)] font-bold leading-[1.06] tracking-[-0.035em] text-ink">
            {data.title}
          </h2>
        </div>
        <p className="max-w-[52ch] text-xl leading-9 text-ink/90 lg:justify-self-end">{data.heading}</p>
      </Reveal>

      <Reveal variant="up" stagger={0.1} className="grid gap-4 md:grid-cols-2">
        {data.cards.map((card, index) => {
          const Icon = ICONS[index] ?? FlaskConical;
          return (
            <article key={card.title} className={`${TONES[index] ?? TONES[0]} flex min-h-[330px] flex-col rounded-[24px] p-7 sm:p-9`}>
              <div className="flex items-start justify-between">
                <span className="grid size-12 place-items-center rounded-xl border border-current/15"><Icon className="size-6" aria-hidden /></span>
                <span className="text-base font-bold opacity-80">0{index + 1}</span>
              </div>
              <div className="mt-auto max-w-[38rem]">
                <h3 className="text-[clamp(1.7rem,3vw,3rem)] font-bold leading-[1.08] tracking-[-0.025em]">{card.title}</h3>
                <p className="mt-5 max-w-[50ch] text-base leading-7 opacity-80">{card.body.replace(/\n/g, " ")}</p>
              </div>
            </article>
          );
        })}
      </Reveal>

      <Reveal variant="up" className="mt-8 flex justify-center">
        <Button asChild className="h-14 rounded-full bg-terra px-9 text-base font-bold text-white hover:bg-terradeep">
          <a href={ASSESSMENT_URL} target="_blank" rel="noreferrer">Build your plan <ArrowRight className="ml-2 size-4" aria-hidden /></a>
        </Button>
      </Reveal>
    </Section>
  );
}
