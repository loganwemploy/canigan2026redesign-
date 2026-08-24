"use client";

import Link from "next/link";
import { ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SiteEditorProvider } from "@/components/site-editor/editor-context";
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
import { useSiteEditor } from "@/components/site-editor/editor-context";

function SaveIndicator() {
  const { saveStatus } = useSiteEditor();
  if (saveStatus === "idle") return null;
  const label =
    saveStatus === "saving"
      ? "Saving…"
      : saveStatus === "saved"
        ? "Saved"
        : "Save failed — log in at /admin";
  const tone =
    saveStatus === "error" ? "text-destructive" : saveStatus === "saved" ? "text-pine" : "text-inksoft";
  return <p className={`text-[0.72rem] font-bold tracking-wide uppercase ${tone}`}>{label}</p>;
}

function EditorPage() {
  const { home, meeting } = useSiteEditor();

  return (
    <div className="flex h-screen flex-col bg-cream">
      <header className="flex shrink-0 items-center justify-between gap-3 border-b border-[var(--hairline-soft)] bg-cream2 px-4 py-2.5">
        <div>
          <p className="label-caps text-[0.55rem] text-terra">Visual editor</p>
          <p className="text-[0.85rem] font-bold text-ink">Click any text to edit · autosaves</p>
        </div>
        <div className="flex items-center gap-4">
          <SaveIndicator />
          <Button asChild variant="outline" size="sm" className="h-8 rounded-full text-[0.62rem] uppercase">
            <Link href="/admin/globals/home" target="_blank">
              <ExternalLink className="mr-1 size-3" />
              Payload
            </Link>
          </Button>
          <Button asChild size="sm" className="h-8 rounded-full bg-pine text-[0.62rem] uppercase text-paper">
            <Link href="/">Live site</Link>
          </Button>
        </div>
      </header>

      <div className="min-h-0 flex-1 overflow-y-auto">
        <div className="audience-shell" data-text-scale="silver-fox">
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
      </div>
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
