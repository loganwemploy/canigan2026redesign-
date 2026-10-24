"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Menu, Phone, X } from "lucide-react";
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
 * Emberleaf-style masthead: a fixed bar with the brand on the left, a pill of
 * section links in the middle (the dark pill glides to whichever section is on
 * screen), and the actions on the right. On narrower screens the links move
 * into a frosted menu.
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
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<string | null>(null);
  const linksRef = useRef<HTMLElement>(null);
  const pillRef = useRef<HTMLSpanElement>(null);

  // One scroll listener drives both the bar's frosted state and the section pill.
  useEffect(() => {
    const targets = NAV_LINKS.filter((link) => !link.external).map((link) => link.href);
    const onScroll = () => {
      setScrolled(window.scrollY > 32);
      const line = window.innerHeight * 0.38;
      let current: string | null = null;
      for (const href of targets) {
        const el = document.getElementById(href.slice(1));
        if (!el) continue;
        const rect = el.getBoundingClientRect();
        if (rect.top <= line && rect.bottom > line) current = href;
      }
      setActive(current);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  // Slide the pill under the active link.
  useEffect(() => {
    const pill = pillRef.current;
    const nav = linksRef.current;
    if (!pill || !nav) return;
    const place = () => {
      const el = nav.querySelector<HTMLElement>('a[aria-current="location"]');
      if (!el) {
        pill.style.opacity = "0";
        return;
      }
      pill.style.opacity = "1";
      pill.style.width = `${el.offsetWidth}px`;
      pill.style.transform = `translateX(${el.offsetLeft - 5}px)`;
    };
    place();
    window.addEventListener("resize", place);
    return () => window.removeEventListener("resize", place);
  }, [active]);

  const telHref = phone ? `tel:${phone.replace(/[^\d+]/g, "")}` : null;

  return (
    <header className="nav site-nav" data-scrolled={scrolled || open ? "true" : "false"}>
      <a href="#top" aria-label="Canigan Health Options — back to top" className="brand">
        <span className="logo logo-img">
          <Image
            src={logo}
            alt="Canigan Health Options"
            fill
            loading="eager"
            sizes="48px"
            className="object-contain p-[3px]"
          />
        </span>
        <span className="brand-name">
          <strong>Canigan Health</strong>
          <small>Health Options</small>
        </span>
      </a>

      <nav className="links" aria-label="Section navigation" ref={linksRef}>
        <span className="pill" ref={pillRef} aria-hidden />
        {NAV_LINKS.map((link) => (
          <a
            key={link.href}
            href={link.href}
            aria-current={active === link.href ? "location" : undefined}
            {...(link.external ? { target: "_blank", rel: "noreferrer" } : {})}
          >
            {link.label}
          </a>
        ))}
      </nav>

      <div className="nav-actions">
        {audienceLabel ? (
          <Link href="/?choose=1" className="nav-text nav-change">
            Change what I need
          </Link>
        ) : null}
        {telHref ? (
          <a href={telHref} className="nav-text nav-call">
            <Phone className="size-4" aria-hidden />
            <span className="nav-call-long">Call Candy</span>
            <span className="nav-call-short">Call</span>
          </a>
        ) : null}
        <ZoomInviteDialog meeting={meeting}>
          <Button type="button" size="sm" className="nav-join">
            Join Candy live
          </Button>
        </ZoomInviteDialog>
        <button
          type="button"
          className="nav-menu-btn"
          aria-expanded={open}
          aria-controls="mobile-nav"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="size-5" aria-hidden /> : <Menu className="size-5" aria-hidden />}
        </button>
      </div>

      {open ? (
        <nav id="mobile-nav" className="nav-menu" aria-label="Mobile section navigation">
          <ul>
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  {...(link.external ? { target: "_blank", rel: "noreferrer" } : {})}
                  onClick={() => setOpen(false)}
                >
                  {link.label}
                  <ArrowRight className="size-4" aria-hidden />
                </a>
              </li>
            ))}
            {audienceLabel ? (
              <li>
                <Link href="/?choose=1" onClick={() => setOpen(false)}>
                  Change what I need help with
                  <ArrowRight className="size-4" aria-hidden />
                </Link>
              </li>
            ) : null}
          </ul>
          <div className="nav-menu-actions">
            <Button asChild>
              <a
                href={ASSESSMENT_URL}
                target="_blank"
                rel="noreferrer"
                onClick={() => setOpen(false)}
              >
                Take the free health quiz
                <ArrowRight aria-hidden />
              </a>
            </Button>
            <ZoomInviteDialog meeting={meeting}>
              {/* No menu-close on click — closing would unmount the dialog with it. */}
              <Button type="button" variant="outline">
                Join Candy on Zoom
              </Button>
            </ZoomInviteDialog>
          </div>
        </nav>
      ) : null}
    </header>
  );
}

/** The colophon that closes the page — identity, index, and the fine print. */
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
    <footer className="colophon">
      <div className="colophon-inner">
        <div className="colophon-grid">
          <div className="colophon-brand">
            <span className="colophon-logo">
              <Image
                src={logo}
                alt="Canigan Health Options"
                width={190}
                height={190}
                className="size-full object-contain"
              />
            </span>
            <CmsText kind="home" path="footer.tagline" multiline as="p" className="colophon-tagline">
              {tagline}
            </CmsText>
          </div>

          <div>
            <span className="label-caps">Explore</span>
            <ul className="colophon-links">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    {...(link.external ? { target: "_blank", rel: "noreferrer" } : {})}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <span className="label-caps">Reach Candy</span>
            <ul className="colophon-links">
              <li>
                <a href={telHref}>{phone}</a>
              </li>
              <li>
                <a href={`mailto:${email}`}>{email}</a>
              </li>
              <li>
                <a href={assessmentUrl} target="_blank" rel="noreferrer">
                  Free health assessment
                </a>
              </li>
              <li>
                <a href="#start">Get started</a>
              </li>
            </ul>
          </div>
        </div>

        <DotRule className="colophon-rule" />

        <div className="colophon-legal">
          <CmsText kind="home" path="footer.incomeDisclaimer" multiline as="p">
            {incomeDisclaimer}
          </CmsText>
          <CmsText kind="home" path="footer.healthDisclaimer" multiline as="p">
            {healthDisclaimer}
          </CmsText>
          <p suppressHydrationWarning>{`© ${new Date().getFullYear()} Canigan Health Options. All rights reserved.`}</p>
        </div>
      </div>
    </footer>
  );
}
