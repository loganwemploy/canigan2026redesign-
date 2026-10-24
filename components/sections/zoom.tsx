"use client";

import Image from "next/image";
import { ArrowRight, Video } from "lucide-react";
import { Reveal } from "@/components/motion/reveal";
import { DotLeader, Section } from "@/components/site/atoms";
import { CmsDisplay, CmsPlateLabel, CmsText } from "@/components/site-editor/inline-edit";
import { ZoomInviteDialog } from "@/components/sections/zoom-invite";
import { Button } from "@/components/ui/button";
import { resolveImage } from "@/lib/drive";
import { FALLBACK_IMAGES } from "@/cms/content";
import type { HomeData, ZoomMeeting } from "@/lib/home-types";

/**
 * The evening field session. Sits high on the page (section 3) because the live
 * Zoom is the strongest single call to action Candy has.
 */
export function Zoom({
  zoomSection,
  meeting,
}: {
  zoomSection: HomeData["zoomSection"];
  meeting: ZoomMeeting | null;
}) {
  const studyImage = resolveImage(zoomSection.image, FALLBACK_IMAGES.biomarkers);

  const meetingRows: { label: string; value: string }[] = meeting
    ? [
        { label: "DATE", value: meeting.date },
        { label: "TIME", value: meeting.time },
        ...(meeting.zoomLength ? [{ label: "LENGTH", value: meeting.zoomLength }] : []),
      ]
    : [];

  const note = zoomSection.note;

  return (
    <Section id="zoom" className="zoom">
      <div className="band band-split zoom-band">
        <span className="orb" aria-hidden />

        <Reveal variant="up" className="zoom-copy">
          <CmsPlateLabel kind="home" path="zoomSection.label" label={zoomSection.label} tone="paper" />

          <CmsDisplay kind="home" path="zoomSection.heading" as="h2" className="zoom-title">
            {zoomSection.heading}
          </CmsDisplay>

          <DotLeader count={9} tone="paper" className="zoom-dots" />

          {meeting ? (
            <>
              <div className="zoom-meeting">
                <CmsText kind="zoom" path="title" as="p" className="zoom-meeting-title">
                  {meeting.title}
                </CmsText>

                <div className="zoom-rows">
                  {meetingRows.map((row) => (
                    <div key={row.label} className="zoom-row">
                      <span className="zoom-row-label">{row.label}</span>
                      <CmsText
                        kind="zoom"
                        path={row.label === "DATE" ? "date" : row.label === "TIME" ? "time" : "zoomLength"}
                        className="zoom-row-value"
                      >
                        {row.value}
                      </CmsText>
                    </div>
                  ))}
                </div>

                <ZoomInviteDialog meeting={meeting}>
                  <Button type="button" size="lg" className="on-dark">
                    <Video aria-hidden />
                    Get the Zoom invite
                  </Button>
                </ZoomInviteDialog>
              </div>

              <CmsText kind="home" path="zoomSection.note" multiline as="p" className="zoom-note">
                {note}
              </CmsText>
            </>
          ) : (
            <>
              <CmsText kind="home" path="zoomSection.note" multiline as="p" className="zoom-note">
                {note}
              </CmsText>
              <Button asChild variant="outline" size="lg" className="on-dark">
                <a href="#contact">
                  Ask Candy about the next session
                  <ArrowRight aria-hidden />
                </a>
              </Button>
            </>
          )}
        </Reveal>

        {/* the evidence plate */}
        <Reveal variant="right" className="zoom-art">
          <figure className="zoom-figure">
            <div className="zoom-plate">
              {/* Served straight from /public: the source is already small
                  (554px, 33KB) so there is nothing to optimize, and Next's
                  optimizer stalls on this particular file. */}
              <Image
                src={studyImage}
                alt="Shaklee users have optimal nutrient levels and better biomarkers of health, per seven clinical studies."
                width={554}
                height={554}
                unoptimized
                className="zoom-img"
              />
            </div>
            <figcaption className="zoom-caption">
              <CmsText kind="home" path="zoomSection.imageCaption">{zoomSection.imageCaption}</CmsText>
            </figcaption>
          </figure>
        </Reveal>
      </div>
    </Section>
  );
}
