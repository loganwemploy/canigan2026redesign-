import { FlaskConical, HeartHandshake, ShieldCheck } from "lucide-react";
import { Reveal } from "@/components/motion/reveal";
import type { AudienceProfile } from "@/lib/audiences";

const PROOF = [
  { icon: FlaskConical, value: "70 years", label: "of clinical science" },
  { icon: ShieldCheck, value: "100,000+", label: "quality tests each year" },
  { icon: HeartHandshake, value: "100%", label: "money-back guarantee" },
] as const;

export function Positioning({ audience }: { audience?: AudienceProfile }) {
  return (
    <section className="bg-cream px-5 py-24 sm:px-9 sm:py-32 lg:py-40">
      <div className="section-shell text-center">
        <Reveal variant="up">
          <p className="mx-auto max-w-[970px] text-[clamp(2.4rem,4.8vw,5.25rem)] font-bold leading-[1.02] tracking-[-0.058em] text-ink">
            {audience?.positioningLead ?? "Canigan doesn't sell you more stuff."}
            <span className="block text-forest">{audience?.positioningAccent ?? "It gives you a plan that fits real life."}</span>
          </p>
        </Reveal>

        <Reveal variant="up" stagger={0.1} className="mx-auto mt-20 grid max-w-[980px] gap-4 sm:grid-cols-3">
          {PROOF.map(({ icon: Icon, value, label }) => (
            <div key={value} className="rounded-[24px] border border-[var(--hairline-soft)] bg-white p-7 text-left">
              <Icon className="size-5 text-forest" aria-hidden />
              <strong className="mt-8 block text-3xl tracking-[-0.045em] text-ink">{value}</strong>
              <span className="mt-1 block text-sm text-inksoft">{label}</span>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
