import { ArrowUpRight, Check } from "lucide-react";
import { Reveal } from "@/components/motion/reveal";
import { DotRule, Display, Plate, Section } from "@/components/site/atoms";
import { Button } from "@/components/ui/button";
import type { HomeData } from "@/lib/home-types";

const PROGRAM_DETAILS = [
  {
    value: "15%",
    label: "Member pricing",
    body: "Current Members receive 15% off product pricing.",
  },
  {
    value: "5–15%",
    label: "Product points",
    body: "Qualifying consecutive loyalty orders of $100 or more can earn product points that increase over time.",
  },
  {
    value: "10%+",
    label: "Customer-sales tier",
    body: "The current Ambassador customer-sales commission structure begins at 10%; qualifications and plan rules apply.",
  },
  {
    value: "$50 + $25",
    label: "Qualifying Star Club structure",
    body: "Current rules list $50 per qualifying $500 in first-order product sales from at least three new enrollments, with a possible $25 qualifying Ambassador-paired boost.",
  },
] as const;

export function Benchmarks({ data }: { data: HomeData["benchmarks"] }) {
  return (
    <Section id="benchmarks" data-claims-mode="verified-program-details" data-source-label={data.label}>
      <Plate inner={false} className="dot-grid px-6 py-10 sm:px-9 sm:py-12">
        <Reveal variant="up">
          <div className="flex items-center gap-4">
            <span className="label-caps whitespace-nowrap text-[0.62rem] text-ink">Current program details</span>
            <DotRule className="flex-1" />
          </div>
          <Display as="h2" className="mt-6 max-w-[28ch] text-[clamp(1.85rem,3vw,2.45rem)] text-ink">
            Savings and sales terms, without the income theater.
          </Display>
          <p className="mt-4 max-w-[68ch] text-sm leading-7 text-inksoft">
            These are program mechanics—not typical earnings, a forecast, or a promise. Candy will confirm the current official terms before you choose.
          </p>
        </Reveal>

        <Reveal variant="up" stagger={0.08} className="mt-10 grid gap-3 md:grid-cols-2 xl:grid-cols-4">
          {PROGRAM_DETAILS.map((detail) => (
            <article key={detail.label} data-program-detail className="flex min-h-[250px] flex-col rounded-[18px] border border-[var(--hairline-soft)] bg-cream2 p-6">
              <span className="text-[clamp(2rem,3.5vw,3.25rem)] font-bold tracking-[-0.055em] text-forest">{detail.value}</span>
              <h3 className="mt-2 text-sm font-bold text-ink">{detail.label}</h3>
              <p className="mt-5 text-sm leading-7 text-petrol">{detail.body}</p>
              <Check className="mt-auto size-4 text-forest" aria-hidden />
            </article>
          ))}
        </Reveal>

        <Reveal variant="fade" className="mt-8 block">
          <p className="max-w-[78ch] text-[0.78rem] leading-[1.8] italic text-inksoft">
            Member value and Ambassador compensation are separate. Product points are not cash. Ambassador earnings depend on qualifying customer product sales, expenses, skill, and effort and are not guaranteed. Terms can change.
          </p>
          <div className="mt-5 flex flex-wrap gap-3">
            <Button asChild className="h-11 rounded-full bg-terra px-7 text-[0.68rem] font-bold uppercase tracking-[0.18em] text-paper hover:bg-terradeep">
              <a href="#contact">Review my options with Candy</a>
            </Button>
            <a href="https://images.shaklee.com/ShakleeCompPlanENG.pdf" target="_blank" rel="noreferrer" className="inline-flex h-11 items-center rounded-full border border-forest/25 px-5 text-xs font-bold text-forest hover:bg-white">
              Official compensation summary <ArrowUpRight className="ml-2 size-3.5" aria-hidden />
            </a>
          </div>
        </Reveal>
      </Plate>
    </Section>
  );
}
