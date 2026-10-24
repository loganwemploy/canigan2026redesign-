"use client";

import { useEffect } from "react";
import Link from "next/link";
import { SiteEditorProvider, useSiteEditor } from "@/components/site-editor/editor-context";
import { ScrollProgress } from "@/components/motion/effects";
import { SiteHeader, SiteFooter } from "@/components/sections/chrome";
import { Hero } from "@/components/sections/hero";
import { StickyCta } from "@/components/sections/sticky-cta";
import { Zoom } from "@/components/sections/zoom";
import { Heritage } from "@/components/sections/heritage";
import { SocialUpdates } from "@/components/sections/social-updates";
import { Challenge } from "@/components/sections/challenge";
import { Positioning } from "@/components/sections/positioning";
import { Science } from "@/components/sections/science";
import { Nutrition } from "@/components/sections/nutrition";
import { Opportunity } from "@/components/sections/opportunity";
import { Benchmarks } from "@/components/sections/benchmarks";
import { Business } from "@/components/sections/business";
import { GetStarted } from "@/components/sections/get-started";
import { About } from "@/components/sections/about";
import { Contact } from "@/components/sections/contact";
import { ASSESSMENT_URL, FALLBACK_IMAGES } from "@/cms/content";
import type { HomeData, ZoomMeeting } from "@/lib/home-types";

/** Block in-page link navigation while editing so clicks edit text, not jump. */
function useBlockNavInEditor() {
  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement | null;
      if (!target) return;
      if (target.closest("[data-editor-chrome]")) return;
      const anchor = target.closest("a");
      if (anchor) {
        event.preventDefault();
        event.stopPropagation();
      }
    };
    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, []);
}

function SavePill() {
  const { saveStatus } = useSiteEditor();
  const label =
    saveStatus === "saving"
      ? "Saving…"
      : saveStatus === "saved"
        ? "Saved"
        : saveStatus === "error"
          ? "Save failed"
          : "Editing live";
  const tone =
    saveStatus === "error"
      ? "bg-destructive text-white"
      : saveStatus === "saved"
        ? "bg-pine text-paper"
        : saveStatus === "saving"
          ? "bg-ink text-paper"
          : "bg-cream2/95 text-ink";

  return (
    <div
      data-editor-chrome
      className="pointer-events-none fixed top-3 right-3 z-[60] flex items-center gap-2 sm:top-4 sm:right-4"
    >
      <span
        className={`pointer-events-none rounded-full px-3 py-1.5 text-[0.65rem] font-bold tracking-[0.14em] uppercase shadow-sm backdrop-blur ${tone}`}
      >
        {label}
      </span>
      <Link
        href="/"
        className="pointer-events-auto rounded-full border border-[var(--hairline)] bg-cream2/95 px-3 py-1.5 text-[0.65rem] font-bold tracking-[0.14em] uppercase text-ink shadow-sm backdrop-blur hover:bg-parch"
      >
        Exit
      </Link>
    </div>
  );
}

function EditorPage() {
  const { home, meeting } = useSiteEditor();
  useBlockNavInEditor();

  return (
    <div className="audience-shell min-h-screen bg-cream" data-text-scale="silver-fox">
      <SavePill />
      <ScrollProgress />
      <SiteHeader logo={FALLBACK_IMAGES.logo} meeting={meeting} phone={home.about.phone} />
      <main id="main-content" className="overflow-hidden bg-cream outline-none">
        <h1 className="sr-only">Canigan Health Options — site editor</h1>
        <div id="top">
          <About about={home.about} />
        </div>
        <Heritage data={home.heritage} />
        <SocialUpdates />
        <Challenge data={home.challenge} />
        <Positioning />
        <Nutrition data={home.nutrition} />
        <Science data={home.science} />
        <Zoom zoomSection={home.zoomSection} meeting={meeting} />
        <Opportunity data={home.opportunity} />
        <Benchmarks data={home.benchmarks} />
        <GetStarted data={home.getStarted} />
        <Business data={home.business} />
        <Hero data={home.hero} meeting={meeting} sectionId="hero" />
        <Contact data={home.contact} />
        <SiteFooter
          logo={FALLBACK_IMAGES.logo}
          tagline={home.footer.tagline}
          incomeDisclaimer={home.footer.incomeDisclaimer}
          healthDisclaimer={home.footer.healthDisclaimer}
          phone={home.about.phone}
          email={home.about.email}
          assessmentUrl={ASSESSMENT_URL}
        />
      </main>
      <StickyCta meeting={meeting} />
    </div>
  );
}

export function SiteEditorShell({
  initialHome,
  initialMeeting,
}: {
  initialHome: HomeData;
  initialMeeting: ZoomMeeting | null;
}) {
  return (
    <SiteEditorProvider initialHome={initialHome} initialMeeting={initialMeeting}>
      <EditorPage />
    </SiteEditorProvider>
  );
}
