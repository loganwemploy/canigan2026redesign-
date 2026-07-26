"use client";

import { RefreshRouteOnSave as PayloadRefresh } from "@payloadcms/live-preview-react";
import { useRouter } from "next/navigation";

/**
 * Powers the visual editor: when the page is open inside Payload's Live Preview
 * iframe, saving in the admin re-renders this route in place.
 */
export function RefreshRouteOnSave({ serverURL }: { serverURL: string }) {
  const router = useRouter();
  return <PayloadRefresh refresh={() => router.refresh()} serverURL={serverURL} />;
}
