"use client";

import { useLivePreview } from "@payloadcms/live-preview-react";
import { RefreshRouteOnSave } from "@/components/site/refresh-on-save";
import { SiteHeader, SiteFooter } from "@/components/sections/chrome";
import { Hero } from "@/components/sections/hero";
import { Assurance } from "@/components/sections/assurance";
import { StickyCta } from "@/components/sections/sticky-cta";
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
  const { data: home } = useLivePreview<HomeData>({
    initialData: initialHome,
    serverURL,
    depth: 2,
  });

  return (
    <>
      <RefreshRouteOnSave serverURL={serverURL} />
      <SiteHeader
        logo={FALLBACK_IMAGES.logo}
        zoomHref={meeting?.link || "#zoom"}
      />
      <main className="bg-cream">
        <Hero data={home.hero} meeting={meeting} />
        <Assurance />
        <Challenge data={home.challenge} />
        <Science data={home.science} />
        <Nutrition data={home.nutrition} />
        <Opportunity data={home.opportunity} />
        <Benchmarks data={home.benchmarks} />
        <Business data={home.business} />
        <GetStarted data={home.getStarted} />
        <About about={home.about} zoomSection={home.zoomSection} meeting={meeting} />
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
