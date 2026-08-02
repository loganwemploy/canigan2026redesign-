import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { HomeLive } from "@/components/site/home-live";
import { getHome } from "@/lib/get-home";
import { AUDIENCE_KEYS, AUDIENCES, isAudienceKey } from "@/lib/audiences";

export const dynamic = "force-dynamic";

export function generateStaticParams() {
  return AUDIENCE_KEYS.map((audience) => ({ audience }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ audience: string }>;
}): Promise<Metadata> {
  const { audience } = await params;
  if (!isAudienceKey(audience)) return {};
  const profile = AUDIENCES[audience];
  return {
    title: profile.seoTitle,
    description: profile.seoDescription,
    alternates: { canonical: `/for/${profile.slug}` },
    openGraph: {
      title: profile.seoTitle,
      description: profile.seoDescription,
      type: "website",
    },
  };
}

export default async function AudiencePage({
  params,
}: {
  params: Promise<{ audience: string }>;
}) {
  const { audience } = await params;
  if (!isAudienceKey(audience)) notFound();

  const { home, meeting } = await getHome();
  const serverURL = process.env.NEXT_PUBLIC_SERVER_URL || "http://localhost:3000";

  return <HomeLive home={home} meeting={meeting} serverURL={serverURL} audienceKey={audience} />;
}
