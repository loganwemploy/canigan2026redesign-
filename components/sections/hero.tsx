import Image from "next/image";
import { Video, ShieldCheck, FlaskConical, HeartHandshake } from "lucide-react";
import { Reveal, Parallax } from "@/components/motion/reveal";
import { DotLeader, Display } from "@/components/site/atoms";
import { ZoomInviteDialog } from "@/components/sections/zoom-invite";
import { Button } from "@/components/ui/button";
import { resolveImage } from "@/lib/drive";
import { FALLBACK_IMAGES } from "@/cms/content";
import type { HomeData, ZoomMeeting } from "@/lib/home-types";

const TRUST_POINTS = [
  { icon: ShieldCheck, label: "100% money-back guarantee" },
  { icon: FlaskConical, label: "70 years of clinical science" },
  { icon: HeartHandshake, label: "Free & no obligation" },
] as const;

export function Hero({
  data,
  meeting,
}: {
  data: HomeData["hero"];
  meeting?: ZoomMeeting | null;
}) {
  const src = resolveImage(data.image, FALLBACK_IMAGES.hero);

  return (
    <section id="top" className="bg-sage p-2 sm:p-3">
      <div className="relative overflow-hidden rounded-[14px]">
        <div className="relative aspect-[9/14] w-full sm:aspect-[16/10] lg:aspect-[1470/880]">
          <Parallax className="absolute inset-0" amount={36}>
            <Image
              src={src}
              alt="Candy of Canigan Health Options standing in a golden field at sunset"
              fill
              priority
              sizes="100vw"
              // scale-105 keeps the blur's feathered edge outside the frame
              className="scale-105 object-cover object-[64%_18%] blur-[3px] sm:object-[center_22%]"
            />
          </Parallax>
          <div className="absolute inset-0 bg-[#2e3a26]/35 mix-blend-multiply" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#1f2a1a]/55 via-[#1f2a1a]/20 to-[#1f2a1a]/75" />
        </div>

        <div className="pointer-events-none absolute inset-3 rounded-[6px] border border-[var(--paper-white)]/30 sm:inset-6" />

        <div className="absolute inset-0 flex flex-col justify-between p-6 sm:p-9 lg:p-11">
          <Reveal variant="fade" duration={1.1}>
            <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-2">
              <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                <span className="label-caps text-[0.6rem] text-[var(--paper-white)] sm:text-[0.68rem]">
                  {data.brand}
                </span>
                <span className="font-display text-[0.72rem] italic text-terra">{data.plate}</span>
              </div>

              {meeting ? (
                <ZoomInviteDialog meeting={meeting}>
                  <button
                    type="button"
                    className="group inline-flex items-center gap-2 rounded-full border border-[var(--paper-white)]/35 bg-[#1f2a1a]/40 px-3.5 py-1.5 backdrop-blur-sm transition-colors hover:border-terra/70 hover:bg-[#1f2a1a]/60"
                  >
                    <span className="relative flex size-2">
                      <span className="absolute inline-flex size-full animate-ping rounded-full bg-terra/70" />
                      <span className="relative inline-flex size-2 rounded-full bg-terra" />
                    </span>
                    <span className="text-[0.66rem] font-bold tracking-[0.04em] text-[var(--paper-white)] sm:text-[0.72rem]">
                      Next live Zoom · {meeting.date}
                      {meeting.time ? ` · ${meeting.time}` : ""}
                    </span>
                  </button>
                </ZoomInviteDialog>
              ) : null}
            </div>
          </Reveal>

          <div className="flex-1 pt-4 sm:pt-6">
            <Reveal variant="curtain" duration={1.25} delay={0.12}>
              <Display
                as="h1"
                className="max-w-[16ch] text-[clamp(2.3rem,7.4vw,5rem)] text-[var(--paper-white)] drop-shadow-[0_2px_20px_rgba(20,28,16,0.45)]"
              >
                {data.title}
              </Display>
            </Reveal>
            <Reveal variant="fade" delay={0.5}>
              <DotLeader count={11} tone="paper" className="mt-3 block" />
            </Reveal>
          </div>

          <Reveal variant="up" delay={0.35} className="space-y-4">
            <p className="max-w-[46ch] text-[0.86rem] font-semibold leading-[1.65] text-[var(--paper-white)] sm:text-[0.92rem]">
              {data.welcome.split("\n").map((line, i) => (
                <span key={i} className="block">
                  {line}
                </span>
              ))}
            </p>

            <div className="flex flex-col gap-4 sm:flex-row sm:flex-wrap sm:items-center sm:gap-6">
              <ZoomInviteDialog meeting={meeting}>
                <Button
                  type="button"
                  className="h-14 rounded-full bg-terra px-9 text-[0.78rem] font-bold tracking-[0.14em] uppercase text-paper shadow-[0_10px_30px_-8px_rgba(20,28,16,0.7)] hover:bg-terradeep focus-visible:ring-paper"
                >
                  <Video className="mr-2 size-4" aria-hidden />
                  Join Candy on Zoom
                </Button>
              </ZoomInviteDialog>

              <div className="flex items-center gap-4 text-[0.72rem] font-bold tracking-[0.1em] uppercase text-[var(--paper-white)] sm:gap-5">
                <a
                  href={data.primaryCta.url}
                  target="_blank"
                  rel="noreferrer"
                  className="underline-offset-4 hover:underline"
                >
                  {data.primaryCta.label}
                </a>
                <span aria-hidden className="text-[var(--paper-white)]/40">
                  /
                </span>
                <a href={data.secondaryCta.url} className="underline-offset-4 hover:underline">
                  {data.secondaryCta.label}
                </a>
              </div>
            </div>

            <ul className="flex flex-wrap gap-x-6 gap-y-2 pt-1">
              {TRUST_POINTS.map(({ icon: Icon, label }) => (
                <li
                  key={label}
                  className="inline-flex items-center gap-2 text-[0.72rem] font-semibold text-[var(--paper-white)]/85"
                >
                  <Icon className="size-3.5 text-terra" aria-hidden />
                  {label}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
