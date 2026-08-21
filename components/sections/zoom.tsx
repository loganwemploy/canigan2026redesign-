import Image from "next/image";
import { ArrowRight, Video } from "lucide-react";
import { Reveal } from "@/components/motion/reveal";
import { DotLeader, Display, PlateLabel, Section } from "@/components/site/atoms";
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

  const note = zoomSection.note.split("\n").map((line, i) => (
    <span key={i} className="block">
      {line}
    </span>
  ));

  return (
    <Section id="zoom">
      <div className="dot-grid-dark relative overflow-hidden rounded-[10px] bg-pine p-6 text-paper sm:p-10 md:p-12">
        <div className="grid gap-10 md:grid-cols-[1fr_0.66fr] md:items-start md:gap-12">
          {/* invitation */}
          <Reveal variant="up" className="min-w-0">
            <PlateLabel label={zoomSection.label} tone="paper" />

            <Display
              as="h2"
              className="mt-6 max-w-[22ch] text-[clamp(1.5rem,2.9vw,2.2rem)] text-paper"
            >
              {zoomSection.heading}
            </Display>

            <DotLeader count={9} tone="paper" className="mt-5 block" />

            {meeting ? (
              <>
                <div className="mt-7 rounded-[8px] border border-[var(--paper-white)]/25 bg-[var(--paper-white)]/5 p-5 sm:p-7 md:max-w-[520px]">
                  <p className="font-display text-[1.25rem] leading-[1.3] text-paper sm:text-[1.45rem]">
                    {meeting.title}
                  </p>

                  <div className="mt-5 grid gap-2">
                    {meetingRows.map((row) => (
                      <div key={row.label} className="flex gap-3 text-base">
                        <span className="w-[82px] shrink-0 text-base font-bold text-terra">
                          {row.label}
                        </span>
                        <span className="text-[var(--paper-white)]/90">{row.value}</span>
                      </div>
                    ))}
                  </div>

                  <ZoomInviteDialog meeting={meeting}>
                    <Button
                      type="button"
                      className="mt-7 h-12 w-full rounded-full bg-terra px-7 text-base font-bold text-paper hover:bg-terradeep sm:w-auto"
                    >
                      <Video className="mr-2 size-4" aria-hidden />
                      Get the Zoom invite
                    </Button>
                  </ZoomInviteDialog>
                </div>

                <p className="mt-6 max-w-[60ch] text-[0.9rem] leading-[1.75] text-[var(--paper-white)]/82">
                  {note}
                </p>
              </>
            ) : (
              <>
                <p className="mt-6 max-w-[60ch] text-base leading-[1.75] text-[var(--paper-white)]/90">
                  {note}
                </p>
                <Button
                  asChild
                  variant="outline"
                  className="mt-7 h-12 w-full rounded-full border-[var(--paper-white)]/70 bg-transparent px-7 text-base font-bold text-[var(--paper-white)] hover:bg-[var(--paper-white)] hover:text-ink sm:w-auto"
                >
                  <a href="#contact">
                    Ask Candy about the next session
                    <ArrowRight className="ml-2 size-4" aria-hidden />
                  </a>
                </Button>
              </>
            )}
          </Reveal>

          {/* the evidence plate */}
          <Reveal variant="right" className="min-w-0">
            <figure className="mx-auto w-full max-w-[420px] md:ml-auto md:mr-0">
              <div className="overflow-hidden rounded-[8px] border border-[var(--paper-white)]/25">
                {/* Served straight from /public: the source is already small
                    (554px, 33KB) so there is nothing to optimize, and Next's
                    optimizer stalls on this particular file. */}
                <Image
                  src={studyImage}
                  alt="Shaklee users have optimal nutrient levels and better biomarkers of health, per seven clinical studies."
                  width={554}
                  height={554}
                  unoptimized
                  className="h-auto w-full object-cover"
                />
              </div>
              <figcaption className="mt-3 text-[0.9rem] leading-[1.7] text-[var(--paper-white)]/82">
                {zoomSection.imageCaption}
              </figcaption>
            </figure>
          </Reveal>
        </div>
      </div>
    </Section>
  );
}
