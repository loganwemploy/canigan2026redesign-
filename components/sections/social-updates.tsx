import Image from "next/image";
import { BriefcaseBusiness, Camera, MessageCircleMore, Play, type LucideIcon } from "lucide-react";
import { Reveal } from "@/components/motion/reveal";
import { Display, PlateLabel, Section } from "@/components/site/atoms";

const SOCIAL_CHANNELS: { label: string; icon: LucideIcon; href?: string }[] = [
  { label: "Facebook", icon: MessageCircleMore },
  { label: "LinkedIn", icon: BriefcaseBusiness, href: "https://www.linkedin.com/in/candywilson" },
  { label: "Instagram", icon: Camera },
  { label: "YouTube", icon: Play },
];

/** A quiet, practical place to find Candy's next event and social updates. */
export function SocialUpdates() {
  return (
    <Section id="updates">
      <div className="dot-grid-dark overflow-hidden rounded-[10px] bg-pine p-6 text-paper sm:p-10 md:p-12">
        <div className="flex flex-col gap-9 lg:flex-row lg:items-center lg:gap-14">
          <Reveal variant="left" className="w-full min-w-0 lg:flex-1">
            <figure className="mx-auto max-w-[704px] border-[10px] border-paper bg-paper shadow-[0_22px_55px_-34px_hsl(151_33%_8%/0.82)]">
              <Image
                src="/images/candy-and-nicole.png"
                alt="Candy with Nicole"
                width={704}
                height={176}
                className="h-auto w-full object-cover"
              />
            </figure>
          </Reveal>

          <Reveal variant="right" className="min-w-0 lg:w-[min(100%,470px)] lg:shrink-0">
            <PlateLabel label="Connect with us" tone="paper" />
            <Display as="h2" className="mt-5 text-[clamp(2rem,4vw,3.4rem)] text-paper">
              Stay tuned for updates.
            </Display>
            <p className="mt-5 text-lg font-bold text-[var(--paper-white)]/95">Follow Candy on social media.</p>
            <p className="mt-2 max-w-[44ch] text-base leading-7 text-[var(--paper-white)]/78">
              New wellness conversations and event details will be shared here soon.
            </p>

            <ul className="mt-7 flex flex-wrap gap-3 sm:gap-4" aria-label="Social channels">
              {SOCIAL_CHANNELS.map(({ label, icon: Icon, ...channel }) => (
                <li key={label}>
                  {channel.href ? (
                    <a
                      href={channel.href}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={`Follow Candy on ${label}`}
                      className="group flex min-h-12 min-w-12 items-center gap-2 rounded-full border border-[var(--paper-white)]/35 px-4 text-[var(--paper-white)] transition-colors hover:bg-[var(--paper-white)] hover:text-ink"
                    >
                      <Icon className="size-5" aria-hidden />
                      <span className="whitespace-nowrap text-sm font-bold">{label}</span>
                    </a>
                  ) : (
                    <span
                      aria-label={`${label} updates coming soon`}
                      className="flex min-h-12 min-w-12 items-center gap-2 rounded-full border border-[var(--paper-white)]/20 px-4 text-[var(--paper-white)]/62"
                    >
                      <Icon className="size-5" aria-hidden />
                      <span className="whitespace-nowrap text-sm font-bold">{label}</span>
                    </span>
                  )}
                </li>
              ))}
            </ul>
            <p className="mt-4 text-sm leading-6 text-[var(--paper-white)]/64">More channels will be linked as they launch.</p>
          </Reveal>
        </div>
      </div>
    </Section>
  );
}
