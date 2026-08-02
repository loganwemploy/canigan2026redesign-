import Image from "next/image";
import { Mail, Phone } from "lucide-react";
import { Reveal } from "@/components/motion/reveal";
import { DotRule, Display, PlateLabel, Section } from "@/components/site/atoms";
import { resolveImage } from "@/lib/drive";
import { FALLBACK_IMAGES } from "@/cms/content";
import type { HomeData } from "@/lib/home-types";

export function About({ about }: { about: HomeData["about"] }) {
  const portrait = resolveImage(about.image, FALLBACK_IMAGES.about);
  const telHref = `tel:${about.phone.replace(/[^0-9+]/g, "")}`;

  return (
    <Section id="about">
        <div className="grid overflow-hidden rounded-[10px] border border-[var(--hairline-soft)] bg-cream2 md:grid-cols-[1fr_0.8fr]">
          <Reveal variant="left" className="p-7 sm:p-10 lg:p-12">
            <PlateLabel label={about.label} plate={about.plate} />

            <Display
              as="h2"
              className="mt-7 text-[clamp(1.65rem,2.9vw,2.25rem)] text-ink"
            >
              {about.heading}
            </Display>

            <p className="mt-7 max-w-[58ch] text-[0.95rem] leading-[2] text-petrol">
              {about.body.split("\n").map((line, i) => (
                <span key={i} className="block">
                  {line}
                </span>
              ))}
            </p>

            <DotRule className="mt-8 max-w-[62ch]" />

            <div className="mt-6 flex flex-wrap gap-x-8 gap-y-3">
              <a
                href={telHref}
                className="inline-flex items-center gap-2 text-[0.78rem] font-bold text-terra hover:text-terradeep"
              >
                <Phone className="size-3.5" aria-hidden />
                {about.phone}
              </a>
              <a
                href={`mailto:${about.email}`}
                className="inline-flex items-center gap-2 text-[0.78rem] font-bold text-terra hover:text-terradeep"
              >
                <Mail className="size-3.5" aria-hidden />
                {about.email}
              </a>
            </div>
          </Reveal>

          <Reveal
            variant="right"
            className="relative aspect-square min-h-[300px] bg-white md:aspect-auto md:min-h-[520px]"
          >
            <Image
              src={portrait}
              alt="Canigan Health Options logo featuring Candy"
              fill
              sizes="(min-width: 768px) 45vw, 100vw"
              className="object-contain p-5 sm:p-8 md:p-10"
            />
            <div className="pointer-events-none absolute inset-4 rounded-[6px] border border-[var(--paper-white)]/40" />
          </Reveal>
        </div>
      </Section>
  );
}
