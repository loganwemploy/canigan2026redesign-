import Image from "next/image";
import { ArrowRight, Check, FlaskConical, HeartPulse, Sparkles, Video } from "lucide-react";
import { Reveal } from "@/components/motion/reveal";
import { ZoomInviteDialog } from "@/components/sections/zoom-invite";
import { Button } from "@/components/ui/button";
import { resolveImage } from "@/lib/drive";
import { FALLBACK_IMAGES } from "@/cms/content";
import type { HomeData, ZoomMeeting } from "@/lib/home-types";
import type { AudienceProfile } from "@/lib/audiences";

const TASKS = [
  { time: "Today", title: "Health quiz completed", detail: "Your goals are mapped", icon: HeartPulse, tone: "bg-[hsl(109_24%_86%)]" },
  { time: "Next", title: "Personal plan ready", detail: "Simple daily recommendations", icon: FlaskConical, tone: "bg-[hsl(83_25%_86%)]" },
  { time: "Ongoing", title: "Candy follows through", detail: "Real guidance from a real person", icon: Sparkles, tone: "bg-[hsl(48_30%_89%)]" },
] as const;

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
  const titleLines = data.title.split("\n").filter(Boolean);
  const tasks = audience?.heroTasks ?? TASKS;

  return (
    <section id={sectionId} className="relative min-h-[900px] overflow-hidden bg-cream px-5 pb-16 pt-32 sm:px-9 lg:px-10 lg:pt-40">
      <div className="zig-orbit" aria-hidden />
      <div className="section-shell relative grid min-h-[700px] items-center gap-14 lg:grid-cols-[0.92fr_1.08fr] lg:gap-8">
        <Reveal variant="up" className="relative z-10 max-w-[680px] lg:pt-20">
          <div className="inline-flex items-center gap-2 text-[0.9rem] font-bold text-inksoft">
            <Sparkles className="size-4" aria-hidden />
            {audience?.heroEyebrow ?? "Personalized wellness with a human guide"}
          </div>

          <h2 className="mt-8 text-[clamp(3rem,6.1vw,5.6rem)] font-bold leading-[1.02] tracking-[-0.035em] text-ink">
            {titleLines.map((line, index) => (
              <span key={line} className={index === 0 ? "block" : "mt-2 block text-forest"}>
                {line}
              </span>
            ))}
          </h2>

          <p className="mt-8 max-w-[54ch] text-[1.08rem] leading-8 text-ink/95 sm:text-[1.15rem] sm:leading-9">
            {data.welcome.replace(/\n/g, " ")}
          </p>

          <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <Button asChild className="h-14 rounded-full bg-terra px-9 text-base font-bold text-white hover:bg-terradeep">
              <a href={data.primaryCta.url} target="_blank" rel="noreferrer">
                {data.primaryCta.label} <ArrowRight className="ml-2 size-4" aria-hidden />
              </a>
            </Button>
            {audience ? (
              <Button asChild variant="outline" className="h-14 rounded-full border-terra bg-transparent px-9 text-base font-bold text-terra hover:bg-white">
                <a href={data.secondaryCta.url}>{data.secondaryCta.label}</a>
              </Button>
            ) : (
              <ZoomInviteDialog meeting={meeting}>
                <Button type="button" variant="outline" className="h-14 rounded-full border-terra bg-transparent px-9 text-base font-bold text-terra hover:bg-white">
                  <Video className="mr-2 size-4" aria-hidden />
                  Join Candy live
                </Button>
              </ZoomInviteDialog>
            )}
          </div>
        </Reveal>

        <Reveal variant="fade" delay={0.15} duration={1.1} className="relative z-10 min-h-[470px] lg:min-h-[640px]">
          <div className="absolute left-[13%] top-[7%] size-[270px] overflow-hidden rounded-full border-[10px] border-white shadow-[0_35px_80px_-42px_hsl(148_19%_12%/0.55)] sm:size-[350px] lg:left-[18%] lg:size-[410px]">
            <Image src={src} alt={audience?.heroImageAlt ?? "Candy of Canigan Health Options"} fill priority sizes="(min-width:1024px) 410px, 350px" className="hero-focal object-cover" />
          </div>

          <div className="absolute inset-x-0 bottom-0 space-y-4 sm:left-[12%] sm:right-auto sm:w-[78%] lg:left-[4%] lg:w-[92%]">
            {tasks.map((task, index) => {
              const fallback = TASKS[index] ?? TASKS[0];
              const Icon = fallback.icon;
              const tone = fallback.tone;
              const { time, title, detail } = task;
              return (
              <div key={title} className={`task-card ml-auto flex w-[92%] items-center gap-4 rounded-[22px] p-4 sm:w-[78%] sm:p-5 ${index === 1 ? "mr-[8%]" : index === 2 ? "mr-0 opacity-85" : "mr-[19%]"}`}>
                <span className={`grid size-14 shrink-0 place-items-center rounded-xl ${tone}`}>
                  <Icon className="size-5 text-petrol" aria-hidden />
                </span>
                <div className="min-w-0 flex-1">
                  <span className="text-sm font-bold text-forest">{time}</span>
                  <p className="mt-0.5 text-lg font-bold tracking-[-0.015em] text-ink">{title}</p>
                  <p className="mt-1 text-base leading-6 text-inksoft">{detail}</p>
                </div>
                <span className="grid size-7 shrink-0 place-items-center rounded-full bg-forest-bright text-white"><Check className="size-4" aria-hidden /></span>
              </div>
              );
            })}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
