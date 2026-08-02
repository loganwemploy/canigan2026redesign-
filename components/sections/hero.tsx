import Image from "next/image";
import { ArrowRight, Check, FlaskConical, HeartPulse, Sparkles, Video } from "lucide-react";
import { Reveal } from "@/components/motion/reveal";
import { ZoomInviteDialog } from "@/components/sections/zoom-invite";
import { Button } from "@/components/ui/button";
import { resolveImage } from "@/lib/drive";
import { FALLBACK_IMAGES } from "@/cms/content";
import type { HomeData, ZoomMeeting } from "@/lib/home-types";

const TASKS = [
  { time: "Today", title: "Health quiz completed", detail: "Your goals are mapped", icon: HeartPulse, tone: "bg-[#c8eee4]" },
  { time: "Next", title: "Personal plan ready", detail: "Simple daily recommendations", icon: FlaskConical, tone: "bg-[#cce6f3]" },
  { time: "Ongoing", title: "Candy follows through", detail: "Real guidance from a real person", icon: Sparkles, tone: "bg-[#f7e6e2]" },
] as const;

export function Hero({
  data,
  meeting,
  sectionId = "top",
}: {
  data: HomeData["hero"];
  meeting?: ZoomMeeting | null;
  sectionId?: string;
}) {
  const src = resolveImage(data.image, FALLBACK_IMAGES.hero);
  const titleLines = data.title.split("\n").filter(Boolean);

  return (
    <section id={sectionId} className="relative min-h-[900px] overflow-hidden bg-cream px-5 pb-16 pt-32 sm:px-9 lg:px-10 lg:pt-40">
      <div className="zig-orbit" aria-hidden />
      <div className="section-shell relative grid min-h-[700px] items-center gap-14 lg:grid-cols-[0.92fr_1.08fr] lg:gap-8">
        <Reveal variant="up" className="relative z-10 max-w-[680px] lg:pt-20">
          <div className="inline-flex items-center gap-2 text-[0.9rem] font-bold text-inksoft">
            <Sparkles className="size-4" aria-hidden />
            Personalized wellness with a human guide
          </div>

          <h1 className="mt-8 text-[clamp(3.25rem,6.1vw,6rem)] font-bold leading-[0.94] tracking-[-0.065em] text-ink">
            {titleLines.map((line, index) => (
              <span key={line} className={index === 0 ? "block" : "mt-2 block text-[#0a9875]"}>
                {line}
              </span>
            ))}
          </h1>

          <p className="mt-8 max-w-[56ch] text-[1.02rem] leading-7 text-ink/85 sm:text-[1.1rem] sm:leading-8">
            {data.welcome.replace(/\n/g, " ")}
          </p>

          <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <Button asChild className="h-14 rounded-full bg-terra px-9 text-base font-bold text-white hover:bg-terradeep">
              <a href={data.primaryCta.url} target="_blank" rel="noreferrer">
                Start your free plan <ArrowRight className="ml-2 size-4" aria-hidden />
              </a>
            </Button>
            <ZoomInviteDialog meeting={meeting}>
              <Button type="button" variant="outline" className="h-14 rounded-full border-terra bg-transparent px-9 text-base font-bold text-terra hover:bg-white">
                <Video className="mr-2 size-4" aria-hidden />
                Join Candy live
              </Button>
            </ZoomInviteDialog>
          </div>
        </Reveal>

        <Reveal variant="fade" delay={0.15} duration={1.1} className="relative z-10 min-h-[470px] lg:min-h-[640px]">
          <div className="absolute left-[13%] top-[7%] size-[270px] overflow-hidden rounded-full border-[10px] border-white shadow-[0_35px_80px_-42px_rgba(21,23,26,0.55)] sm:size-[350px] lg:left-[18%] lg:size-[410px]">
            <Image src={src} alt="Candy of Canigan Health Options" fill priority sizes="(min-width:1024px) 410px, 350px" className="hero-focal object-cover" />
          </div>

          <div className="absolute inset-x-0 bottom-0 space-y-4 sm:left-[12%] sm:right-auto sm:w-[78%] lg:left-[4%] lg:w-[92%]">
            {TASKS.map(({ time, title, detail, icon: Icon, tone }, index) => (
              <div key={title} className={`task-card ml-auto flex w-[92%] items-center gap-4 rounded-[22px] p-4 sm:w-[78%] sm:p-5 ${index === 1 ? "mr-[8%]" : index === 2 ? "mr-0 opacity-85" : "mr-[19%]"}`}>
                <span className={`grid size-14 shrink-0 place-items-center rounded-xl ${tone}`}>
                  <Icon className="size-5 text-petrol" aria-hidden />
                </span>
                <div className="min-w-0 flex-1">
                  <span className="text-xs font-bold text-[#0a9875]">{time}</span>
                  <p className="mt-0.5 truncate text-base font-bold tracking-[-0.025em] text-ink">{title}</p>
                  <p className="mt-1 truncate text-xs text-inksoft">{detail}</p>
                </div>
                <span className="grid size-7 shrink-0 place-items-center rounded-full bg-[#36aa89] text-white"><Check className="size-4" aria-hidden /></span>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
