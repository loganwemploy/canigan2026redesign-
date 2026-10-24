"use client";

import { useLivePreview } from "@payloadcms/live-preview-react";
import { RefreshRouteOnSave } from "@/components/site/refresh-on-save";
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
import { AudienceGateway } from "@/components/site/audience-gateway";
import { ASSESSMENT_URL, FALLBACK_IMAGES } from "@/cms/content";
import type { HomeData, ZoomMeeting } from "@/lib/home-types";
import { AUDIENCES, personalizeHome, type AudienceKey } from "@/lib/audiences";

export function HomeLive({
  home: initialHome,
  meeting,
  serverURL,
  audienceKey,
  showAudienceGateway = false,
}: {
  home: HomeData;
  meeting: ZoomMeeting | null;
  serverURL: string;
  audienceKey?: AudienceKey;
  showAudienceGateway?: boolean;
}) {
  // Admin and site share an origin, so prefer the real one — that keeps Live Preview
  // working on whatever port dev binds, not just the one in NEXT_PUBLIC_SERVER_URL.
  // Not rendered into markup, so this cannot cause a hydration mismatch.
  const previewOrigin = typeof window === "undefined" ? serverURL : window.location.origin;

  const { data: liveHome } = useLivePreview<HomeData>({
    initialData: initialHome,
    serverURL: previewOrigin,
    depth: 2,
  });
  const audience = audienceKey ? AUDIENCES[audienceKey] : undefined;
  const home = audienceKey ? personalizeHome(liveHome, audienceKey) : liveHome;

  return (
    <div
      className="audience-shell"
      data-audience={audience?.slug}
      data-text-scale="silver-fox"
      data-content-source={audience ? "server-route" : "default"}
    >
      {showAudienceGateway ? <AudienceGateway phone={home.about.phone} /> : null}
      <a href="#main-content" className="skip-link">Skip to main content</a>
      <RefreshRouteOnSave />
      <ScrollProgress />
      <SiteHeader logo={FALLBACK_IMAGES.logo} meeting={meeting} audienceLabel={audience?.navLabel} phone={home.about.phone} />
      <main id="main-content" tabIndex={-1}>
        <h1 className="sr-only">Canigan Health Options — personal wellness guidance with Candy</h1>
        <div id="top">
          <About about={home.about} />
        </div>
        <Heritage data={home.heritage} />
        <SocialUpdates />
        <Challenge data={home.challenge} audience={audience} />
        <Positioning audience={audience} />
        <Nutrition data={home.nutrition} />
        <Science data={home.science} />
        <Zoom zoomSection={home.zoomSection} meeting={meeting} />
        <Opportunity data={home.opportunity} />
        <Benchmarks data={home.benchmarks} />
        <GetStarted data={home.getStarted} />
        <Business data={home.business} />
        <Hero data={home.hero} meeting={meeting} sectionId="hero" audience={audience} />
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
