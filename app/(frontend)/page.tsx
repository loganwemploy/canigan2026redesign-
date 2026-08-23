import { getHome } from "@/lib/get-home";
import { getPublicServerUrl } from "@/lib/public-server-url";
import { HomeLive } from "@/components/site/home-live";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const { home, meeting } = await getHome();
  const serverURL = getPublicServerUrl();

  return <HomeLive home={home} meeting={meeting} serverURL={serverURL} showAudienceGateway />;
}
