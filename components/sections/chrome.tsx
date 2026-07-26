"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Menu, X } from "lucide-react";
import { DotRule } from "@/components/site/atoms";
import { ZoomInviteDialog } from "@/components/sections/zoom-invite";
import { Button } from "@/components/ui/button";
import { ASSESSMENT_URL } from "@/cms/content";
import type { ZoomMeeting } from "@/lib/home-types";

/** Shared in-page navigation used by both the header and the footer. */
const NAV_LINKS: { label: string; href: string; external?: boolean }[] = [
  { label: "Wellness", href: "#nutrition" },
  { label: "Opportunity", href: "#opportunity" },
  { label: "Earnings", href: "#benchmarks" },
  { label: "About", href: "#about" },
  { label: "Zoom", href: "#zoom" },
  { label: "Free Assessment", href: ASSESSMENT_URL, external: true },
];

/**
 * Fixed masthead that stays out of the way over the hero photograph and
 * slides down once the reader has scrolled roughly one screen.
 */
export function SiteHeader({
  logo,
  meeting,
}: {
  logo: string;
  meeting?: ZoomMeeting | null;
}) {
  const [shown, setShown] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setShown(window.scrollY > window.innerHeight * 0.85);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // The masthead retracts over the hero, so the menu can only be open with it.
  const menuOpen = shown && open;

  return (
    <header
      className={
        "fixed inset-x-0 top-0 z-50 transition-all duration-500 " +
        (shown
          ? "translate-y-0 opacity-100"
          : "pointer-events-none -translate-y-full opacity-0")
      }
    >
      <div className="border-b border-[var(--hairline-soft)] bg-cream2/92 backdrop-blur">
        <div className="mx-auto flex h-14 max-w-[1400px] items-center justify-between px-5">
          <a href="#top" aria-label="Canigan Health Options — back to top">
            <Image
              src={logo}
              alt="Canigan Health Options"
              width={132}
              height={26}
              className="h-6 w-auto object-contain"
            />
          </a>

          <nav className="hidden gap-8 lg:flex" aria-label="Section navigation">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                {...(link.external ? { target: "_blank", rel: "noreferrer" } : {})}
                className="label-caps text-[0.58rem] text-inksoft transition-colors hover:text-ink"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <ZoomInviteDialog meeting={meeting}>
              <Button
                type="button"
                size="sm"
                className="h-9 rounded-full bg-terra px-5 text-[0.6rem] font-bold tracking-[0.16em] uppercase text-paper hover:bg-terradeep"
              >
                Join Candy on Zoom
              </Button>
            </ZoomInviteDialog>
            <button
              type="button"
              className="grid size-9 place-items-center rounded-full border border-[var(--hairline)] text-ink lg:hidden"
              aria-expanded={menuOpen}
              aria-controls="mobile-nav"
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              onClick={() => setOpen((v) => !v)}
            >
              {menuOpen ? <X className="size-4" /> : <Menu className="size-4" />}
            </button>
          </div>
        </div>

        {menuOpen ? (
          <nav
            id="mobile-nav"
            className="border-t border-[var(--hairline-soft)] px-5 py-4 lg:hidden"
            aria-label="Mobile section navigation"
          >
            <ul className="space-y-3">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    {...(link.external ? { target: "_blank", rel: "noreferrer" } : {})}
                    className="label-caps block text-[0.62rem] text-ink"
                    onClick={() => setOpen(false)}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
              <li>
                <ZoomInviteDialog meeting={meeting}>
                  {/* No menu-close on click — closing would unmount the dialog with it. */}
                  <button type="button" className="label-caps block text-[0.62rem] text-terra">
                    Join Candy on Zoom
                  </button>
                </ZoomInviteDialog>
              </li>
            </ul>
          </nav>
        ) : null}
      </div>
    </header>
  );
}

/** The pine colophon that closes the plate — identity, index, and the fine print. */
export function SiteFooter({
  logo,
  tagline,
  incomeDisclaimer,
  healthDisclaimer,
  phone,
  email,
  assessmentUrl,
}: {
  logo: string;
  tagline: string;
  incomeDisclaimer: string;
  healthDisclaimer: string;
  phone: string;
  email: string;
  assessmentUrl: string;
}) {
  const telHref = `tel:${phone.replace(/[^\d+]/g, "")}`;

  return (
    <footer className="dot-grid-dark mx-3 mt-3 mb-3 rounded-[10px] bg-pine p-10 text-paper sm:mx-5 sm:mb-4 md:p-12">
      <div className="grid gap-10 md:grid-cols-[1.2fr_1fr_1fr]">
        <div>
          <Image
            src={logo}
            alt="Canigan Health Options"
            width={150}
            height={30}
            className="h-7 w-auto object-contain opacity-90 brightness-0 invert"
          />
          <p className="mt-5 max-w-[38ch] text-[0.8rem] leading-[1.8] text-[var(--paper-white)]/80">
            {tagline.split("\n").map((line, i) => (
              <span key={i} className="block">
                {line}
              </span>
            ))}
          </p>
        </div>

        <div>
          <span className="label-caps text-[0.58rem] text-terra">Explore</span>
          <ul className="mt-4 space-y-2">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  {...(link.external ? { target: "_blank", rel: "noreferrer" } : {})}
                  className="text-[0.8rem] text-[var(--paper-white)]/85 transition-colors hover:text-paper"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <span className="label-caps text-[0.58rem] text-terra">Reach Candy</span>
          <ul className="mt-4 space-y-2">
            <li>
              <a
                href={telHref}
                className="text-[0.8rem] text-[var(--paper-white)]/85 transition-colors hover:text-paper"
              >
                {phone}
              </a>
            </li>
            <li>
              <a
                href={`mailto:${email}`}
                className="break-words text-[0.8rem] text-[var(--paper-white)]/85 transition-colors hover:text-paper"
              >
                {email}
              </a>
            </li>
            <li>
              <a
                href={assessmentUrl}
                target="_blank"
                rel="noreferrer"
                className="text-[0.8rem] text-[var(--paper-white)]/85 transition-colors hover:text-paper"
              >
                Free health assessment
              </a>
            </li>
            <li>
              <a
                href="#start"
                className="text-[0.8rem] text-[var(--paper-white)]/85 transition-colors hover:text-paper"
              >
                Get started
              </a>
            </li>
          </ul>
        </div>
      </div>

      <DotRule tone="paper" className="my-9" />

      <div className="space-y-3 text-[0.68rem] leading-[1.7] text-[var(--paper-white)]/55">
        <p>{incomeDisclaimer}</p>
        <p>{healthDisclaimer}</p>
        <p suppressHydrationWarning>{`© ${new Date().getFullYear()} Canigan Health Options. All rights reserved.`}</p>
      </div>
    </footer>
  );
}
