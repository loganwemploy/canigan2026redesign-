import { getHome } from "@/lib/get-home";
import { HomeLive } from "@/components/site/home-live";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const { home, meeting } = await getHome();
  const serverURL = process.env.NEXT_PUBLIC_SERVER_URL || "http://localhost:3000";

  return <HomeLive home={home} meeting={meeting} serverURL={serverURL} showAudienceGateway />;
}
