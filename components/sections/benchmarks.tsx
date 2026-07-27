import { Check } from "lucide-react";
import { Reveal } from "@/components/motion/reveal";
import { CountUp } from "@/components/motion/effects";
import { DotRule, Display, Plate, Section } from "@/components/site/atoms";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { HomeData } from "@/lib/home-types";

/** Filled pine medallion when the level is active, hollow hairline ring when it is not. */
function ActiveMark({ active }: { active: boolean }) {
  if (!active) {
    return (
      <span
        aria-label="Not active"
        role="img"
        className="inline-grid size-6 place-items-center rounded-full border border-[var(--hairline)]"
      />
    );
  }
  return (
    <span
      aria-label="Active"
      role="img"
      className="inline-grid size-6 place-items-center rounded-full bg-pine"
    >
      <Check className="size-3.5 text-paper" strokeWidth={3} />
    </span>
  );
}

const HEAD_CELL =
  "label-caps h-auto px-4 pt-0 pb-4 text-[0.58rem] whitespace-nowrap text-petrol first:pl-0 last:pr-0";
const BODY_CELL = "px-4 py-8 align-middle first:pl-0 last:pr-0";

export function Benchmarks({ data }: { data: HomeData["benchmarks"] }) {
  const external = /^https?:\/\//i.test(data.cta.url);

  return (
    <Section id="benchmarks">
      <Plate inner={false} className="dot-grid px-6 py-10 sm:px-9 sm:py-12">
        <Reveal variant="up">
          <div>
            <div className="flex items-center gap-4">
              <span className="label-caps text-[0.62rem] whitespace-nowrap text-ink">
                {data.label}
              </span>
              <DotRule className="flex-1" />
            </div>
            <Display
              as="h2"
              className="mt-6 mb-10 text-[clamp(1.85rem,3vw,2.45rem)] text-ink"
            >
              {data.heading}
            </Display>
          </div>
        </Reveal>

        {/* ---------- desktop plate ---------- */}
        <div className="hidden md:block">
          <Table className="border-separate border-spacing-0">
            <TableHeader className="[&_tr]:border-b-0">
              <TableRow className="border-b border-[var(--hairline)] hover:bg-transparent">
                <TableHead className={HEAD_CELL}>Partnership Level</TableHead>
                <TableHead className={HEAD_CELL}>Description</TableHead>
                <TableHead className={HEAD_CELL}>Monthly Range</TableHead>
                <TableHead className={HEAD_CELL}>Avg. Monthly</TableHead>
                <TableHead className={HEAD_CELL}>Yearly Average</TableHead>
                <TableHead className={`${HEAD_CELL} text-right`}>Active</TableHead>
              </TableRow>
            </TableHeader>
            <Reveal as={TableBody} variant="up" stagger={0.07}>
              {data.rows.map((row, i) => (
                <TableRow
                  key={`${row.level}-${i}`}
                  className="border-b border-[var(--hairline-soft)] transition-colors hover:bg-parch/45"
                >
                  <TableCell className={`${BODY_CELL} font-display text-[1.05rem] text-ink`}>
                    {row.level}
                  </TableCell>
                  <TableCell
                    className={`${BODY_CELL} max-w-[34ch] text-[0.76rem] leading-[1.7] whitespace-normal text-petrol`}
                  >
                    {row.description}
                  </TableCell>
                  <TableCell className={`${BODY_CELL} text-[0.78rem] text-inksoft`}>
                    {row.monthlyRange}
                  </TableCell>
                  <TableCell className={`${BODY_CELL} text-[0.86rem] font-bold text-ink`}>
                    <CountUp value={row.avgMonthly} />
                  </TableCell>
                  <TableCell className={`${BODY_CELL} text-[0.78rem] text-inksoft`}>
                    {row.yearlyAverage}
                  </TableCell>
                  <TableCell className={`${BODY_CELL} text-right`}>
                    <ActiveMark active={row.active} />
                  </TableCell>
                </TableRow>
              ))}
            </Reveal>
          </Table>
        </div>

        {/* ---------- mobile cards ---------- */}
        <Reveal variant="up" stagger={0.07} className="space-y-3 md:hidden">
          {data.rows.map((row, i) => (
            <div key={`${row.level}-${i}`} className="rounded-[8px] bg-parch p-5">
              <div className="flex items-start justify-between gap-4">
                <h3 className="font-display text-[1.2rem] leading-[1.3] text-ink">{row.level}</h3>
                <ActiveMark active={row.active} />
              </div>
              <div className="mt-3 flex items-baseline gap-3">
                <CountUp
                  value={row.avgMonthly}
                  className="font-display text-[1.6rem] leading-[1.2] text-terra"
                />
                <span className="text-[0.88rem] text-inksoft">{row.yearlyAverage}</span>
              </div>
              <p className="mt-3 text-[0.9rem] leading-[1.8] text-petrol">{row.description}</p>
              <p className="mt-2 text-[0.8rem] text-inksoft">{row.monthlyRange}</p>
            </div>
          ))}
        </Reveal>

        {/* ---------- footer ---------- */}
        <Reveal variant="fade" className="mt-8 block">
          <p className="max-w-[68ch] text-[0.8rem] leading-[1.8] italic text-inksoft">
            {data.disclaimer.split("\n").map((line, i) => (
              <span key={i} className="block">
                {line}
              </span>
            ))}
          </p>
          <Button
            asChild
            className="cta-long mt-6 h-11 rounded-full bg-terra px-7 text-[0.68rem] font-bold tracking-[0.18em] uppercase text-paper hover:bg-terradeep"
          >
            {external ? (
              <a href={data.cta.url} target="_blank" rel="noreferrer">
                {data.cta.label}
              </a>
            ) : (
              <a href={data.cta.url}>{data.cta.label}</a>
            )}
          </Button>
        </Reveal>
      </Plate>
    </Section>
  );
}
