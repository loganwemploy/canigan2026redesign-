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
    <section className="sec positioning">
      <div className="wrap">
        <Reveal variant="up">
          <p className="statement">
            {audience?.positioningLead ?? "Canigan doesn't sell you more stuff."}{" "}
            <em>{audience?.positioningAccent ?? "It gives you a plan that fits real life."}</em>
          </p>
        </Reveal>

        <Reveal variant="up" stagger={0.1} className="stats proof">
          {PROOF.map(({ icon: Icon, value, label }) => (
            <div key={value} className="stat">
              <Icon className="proof-ico" aria-hidden />
              <b>{value}</b>
              <span>{label}</span>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
