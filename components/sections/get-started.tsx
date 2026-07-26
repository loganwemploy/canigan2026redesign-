import { ArrowDown, ArrowRight } from "lucide-react";
import { Reveal } from "@/components/motion/reveal";
import { DotRule, Display, Plate, PlateLabel, Section } from "@/components/site/atoms";
import { Button } from "@/components/ui/button";
import type { HomeData } from "@/lib/home-types";

export function GetStarted({ data }: { data: HomeData["getStarted"] }) {
  const steps = data.steps ?? [];
  const lastIndex = steps.length - 1;

  return (
    <Section id="start">
      <Plate inner={false} className="dot-grid px-7 py-10 sm:px-10 sm:py-12">
        <Reveal variant="up">
          <PlateLabel label={data.label} plate={data.plate} />
          <Display
            as="h2"
            className="mt-7 max-w-[40ch] text-[clamp(1.65rem,2.9vw,2.2rem)] leading-[1.38] text-ink"
          >
            {data.heading}
          </Display>
        </Reveal>

        {/* deliberate void */}
        <div aria-hidden className="min-h-[180px] md:min-h-[240px]" />

        <DotRule />

        <div className="mt-7">
          {/* desktop rail */}
          <Reveal
            variant="up"
            stagger={0.1}
            className="hidden gap-6 md:grid md:grid-cols-4"
          >
            {steps.map((step, i) => (
              <div key={i} className="relative pr-7">
                <span className="font-display block text-[2.1rem] leading-none text-terra">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="label-caps mt-3 block text-[0.68rem] text-petrol">
                  {step.label}
                </span>
                {i !== lastIndex ? (
                  <ArrowRight aria-hidden className="absolute right-0 top-3 size-4 text-inksoft" />
                ) : null}
              </div>
            ))}
          </Reveal>

          {/* mobile rail */}
          <Reveal variant="up" stagger={0.1} className="space-y-5 md:hidden">
            {steps.map((step, i) => (
              <div key={i}>
                <span className="font-display block text-[2.1rem] leading-none text-terra">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="label-caps mt-3 block text-[0.68rem] text-petrol">
                  {step.label}
                </span>
                {i !== lastIndex ? (
                  <ArrowDown aria-hidden className="mt-3 size-4 text-inksoft" />
                ) : null}
              </div>
            ))}
          </Reveal>
        </div>

        <Reveal variant="up" className="mt-10">
          <Button
            asChild
            className="h-11 rounded-full bg-terra px-7 text-[0.68rem] font-bold tracking-[0.18em] uppercase text-paper hover:bg-terradeep"
          >
            <a href={data.primaryCta.url} target="_blank" rel="noreferrer">
              {data.primaryCta.label}
            </a>
          </Button>
        </Reveal>
      </Plate>
    </Section>
  );
}
