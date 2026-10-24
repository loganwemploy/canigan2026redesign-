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
    <div className={"sticky-cta" + (shown ? " is-shown" : "")}>
      <div className="sticky-cta-inner">
        <div className="sticky-cta-copy">
          <p className="sticky-cta-title">Pull up a chair with Candy</p>
          <p className="sticky-cta-text">
            {meeting
              ? `Next live Zoom · ${meeting.date}${meeting.time ? ` · ${meeting.time}` : ""} — save your seat.`
              : "Join Candy live for wellness & business topics — free Zoom invite."}
          </p>
        </div>

        <div className="sticky-cta-actions">
          <a
            href={ASSESSMENT_URL}
            target="_blank"
            rel="noreferrer"
            className="sticky-cta-quiz"
          >
            Or take the free quiz
          </a>
          <ZoomInviteDialog meeting={meeting}>
            <Button type="button" className="sticky-cta-join">
              <Video aria-hidden />
              <span className="sticky-cta-join-short">Join Zoom</span>
              <span className="sticky-cta-join-long">Join Candy on Zoom</span>
              <ArrowRight aria-hidden />
            </Button>
          </ZoomInviteDialog>
          <button
            type="button"
            onClick={() => setDismissed(true)}
            aria-label="Close the Zoom invitation"
            className="sticky-cta-close"
          >
            <X aria-hidden />
          </button>
        </div>

        <a
          href={ASSESSMENT_URL}
          target="_blank"
          rel="noreferrer"
          className="sticky-cta-quiz-mobile"
        >
          Or take the free health quiz
        </a>
      </div>
    </div>
  );
}
