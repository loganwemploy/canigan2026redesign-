"use client";

import { RefreshRouteOnSave as PayloadRefresh } from "@payloadcms/live-preview-react";
import { useRouter } from "next/navigation";
import { useSyncExternalStore } from "react";

/**
 * Powers the visual editor: when the page is open inside Payload's Live Preview
 * iframe, saving in the admin re-renders this route in place.
 *
 * The admin and the site are the same app, so the live-preview origin is always
 * this page's own origin. Reading it at runtime keeps preview working on whatever
 * port dev happens to bind, instead of only the one baked into NEXT_PUBLIC_SERVER_URL.
 */
const subscribe = () => () => {};
const getOrigin = () => window.location.origin;
const getServerOrigin = () => null;

export function RefreshRouteOnSave() {
  const router = useRouter();
  const origin = useSyncExternalStore(subscribe, getOrigin, getServerOrigin);

  if (!origin) return null;
  return <PayloadRefresh refresh={() => router.refresh()} serverURL={origin} />;
}
