"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { DotRule } from "@/components/site/atoms";
import { ZoomInviteDialog } from "@/components/sections/zoom-invite";
import { Button } from "@/components/ui/button";
import { ASSESSMENT_URL } from "@/cms/content";
import type { ZoomMeeting } from "@/lib/home-types";

/** Shared in-page navigation used by both the header and the footer. */
const NAV_LINKS: { label: string; href: string; external?: boolean }[] = [
  { label: "Wellness", href: "#nutrition" },
  { label: "Science", href: "#science" },
  { label: "Opportunity", href: "#opportunity" },
  { label: "Program details", href: "#benchmarks" },
  { label: "About", href: "#about" },
];

/**
 * Fixed masthead that stays out of the way over the hero photograph and
 * slides down once the reader has scrolled roughly one screen.
 */
export function SiteHeader({
  logo,
  meeting,
  audienceLabel,
}: {
  logo: string;
  meeting?: ZoomMeeting | null;
  audienceLabel?: string;
}) {
  const [shown, setShown] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setShown(window.scrollY > 32);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const menuOpen = open;

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-4 py-3 sm:px-8">
      <div className={`mx-auto max-w-[1440px] rounded-[30px] transition-all duration-300 ${shown || menuOpen ? "bg-white/95 shadow-[0_12px_40px_-26px_hsl(148_19%_12%/0.45)] backdrop-blur" : "bg-transparent"}`}>
        <div className="flex h-16 items-center justify-between px-4 sm:px-5">
          <a href="#top" aria-label="Canigan Health Options — back to top" className="flex items-center gap-2.5">
            <span className="relative block size-12 shrink-0 overflow-hidden rounded-full bg-white">
              <Image
                src={logo}
                alt=""
                width={92}
                height={92}
                className="absolute left-1/2 top-0 h-[92px] w-[92px] max-w-none -translate-x-1/2 object-contain"
              />
            </span>
            <span className="hidden leading-none sm:block">
              <strong className="block text-[1.05rem] tracking-[-0.04em] text-ink">Canigan Health</strong>
              <span className="mt-1 block text-[0.58rem] font-bold uppercase tracking-[0.09em] text-forest">Health Options</span>
            </span>
          </a>

          <nav className="hidden rounded-full bg-white px-7 py-4 shadow-[0_8px_30px_-26px_hsl(148_19%_12%/0.5)] lg:flex lg:gap-8" aria-label="Section navigation">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                {...(link.external ? { target: "_blank", rel: "noreferrer" } : {})}
                className="text-sm font-bold text-ink/80 transition-colors hover:text-forest"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            {audienceLabel ? <Link href="/?choose=1" className="hidden rounded-full bg-parch px-4 py-2 text-xs font-bold text-forest xl:inline-flex">Focus: {audienceLabel}</Link> : null}
            <a href={ASSESSMENT_URL} target="_blank" rel="noreferrer" className="hidden h-11 items-center rounded-full border border-terra px-6 text-sm font-bold text-terra transition-colors hover:bg-white sm:inline-flex">Free quiz</a>
            <ZoomInviteDialog meeting={meeting}>
              <Button
                type="button"
                size="sm"
                className="h-11 rounded-full bg-terra px-6 text-sm font-bold text-white hover:bg-terradeep"
              >
                Join live
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
            className="rounded-b-[28px] border-t border-[var(--hairline-soft)] bg-white px-6 py-5 lg:hidden"
            aria-label="Mobile section navigation"
          >
            <ul className="space-y-3">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    {...(link.external ? { target: "_blank", rel: "noreferrer" } : {})}
                    className="block text-base font-bold text-ink"
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
          <div className="inline-flex rounded-[24px] bg-white p-3">
            <Image
              src={logo}
              alt="Canigan Health Options"
              width={190}
              height={190}
              className="size-[150px] object-contain sm:size-[180px]"
            />
          </div>
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
