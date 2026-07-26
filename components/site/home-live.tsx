"use client";

import { useLivePreview } from "@payloadcms/live-preview-react";
import { RefreshRouteOnSave } from "@/components/site/refresh-on-save";
import { SiteHeader, SiteFooter } from "@/components/sections/chrome";
import { Hero } from "@/components/sections/hero";
import { Assurance } from "@/components/sections/assurance";
import { StickyCta } from "@/components/sections/sticky-cta";
import { Zoom } from "@/components/sections/zoom";
import { Heritage } from "@/components/sections/heritage";
import { Challenge } from "@/components/sections/challenge";
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

export function HomeLive({
  home: initialHome,
  meeting,
  serverURL,
}: {
  home: HomeData;
  meeting: ZoomMeeting | null;
  serverURL: string;
}) {
  // Admin and site share an origin, so prefer the real one — that keeps Live Preview
  // working on whatever port dev binds, not just the one in NEXT_PUBLIC_SERVER_URL.
  // Not rendered into markup, so this cannot cause a hydration mismatch.
  const previewOrigin = typeof window === "undefined" ? serverURL : window.location.origin;

  const { data: home } = useLivePreview<HomeData>({
    initialData: initialHome,
    serverURL: previewOrigin,
    depth: 2,
  });

  return (
    <>
      <RefreshRouteOnSave />
      <SiteHeader logo={FALLBACK_IMAGES.logo} meeting={meeting} />
      <main className="bg-cream">
        <Hero data={home.hero} meeting={meeting} />
        <Assurance />
        {/* The live Zoom is the strongest CTA, so it sits high rather than
            near the footer; Heritage is the breath between it and the pitch. */}
        <Zoom zoomSection={home.zoomSection} meeting={meeting} />
        <Heritage data={home.heritage} />
        <Challenge data={home.challenge} />
        <Science data={home.science} />
        <Nutrition data={home.nutrition} />
        <Opportunity data={home.opportunity} />
        <Benchmarks data={home.benchmarks} />
        <Business data={home.business} />
        <GetStarted data={home.getStarted} />
        <About about={home.about} />
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
    </>
  );
}
