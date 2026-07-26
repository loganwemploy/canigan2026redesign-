import Image from "next/image";
import { ArrowRight, Mail, Phone, Video } from "lucide-react";
import { Reveal } from "@/components/motion/reveal";
import { DotLeader, DotRule, Display, PlateLabel, Section } from "@/components/site/atoms";
import { Button } from "@/components/ui/button";
import { resolveImage } from "@/lib/drive";
import { FALLBACK_IMAGES } from "@/cms/content";
import type { HomeData, ZoomMeeting } from "@/lib/home-types";

export function About({
  about,
  zoomSection,
  meeting,
}: {
  about: HomeData["about"];
  zoomSection: HomeData["zoomSection"];
  meeting: ZoomMeeting | null;
}) {
  const portrait = resolveImage(about.image, FALLBACK_IMAGES.about);
  const telHref = `tel:${about.phone.replace(/[^0-9+]/g, "")}`;

  const meetingRows: { label: string; value: string }[] = meeting
    ? [
        { label: "DATE", value: meeting.date },
        { label: "TIME", value: meeting.time },
        ...(meeting.zoomLength ? [{ label: "LENGTH", value: meeting.zoomLength }] : []),
      ]
    : [];

  return (
    <>
      {/* ── PART A · the naturalist's portrait plate ─────────────────────── */}
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
            className="relative aspect-[4/3] min-h-[240px] md:aspect-auto md:min-h-[380px]"
          >
            <Image
              src={portrait}
              alt="Candy, founder of Canigan Health Options"
              fill
              sizes="(min-width: 768px) 45vw, 100vw"
              className="object-cover"
            />
            <div className="pointer-events-none absolute inset-4 rounded-[6px] border border-[var(--paper-white)]/40" />
          </Reveal>
        </div>
      </Section>

      {/* ── PART B · the evening field session ───────────────────────────── */}
      <Section id="zoom">
        <div className="dot-grid-dark relative overflow-hidden rounded-[10px] bg-pine p-7 text-paper sm:p-10 md:p-12">
          <Reveal variant="up" stagger={0.09}>
            <PlateLabel label={zoomSection.label} plate={zoomSection.plate} tone="paper" />

            <Display
              as="h2"
              className="mt-7 max-w-[22ch] text-[clamp(1.65rem,2.9vw,2.2rem)] text-paper"
            >
              {zoomSection.heading}
            </Display>

            <DotLeader count={9} tone="paper" className="mt-6 block" />

            {meeting ? (
              <div className="mt-8 max-w-[560px] rounded-[8px] border border-[var(--paper-white)]/25 bg-[var(--paper-white)]/5 p-6 sm:p-7">
                <p className="font-display text-[1.45rem] leading-[1.3] text-paper">{meeting.title}</p>

                <div className="mt-5 grid gap-2">
                  {meetingRows.map((row) => (
                    <div key={row.label} className="flex gap-3 text-[0.92rem]">
                      <span className="label-caps w-[62px] shrink-0 text-[0.62rem] text-terra">
                        {row.label}
                      </span>
                      <span className="text-[var(--paper-white)]/90">{row.value}</span>
                    </div>
                  ))}
                </div>

                <Button
                  asChild
                  className="mt-7 h-11 w-full rounded-full bg-terra px-7 text-[0.68rem] font-bold tracking-[0.18em] uppercase text-paper hover:bg-terradeep sm:w-auto"
                >
                  <a href={meeting.link} target="_blank" rel="noreferrer">
                    <Video className="mr-2 size-4" aria-hidden />
                    Get the Zoom invite
                  </a>
                </Button>
              </div>
            ) : (
              <p className="mt-6 max-w-[60ch] text-[0.82rem] leading-[1.85] text-[var(--paper-white)]/80">
                {zoomSection.note.split("\n").map((line, i) => (
                  <span key={i} className="block">
                    {line}
                  </span>
                ))}
              </p>
            )}

            {meeting ? (
              <p className="mt-6 max-w-[60ch] text-[0.72rem] leading-[1.7] text-[var(--paper-white)]/65">
                {zoomSection.note.split("\n").map((line, i) => (
                  <span key={i} className="block">
                    {line}
                  </span>
                ))}
              </p>
            ) : (
              <Button
                asChild
                variant="outline"
                className="mt-7 h-11 w-full rounded-full border-[var(--paper-white)]/55 bg-transparent px-7 text-[0.68rem] font-bold tracking-[0.18em] uppercase text-[var(--paper-white)] hover:bg-[var(--paper-white)] hover:text-ink sm:w-auto"
              >
                <a href="#contact">
                  Ask Candy about the next session
                  <ArrowRight className="ml-2 size-4" aria-hidden />
                </a>
              </Button>
            )}
          </Reveal>
        </div>
      </Section>
    </>
  );
}
