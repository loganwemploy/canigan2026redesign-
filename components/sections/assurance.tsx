import { ShieldCheck, FlaskConical, HeartHandshake } from "lucide-react";
import { Reveal } from "@/components/motion/reveal";
import { Section } from "@/components/site/atoms";

const ITEMS = [
  {
    icon: ShieldCheck,
    title: "100% Money-Back Guarantee",
    body: "Try any product risk-free. If you don't love how you feel, Shaklee refunds it — the risk is entirely on us.",
  },
  {
    icon: FlaskConical,
    title: "Clinically Studied & Clean",
    body: "70 years of science, 100+ peer-reviewed studies, and 100,000+ quality tests a year. No artificial junk.",
  },
  {
    icon: HeartHandshake,
    title: "Free & No Obligation",
    body: "Take the personalized quiz, get your plan, and decide in your own time. No pressure, ever.",
  },
] as const;

/** Slim risk-reversal strip directly under the hero — removes buyer anxiety early. */
export function Assurance() {
  return (
    <Section>
      <div className="rounded-[10px] border border-[var(--hairline-soft)] bg-cream2 px-6 py-8 sm:px-10 sm:py-9">
        <Reveal variant="up" stagger={0.08}>
          <ul className="grid gap-8 sm:grid-cols-3 sm:gap-10">
            {ITEMS.map(({ icon: Icon, title, body }) => (
              <li key={title} className="flex gap-4">
                <span className="mt-0.5 grid size-10 shrink-0 place-items-center rounded-full bg-terra/10 text-terra">
                  <Icon className="size-5" aria-hidden />
                </span>
                <div>
                  <p className="font-display text-[1.05rem] italic leading-[1.3] text-ink">
                    {title}
                  </p>
                  <p className="mt-2 text-base leading-[1.7] text-petrol">{body}</p>
                </div>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </Section>
  );
}
