import Image from "next/image";
import { Reveal } from "@/components/motion/reveal";
import { PlateLabel, DotLeader, Display, Section } from "@/components/site/atoms";
import { Button } from "@/components/ui/button";
import { resolveImage } from "@/lib/drive";
import { FALLBACK_IMAGES } from "@/cms/content";
import type { HomeData } from "@/lib/home-types";

export function Opportunity({ data }: { data: HomeData["opportunity"] }) {
  const photo = resolveImage(data.image, FALLBACK_IMAGES.opportunity);
  const ambPhoto = resolveImage(data.ambImage, FALLBACK_IMAGES.ambassador);

  return (
    <Section id="opportunity">
      <div className="overflow-hidden rounded-[10px] border border-[var(--hairline-soft)] bg-cream2">
        {/* ── BLOCK 1 · headline (matches supplied mobile plate) ─────── */}
        <div className="bg-cream2 px-6 pt-8 pb-7 sm:px-10 sm:pt-10 sm:pb-9">
          <div className="grid gap-8 md:grid-cols-[1.35fr_1fr] md:items-start md:gap-10">
            <Reveal variant="up" duration={0.95}>
              <PlateLabel label={data.label} />
              <DotLeader count={16} className="mt-3 block" />
              <Display
                as="h2"
                className="mt-7 max-w-[18ch] text-[clamp(1.85rem,7.2vw,2.4rem)] text-pine md:max-w-[20ch] md:text-[clamp(2.05rem,4.2vw,3.2rem)]"
              >
                {data.heading}
              </Display>
            </Reveal>

            <Reveal variant="right" delay={0.12} duration={0.95} className="md:pt-10 md:text-right">
              <div>
                {data.bullets.map((bullet, i) => (
                  <p key={i} className="text-[0.95rem] leading-[2] text-ink">
                    {bullet.text}
                  </p>
                ))}
                <DotLeader count={8} className="mt-3 block md:ml-auto" />
              </div>
            </Reveal>
          </div>
        </div>

        {/* ── BLOCK 2 · photograph with portal arch ──────────────────── */}
        <Reveal
          variant="curtain"
          duration={1.15}
          className="relative aspect-[5/4] w-full sm:aspect-[16/10] md:aspect-[2.4/1]"
        >
          <Image
            src={photo}
            alt="A woman working from her phone at home"
            fill
            sizes="100vw"
            className="object-cover object-[center_30%]"
          />
          {/* tombstone / portal arch overlay */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-x-[8%] top-[6%] bottom-[-35%] rounded-t-[50%] border border-[var(--paper-white)]/45 md:inset-x-[22%] md:top-[4%] md:bottom-[-55%]"
          />
        </Reveal>

        {/* ── BLOCK 3 · ambassador band ──────────────────────────────── */}
        <div className="relative grid min-h-[320px] place-items-center overflow-hidden p-7 text-center sm:min-h-[420px] sm:p-10">
          <Image
            src={ambPhoto}
            alt=""
            fill
            sizes="100vw"
            className="object-cover object-[center_35%]"
          />
          <div aria-hidden className="absolute inset-0 bg-[hsl(151_33%_13%/0.76)]" />
          <div aria-hidden className="dot-grid-dark absolute inset-0 opacity-60" />

          <Reveal variant="up" delay={0.1} duration={0.95} className="relative z-10 max-w-[62ch]">
            <div>
              <Display as="h3" className="text-[clamp(1.65rem,3vw,2.35rem)] text-paper">
                {data.ambHeading}
              </Display>
              <p className="mt-5 text-[0.92rem] leading-[1.85] text-[var(--paper-white)]/85 sm:mt-6 sm:text-[0.95rem] sm:leading-[1.95]">
                {data.ambBody.split("\n").map((line, i) => (
                  <span key={i} className="block">
                    {line}
                  </span>
                ))}
              </p>
              <Button
                asChild
                className="mt-6 h-12 rounded-full bg-terra px-7 text-base font-bold text-paper hover:bg-terradeep sm:mt-8"
              >
                <a href="#contact">{data.ambCtaLabel}</a>
              </Button>
            </div>
          </Reveal>
        </div>
      </div>
    </Section>
  );
}
