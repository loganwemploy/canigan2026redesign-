"use client";

import { useEffect, useState } from "react";
import { ArrowRight, Video, X } from "lucide-react";
import { ZoomInviteDialog } from "@/components/sections/zoom-invite";
import { Button } from "@/components/ui/button";
import { ASSESSMENT_URL } from "@/cms/content";
import type { ZoomMeeting } from "@/lib/home-types";

/**
 * Persistent Zoom invite that slides up once the reader scrolls past the hero
 * and retreats before the contact form / footer so it never covers those CTAs.
 * Dismissible, and stays dismissed for the session.
 */
export function StickyCta({ meeting }: { meeting?: ZoomMeeting | null }) {
  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      const bottom = document.documentElement.scrollHeight - (y + window.innerHeight);
      setVisible(y > window.innerHeight * 0.9 && bottom > 720);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  const shown = visible && !dismissed;

  return (
    <div
      className={
        "fixed inset-x-0 bottom-0 z-40 transition-all duration-500 " +
        (shown ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-full opacity-0")
      }
    >
      <div className="mx-3 mb-3 rounded-[10px] border border-[var(--hairline)] bg-cream2/95 shadow-[0_-6px_30px_-12px_hsl(151_33%_13%/0.4)] backdrop-blur sm:mx-5">
        <div className="mx-auto flex max-w-[1400px] flex-col gap-3 px-4 py-3.5 sm:px-6 md:flex-row md:items-center md:justify-between md:gap-5 md:py-3">
          <div className="min-w-0 md:flex-1 md:pr-2">
            <p className="max-w-[28ch] font-display text-[1.05rem] leading-snug text-ink text-balance md:max-w-none md:text-[1.1rem] md:leading-[1.3]">
              Pull up a chair with Candy
            </p>
            <p className="mt-1 max-w-[42ch] text-[0.85rem] leading-snug text-petrol md:mt-0.5 md:text-[0.9rem]">
              {meeting
                ? `Next live Zoom · ${meeting.date}${meeting.time ? ` · ${meeting.time}` : ""} — save your seat.`
                : "Join Candy live for wellness & business topics — free Zoom invite."}
            </p>
          </div>

          <div className="flex w-full items-center gap-2 md:w-auto md:shrink-0 md:gap-3">
            <a
              href={ASSESSMENT_URL}
              target="_blank"
              rel="noreferrer"
              className="hidden min-h-12 items-center text-base font-bold text-inksoft underline-offset-4 hover:text-ink hover:underline lg:inline-flex"
            >
              Or take the free quiz
            </a>
            <ZoomInviteDialog meeting={meeting}>
              <Button
                type="button"
                className="h-12 min-w-0 flex-1 rounded-full bg-terra px-4 text-[0.92rem] font-bold text-paper hover:bg-terradeep sm:px-5 md:flex-none md:px-7 md:text-base"
              >
                <Video className="mr-1.5 size-4 shrink-0" aria-hidden />
                <span className="truncate sm:hidden">Join Zoom</span>
                <span className="hidden truncate sm:inline">Join Candy on Zoom</span>
                <ArrowRight className="ml-1.5 size-4 shrink-0" aria-hidden />
              </Button>
            </ZoomInviteDialog>
            <button
              type="button"
              onClick={() => setDismissed(true)}
              aria-label="Close the Zoom invitation"
              className="grid size-12 shrink-0 cursor-pointer place-items-center rounded-full border border-[var(--hairline)] text-ink transition-colors hover:bg-parch"
            >
              <X className="size-4" />
            </button>
          </div>

          <a
            href={ASSESSMENT_URL}
            target="_blank"
            rel="noreferrer"
            className="inline-flex min-h-10 items-center text-[0.85rem] font-bold text-inksoft underline-offset-4 hover:text-ink hover:underline md:hidden"
          >
            Or take the free health quiz
          </a>
        </div>
      </div>
    </div>
  );
}
