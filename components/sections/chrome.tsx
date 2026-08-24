"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Menu, Phone, X } from "lucide-react";
import { DotRule } from "@/components/site/atoms";
import { CmsText } from "@/components/site-editor/inline-edit";
import { ZoomInviteDialog } from "@/components/sections/zoom-invite";
import { Button } from "@/components/ui/button";
import { ASSESSMENT_URL } from "@/cms/content";
import type { ZoomMeeting } from "@/lib/home-types";

/** Shared in-page navigation used by both the header and the footer. */
const NAV_LINKS: { label: string; href: string; external?: boolean }[] = [
  { label: "Health plans", href: "#nutrition" },
  { label: "Why trust it", href: "#science" },
  { label: "Save or earn", href: "#opportunity" },
  { label: "About Candy", href: "#about" },
];

/**
 * Sticky masthead that remains available without covering the first section.
 */
export function SiteHeader({
  logo,
  meeting,
  audienceLabel,
  phone,
}: {
  logo: string;
  meeting?: ZoomMeeting | null;
  audienceLabel?: string;
  phone?: string;
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
  const telHref = phone ? `tel:${phone.replace(/[^\d+]/g, "")}` : null;

  return (
    <header className="sticky inset-x-0 top-0 z-50 px-4 py-3 sm:px-8">
      <div className={`mx-auto max-w-[1440px] rounded-[30px] bg-white/96 backdrop-blur transition-shadow duration-300 ${shown || menuOpen ? "shadow-[0_12px_40px_-26px_hsl(148_19%_12%/0.45)]" : "shadow-[0_8px_26px_-24px_hsl(148_19%_12%/0.4)]"}`}>
        <div className="flex min-h-20 items-center justify-between px-4 sm:min-h-24 sm:px-5">
          <a href="#top" aria-label="Canigan Health Options — back to top" className="flex items-center gap-2.5">
            <span className="relative block size-16 shrink-0 sm:size-[92px]">
              <Image
                src={logo}
                alt="Canigan Health Options"
                fill
                sizes="(min-width: 640px) 92px, 64px"
                className="object-contain"
              />
            </span>
            <span className="hidden leading-none sm:block">
              <strong className="block text-[1.08rem] tracking-[-0.02em] text-ink">Canigan Health</strong>
              <span className="mt-1 block text-[0.82rem] font-bold tracking-normal text-forest">Health Options</span>
            </span>
          </a>

          <nav className="hidden rounded-full bg-white px-5 py-2 shadow-[0_8px_30px_-26px_hsl(148_19%_12%/0.5)] lg:flex lg:gap-2" aria-label="Section navigation">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                {...(link.external ? { target: "_blank", rel: "noreferrer" } : {})}
                className="inline-flex min-h-12 items-center rounded-full px-3 text-base font-bold text-ink transition-colors hover:bg-parch hover:text-forest"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            {audienceLabel ? <Link href="/?choose=1" className="hidden min-h-12 items-center rounded-full bg-parch px-4 py-2 text-base font-bold text-forest xl:inline-flex">Change what I need</Link> : null}
            {telHref ? <a href={telHref} className="inline-flex min-h-12 items-center rounded-full border border-terra px-4 text-base font-bold text-terra transition-colors hover:bg-parch sm:px-5">
              <Phone className="mr-2 size-5" aria-hidden />
              <span className="hidden sm:inline">Call Candy</span>
              <span className="sm:hidden">Call</span>
            </a> : null}
            <ZoomInviteDialog meeting={meeting}>
              <Button
                type="button"
                size="sm"
                className="hidden h-12 rounded-full bg-terra px-5 text-base font-bold text-white hover:bg-terradeep md:inline-flex"
              >
                Join Candy live
              </Button>
            </ZoomInviteDialog>
            <button
              type="button"
              className="grid size-12 cursor-pointer place-items-center rounded-full border border-[var(--hairline)] text-ink lg:hidden"
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
                    className="flex min-h-12 items-center rounded-lg px-2 text-lg font-bold text-ink hover:bg-parch"
                    onClick={() => setOpen(false)}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
              <li>
                <a
                  href={ASSESSMENT_URL}
                  target="_blank"
                  rel="noreferrer"
                  className="flex min-h-12 items-center rounded-lg px-2 text-lg font-bold text-ink hover:bg-parch"
                  onClick={() => setOpen(false)}
                >
                  Take the free health quiz
                </a>
              </li>
              {audienceLabel ? (
                <li>
                  <Link
                    href="/?choose=1"
                    className="flex min-h-12 items-center rounded-lg px-2 text-lg font-bold text-forest hover:bg-parch"
                    onClick={() => setOpen(false)}
                  >
                    Change what I need help with
                  </Link>
                </li>
              ) : null}
              <li>
                <ZoomInviteDialog meeting={meeting}>
                  {/* No menu-close on click — closing would unmount the dialog with it. */}
                  <button type="button" className="min-h-12 cursor-pointer text-lg font-bold text-terra">
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
          <CmsText
            kind="home"
            path="footer.tagline"
            multiline
            as="p"
            className="mt-5 max-w-[38ch] text-base leading-[1.75] text-[var(--paper-white)]/90"
          >
            {tagline}
          </CmsText>
        </div>

        <div>
          <span className="label-caps text-[0.82rem] text-sage">Explore</span>
          <ul className="mt-4 space-y-2">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  {...(link.external ? { target: "_blank", rel: "noreferrer" } : {})}
                  className="inline-flex min-h-12 items-center text-base text-[var(--paper-white)]/90 transition-colors hover:text-paper"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <span className="label-caps text-[0.82rem] text-sage">Reach Candy</span>
          <ul className="mt-4 space-y-2">
            <li>
              <a
                href={telHref}
                className="inline-flex min-h-12 items-center text-base text-[var(--paper-white)]/90 transition-colors hover:text-paper"
              >
                {phone}
              </a>
            </li>
            <li>
              <a
                href={`mailto:${email}`}
                className="inline-flex min-h-12 items-center break-words text-base text-[var(--paper-white)]/90 transition-colors hover:text-paper"
              >
                {email}
              </a>
            </li>
            <li>
              <a
                href={assessmentUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex min-h-12 items-center text-base text-[var(--paper-white)]/90 transition-colors hover:text-paper"
              >
                Free health assessment
              </a>
            </li>
            <li>
              <a
                href="#start"
                className="inline-flex min-h-12 items-center text-base text-[var(--paper-white)]/90 transition-colors hover:text-paper"
              >
                Get started
              </a>
            </li>
          </ul>
        </div>
      </div>

      <DotRule tone="paper" className="my-9" />

      <div className="space-y-4 text-[0.88rem] leading-[1.75] text-[var(--paper-white)]/78">
        <CmsText kind="home" path="footer.incomeDisclaimer" multiline as="p">
          {incomeDisclaimer}
        </CmsText>
        <CmsText kind="home" path="footer.healthDisclaimer" multiline as="p">
          {healthDisclaimer}
        </CmsText>
        <p suppressHydrationWarning>{`© ${new Date().getFullYear()} Canigan Health Options. All rights reserved.`}</p>
      </div>
    </footer>
  );
}
