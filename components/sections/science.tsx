import { Reveal } from "@/components/motion/reveal";
import { PlateLabel, Plate, Display, Section } from "@/components/site/atoms";
import { Button } from "@/components/ui/button";
import { ASSESSMENT_URL } from "@/cms/content";
import type { HomeData } from "@/lib/home-types";

export function Science({ data }: { data: HomeData["science"] }) {
  const cards = data.cards ?? [];

  return (
    <Section id="science">
      <Plate inner={false} className="px-5 pt-8 pb-8 sm:px-8 md:pt-10 md:pb-0">
        <Reveal variant="up" duration={1}>
          <PlateLabel label={data.label} plate={data.plate} />
          <Display
            as="h2"
            className="mt-6 mb-10 max-w-[20ch] text-[clamp(1.65rem,6.5vw,2.1rem)] text-ink md:mb-12 md:text-[clamp(1.85rem,3vw,2.45rem)]"
          >
            {data.heading}
          </Display>
        </Reveal>

        <Reveal
          variant="up"
          stagger={0.1}
          className="hidden overflow-hidden rounded-[6px] border border-[var(--hairline-soft)] md:grid md:grid-cols-4 [&>*+*]:border-l [&>*+*]:border-[var(--hairline-soft)]"
        >
          {cards.map((card, i) => (
            <div key={i} className="flex min-h-[420px] flex-col justify-between p-6">
              <span className="font-display text-[1.45rem] leading-none text-terra">
                {String(i + 1).padStart(2, "0")}
              </span>
              <div>
                <h3 className="font-display text-[1.08rem] leading-[1.3] text-ink">{card.title}</h3>
                <p className="mt-3 text-[0.88rem] leading-[1.85] text-petrol">
                  {card.body.split("\n").map((line, j) => (
                    <span key={j} className="block">
                      {line}
                    </span>
                  ))}
                </p>
              </div>
            </div>
          ))}
        </Reveal>

        <Reveal variant="up" stagger={0.1} className="space-y-3 md:hidden">
          {cards.map((card, i) => (
            <div key={i} className="rounded-[8px] bg-parch p-6">
              <span className="font-display text-[1.3rem] leading-none text-terra">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-3 font-display text-[1.12rem] leading-[1.3] text-ink">
                {card.title}
              </h3>
              <p className="mt-2.5 text-[0.9rem] leading-[1.8] text-petrol">
                {card.body.split("\n").map((line, j) => (
                  <span key={j} className="block">
                    {line}
                  </span>
                ))}
              </p>
            </div>
          ))}
        </Reveal>

        <Reveal variant="up" className="mt-8 md:mt-0 md:pb-10">
          <Button
            asChild
            className="cta-long h-11 rounded-full bg-terra px-7 text-[0.68rem] font-bold tracking-[0.18em] uppercase text-paper hover:bg-terradeep"
          >
            <a href={ASSESSMENT_URL} target="_blank" rel="noreferrer">
              Explore the science — take the free quiz
            </a>
          </Button>
        </Reveal>
      </Plate>
    </Section>
  );
}
