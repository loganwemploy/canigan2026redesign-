import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { getPayload } from "payload";
import config from "@payload-config";
import { getHome } from "@/lib/get-home";
import { SiteEditorShell } from "@/components/site-editor/editor-shell";

export const dynamic = "force-dynamic";

export default async function SiteEditorPage() {
  const payload = await getPayload({ config });
  const { user } = await payload.auth({ headers: await headers() });

  if (!user) {
    redirect("/admin");
  }

  const { home, meeting } = await getHome();

  return <SiteEditorShell initialHome={home} initialMeeting={meeting} />;
}
