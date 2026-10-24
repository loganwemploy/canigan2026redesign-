"use client";

import Image from "next/image";
import { Mail, Phone } from "lucide-react";
import { Reveal } from "@/components/motion/reveal";
import { DotRule, Section } from "@/components/site/atoms";
import { CmsDisplay, CmsPlateLabel, CmsText } from "@/components/site-editor/inline-edit";
import { useSiteEditor } from "@/components/site-editor/editor-context";
import { Button } from "@/components/ui/button";
import { resolveImage } from "@/lib/drive";
import { FALLBACK_IMAGES } from "@/cms/content";
import type { HomeData } from "@/lib/home-types";

/**
 * Email addresses have no natural line break, so a narrow pill would split one mid-word.
 * Offer a single break after the "@". The editor keeps the plain editable text, so what
 * gets saved is never touched.
 */
function AboutEmail({ value }: { value: string }) {
  const { enabled } = useSiteEditor();
  if (enabled) {
    return (
      <CmsText kind="home" path="about.email" className="about-email">
        {value}
      </CmsText>
    );
  }
  const at = value.indexOf("@");
  if (at < 0) return <span className="about-email">{value}</span>;
  return (
    <span className="about-email">
      {value.slice(0, at + 1)}
      <wbr />
      {value.slice(at + 1)}
    </span>
  );
}

export function About({ about }: { about: HomeData["about"] }) {
  const portrait = resolveImage(about.image, FALLBACK_IMAGES.about);
  const telHref = `tel:${about.phone.replace(/[^0-9+]/g, "")}`;

  return (
    <Section id="about" className="about">
      <div className="about-grid">
        <Reveal variant="left" className="about-copy">
          <CmsPlateLabel kind="home" path="about.label" label={about.label} />

          <CmsDisplay kind="home" path="about.heading" as="h2" className="about-title">
            {about.heading}
          </CmsDisplay>

          <CmsText kind="home" path="about.body" multiline as="p" className="lead about-body">
            {about.body}
          </CmsText>

          <DotRule className="about-rule" />

          <div className="about-contact">
            <Button asChild variant="outline">
              <a href={telHref}>
                <Phone aria-hidden />
                <CmsText kind="home" path="about.phone">{about.phone}</CmsText>
              </a>
            </Button>
            <Button asChild variant="outline">
              <a href={`mailto:${about.email}`}>
                <Mail aria-hidden />
                <AboutEmail value={about.email} />
              </a>
            </Button>
          </div>
        </Reveal>

        <Reveal variant="right" className="about-photo">
          <Image
            src={portrait}
            alt="Candy, founder of Canigan Health Options"
            fill
            sizes="(min-width: 768px) 45vw, 100vw"
            className="object-cover"
          />
        </Reveal>
      </div>
    </Section>
  );
}
