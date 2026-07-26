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
      <div className="mx-3 mb-3 rounded-[10px] border border-[var(--hairline)] bg-cream2/95 shadow-[0_-6px_30px_-12px_rgba(20,28,16,0.4)] backdrop-blur sm:mx-5">
        <div className="mx-auto flex max-w-[1400px] items-center justify-between gap-4 px-4 py-3 sm:px-6">
          <div className="min-w-0">
            <p className="truncate font-display text-[0.95rem] italic leading-[1.2] text-ink sm:text-[1.1rem]">
              Pull up a chair with Candy
            </p>
            <p className="hidden text-[0.74rem] leading-tight text-petrol sm:block">
              {meeting
                ? `Next live Zoom · ${meeting.date}${meeting.time ? ` · ${meeting.time}` : ""} — save your seat.`
                : "Join Candy live for wellness & business topics — free Zoom invite."}
            </p>
          </div>

          <div className="flex shrink-0 items-center gap-2 sm:gap-3">
            <a
              href={ASSESSMENT_URL}
              target="_blank"
              rel="noreferrer"
              className="hidden text-[0.62rem] font-bold tracking-[0.12em] uppercase text-inksoft underline-offset-4 hover:text-ink hover:underline sm:inline"
            >
              Or take the free quiz
            </a>
            <ZoomInviteDialog meeting={meeting}>
              <Button
                type="button"
                className="h-11 rounded-full bg-terra px-5 text-[0.66rem] font-bold tracking-[0.14em] uppercase text-paper hover:bg-terradeep sm:px-7 sm:text-[0.7rem]"
              >
                <Video className="mr-1.5 size-4" aria-hidden />
                Join Candy on Zoom
                <ArrowRight className="ml-1.5 size-4" aria-hidden />
              </Button>
            </ZoomInviteDialog>
            <button
              type="button"
              onClick={() => setDismissed(true)}
              aria-label="Dismiss"
              className="grid size-9 shrink-0 place-items-center rounded-full border border-[var(--hairline)] text-inksoft transition-colors hover:text-ink"
            >
              <X className="size-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
