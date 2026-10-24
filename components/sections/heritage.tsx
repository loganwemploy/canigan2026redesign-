"use client";

import Image from "next/image";
import { Reveal } from "@/components/motion/reveal";
import { DotRule, Section } from "@/components/site/atoms";
import { CmsDisplay, CmsPlateLabel, CmsText } from "@/components/site-editor/inline-edit";
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
    <Section id="heritage" className="heritage">
      <div className="heritage-grid">
        <Reveal variant="up" className="heritage-copy">
          <CmsPlateLabel kind="home" path="heritage.label" label={data.label} />

          <CmsDisplay kind="home" path="heritage.heading" as="h2" className="heritage-title">
            {data.heading}
          </CmsDisplay>

          <DotRule className="heritage-rule" />

          <CmsText kind="home" path="heritage.body" multiline as="p" className="lead heritage-body">
            {data.body}
          </CmsText>
        </Reveal>

        <Reveal variant="scale" className="heritage-art">
          <div className="heritage-frame">
            <Image
              src={timeline}
              alt={data.imageAlt}
              width={353}
              height={566}
              className="heritage-img"
            />
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
