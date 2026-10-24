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
      <div className="band band-split social-band">
        <span className="orb" aria-hidden />

        <Reveal variant="left" className="social-art">
          <figure>
            <Image
              src="/images/candy-and-nicole.png"
              alt="Candy with Nicole"
              width={704}
              height={176}
              className="social-img"
            />
          </figure>
        </Reveal>

        <Reveal variant="right" className="social-copy">
          <PlateLabel label="Connect with us" tone="paper" />
          <Display as="h2" className="social-title">
            Stay tuned for updates.
          </Display>
          <p className="social-lead">Follow Candy on social media.</p>
          <p>New wellness conversations and event details will be shared here soon.</p>

          <ul className="social-list" aria-label="Social channels">
            {SOCIAL_CHANNELS.map(({ label, icon: Icon, ...channel }) => (
              <li key={label}>
                {channel.href ? (
                  <a
                    href={channel.href}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={`Follow Candy on ${label}`}
                    className="social-chip"
                  >
                    <Icon aria-hidden />
                    <span>{label}</span>
                  </a>
                ) : (
                  <span
                    aria-label={`${label} updates coming soon`}
                    className="social-chip is-soon"
                  >
                    <Icon aria-hidden />
                    <span>{label}</span>
                  </span>
                )}
              </li>
            ))}
          </ul>
          <p className="social-note">More channels will be linked as they launch.</p>
        </Reveal>
      </div>
    </Section>
  );
}
