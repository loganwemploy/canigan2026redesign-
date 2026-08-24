"use client";

import Image from "next/image";
import { Mail, Phone } from "lucide-react";
import { Reveal } from "@/components/motion/reveal";
import { DotRule, Section } from "@/components/site/atoms";
import { CmsDisplay, CmsPlateLabel, CmsText } from "@/components/site-editor/inline-edit";
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
            <CmsPlateLabel kind="home" path="about.label" label={about.label} />

            <CmsDisplay
              kind="home"
              path="about.heading"
              as="h2"
              className="mt-7 text-[clamp(1.65rem,2.9vw,2.25rem)] text-ink"
            >
              {about.heading}
            </CmsDisplay>

            <CmsText
              kind="home"
              path="about.body"
              multiline
              as="p"
              className="mt-7 max-w-[58ch] text-[1.05rem] leading-[1.8] text-petrol"
            >
              {about.body}
            </CmsText>

            <DotRule className="mt-8 max-w-[62ch]" />

            <div className="mt-6 flex flex-wrap gap-x-8 gap-y-3">
              <a
                href={telHref}
                className="inline-flex min-h-12 items-center gap-2 text-base font-bold text-terra hover:text-terradeep"
              >
                <Phone className="size-3.5" aria-hidden />
                <CmsText kind="home" path="about.phone">{about.phone}</CmsText>
              </a>
              <a
                href={`mailto:${about.email}`}
                className="inline-flex min-h-12 items-center gap-2 text-base font-bold text-terra hover:text-terradeep"
              >
                <Mail className="size-3.5" aria-hidden />
                <CmsText kind="home" path="about.email">{about.email}</CmsText>
              </a>
            </div>
          </Reveal>

          <Reveal
            variant="right"
            className="relative aspect-[4/3] min-h-[240px] md:aspect-auto md:min-h-[380px]"
          >
            <Image
              src={portrait}
              alt="Candy, founder of Canigan Health Options"
              fill
              sizes="(min-width: 768px) 45vw, 100vw"
              className="object-cover object-[62%_22%] md:object-[center_25%]"
            />
            <div className="pointer-events-none absolute inset-4 rounded-[6px] border border-[var(--paper-white)]/40" />
          </Reveal>
        </div>
      </Section>
  );
}
