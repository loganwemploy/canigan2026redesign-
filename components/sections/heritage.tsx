import Image from "next/image";
import { Reveal } from "@/components/motion/reveal";
import { DotRule, Display, PlateLabel, Section } from "@/components/site/atoms";
import { resolveImage } from "@/lib/drive";
import { FALLBACK_IMAGES } from "@/cms/content";
import type { HomeData } from "@/lib/home-types";

/**
 * A deliberate pause between the Zoom invitation and the argument that follows —
 * generous vertical air, then the heritage timeline.
 *
 * The source artwork is only 353px wide, so it is rendered at (near) its native
 * size inside a paper frame rather than stretched across the band. Blowing it up
 * would soften it, and an infographic that cannot be read is just texture.
 */
export function Heritage({ data }: { data: HomeData["heritage"] }) {
  const timeline = resolveImage(data.image, FALLBACK_IMAGES.heritage);

  return (
    <Section id="heritage">
      <div className="dot-grid overflow-hidden rounded-[10px] border border-[var(--hairline-soft)] bg-parch px-6 py-16 sm:px-10 sm:py-24 md:py-32">
        <div className="mx-auto grid max-w-[1100px] gap-12 md:grid-cols-[1fr_auto] md:items-center md:gap-16">
          <Reveal variant="up" className="min-w-0">
            <PlateLabel label={data.label} plate={data.plate} />

            <Display as="h2" className="mt-6 text-[clamp(1.8rem,4vw,2.9rem)] text-ink">
              {data.heading}
            </Display>

            <DotRule className="mt-7 max-w-[280px]" />

            <p className="mt-7 max-w-[46ch] text-[1.05rem] leading-[1.8] text-petrol">
              {data.body.split("\n").map((line, i) => (
                <span key={i} className="block">
                  {line}
                </span>
              ))}
            </p>
          </Reveal>

          <Reveal variant="scale" className="min-w-0">
            <div className="mx-auto w-full max-w-[353px] rounded-[8px] border border-[var(--hairline-soft)] bg-cream2 p-3 shadow-[0_18px_50px_-28px_hsl(151_33%_13%/0.55)]">
              <Image
                src={timeline}
                alt={data.imageAlt}
                width={353}
                height={566}
                className="h-auto w-full rounded-[4px] object-contain"
              />
            </div>
          </Reveal>
        </div>
      </div>
    </Section>
  );
}
