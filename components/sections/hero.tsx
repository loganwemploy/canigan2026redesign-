"use client";

import Image from "next/image";
import { ArrowRight, Check, FlaskConical, HeartPulse, Sparkles, Video } from "lucide-react";
import { Reveal } from "@/components/motion/reveal";
import { Display } from "@/components/site/atoms";
import { ZoomInviteDialog } from "@/components/sections/zoom-invite";
import { Button } from "@/components/ui/button";
import { CmsText } from "@/components/site-editor/inline-edit";
import { useSiteEditor } from "@/components/site-editor/editor-context";
import { resolveImage } from "@/lib/drive";
import { FALLBACK_IMAGES } from "@/cms/content";
import type { HomeData, ZoomMeeting } from "@/lib/home-types";
import type { AudienceProfile } from "@/lib/audiences";

const TASKS = [
  { time: "Today", title: "Health quiz completed", detail: "Your goals are mapped", icon: HeartPulse },
  { time: "Next", title: "Personal plan ready", detail: "Simple daily recommendations", icon: FlaskConical },
  { time: "Ongoing", title: "Candy follows through", detail: "Real guidance from a real person", icon: Sparkles },
] as const;

/** Decorative ticker under the hero (the Emberleaf marquee). */
const MARQUEE_WORDS = [
  "Practical nutrition",
  "Healthy aging",
  "Strength",
  "Member savings",
  "Real follow-through",
  "Candy beside you",
];

export function Hero({
  data,
  meeting,
  sectionId = "top",
  audience,
}: {
  data: HomeData["hero"];
  meeting?: ZoomMeeting | null;
  sectionId?: string;
  audience?: AudienceProfile;
}) {
  const src = resolveImage(data.image, FALLBACK_IMAGES.hero);
  const tasks = audience?.heroTasks ?? TASKS;
  const { enabled } = useSiteEditor();

  return (
    <section id={sectionId} className="hero hero-canigan">
      <div className="wrap">
        <Reveal variant="up" className="hero-copy">
          <span className="eyebrow">
            {audience?.heroEyebrow ?? "Personalized wellness with a human guide"}
          </span>

          {enabled ? (
            <h2 className="hero-title">
              <CmsText kind="home" path="hero.title" multiline as="span">
                {data.title}
              </CmsText>
            </h2>
          ) : (
            <Display as="h2" reveal="hero" className="hero-title">
              {data.title}
            </Display>
          )}

          <CmsText kind="home" path="hero.welcome" multiline as="p" className="lead">
            {data.welcome}
          </CmsText>

          <div className="cta">
            <Button asChild size="lg" data-magnet>
              <a href={data.primaryCta.url} target="_blank" rel="noreferrer">
                <CmsText kind="home" path="hero.primaryCta.label">
                  {data.primaryCta.label}
                </CmsText>
                <ArrowRight aria-hidden />
              </a>
            </Button>
            {audience ? (
              <Button asChild variant="outline" size="lg" data-magnet>
                <a href={data.secondaryCta.url}>
                  <CmsText kind="home" path="hero.secondaryCta.label">
                    {data.secondaryCta.label}
                  </CmsText>
                </a>
              </Button>
            ) : (
              <ZoomInviteDialog meeting={meeting}>
                <Button type="button" variant="outline" size="lg" data-magnet>
                  <Video aria-hidden />
                  Join Candy live
                </Button>
              </ZoomInviteDialog>
            )}
          </div>
        </Reveal>

        <Reveal variant="up" delay={0.1} duration={1.1} className="hero-stage">
          <figure className="hero-photo">
            <Image
              src={src}
              alt={audience?.heroImageAlt ?? "Candy of Canigan Health Options"}
              fill
              priority
              sizes="(min-width:1024px) 720px, (min-width:640px) 90vw, 100vw"
              className="object-cover hero-focal"
            />
          </figure>

          <ul className="list static hero-tasks">
            {tasks.map((task, index) => {
              const Icon = (TASKS[index] ?? TASKS[0]).icon;
              const { time, title, detail } = task;
              return (
                <li key={title} className="li">
                  <span className="av" aria-hidden>
                    <Icon className="size-5" />
                  </span>
                  <div>
                    <span className="tag">{time}</span>
                    <h3>{title}</h3>
                    <small>{detail}</small>
                  </div>
                  <span className="chev" aria-hidden>
                    <Check className="size-4" />
                  </span>
                </li>
              );
            })}
          </ul>
        </Reveal>
      </div>

      <div className="marquee" aria-hidden>
        <div className="track">
          {[0, 1].map((copy) =>
            MARQUEE_WORDS.map((word) => (
              <span key={`${copy}-${word}`}>
                {word} <b>✦</b>
              </span>
            )),
          )}
        </div>
      </div>
    </section>
  );
}
