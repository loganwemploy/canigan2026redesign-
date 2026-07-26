import { getPayload } from "payload";
import config from "@payload-config";
import { homeSeed, zoomSeed } from "@/cms/content";
import type { HomeData, ZoomMeeting } from "@/lib/home-types";

/** Treat null / undefined / "" / [] as "the editor hasn't filled this in". */
function isBlank(value: unknown): boolean {
  if (value === null || value === undefined) return true;
  if (typeof value === "string") return value.trim() === "";
  if (Array.isArray(value)) return value.length === 0;
  return false;
}

/**
 * Deep-merge saved CMS content over the bundled seed so the site is fully populated
 * before anyone opens the admin, and stays populated if a field is later cleared.
 */
function withDefaults<T>(saved: unknown, seed: T): T {
  if (isBlank(saved)) return seed;
  if (Array.isArray(seed)) return saved as T;
  if (typeof seed === "object" && seed !== null && typeof saved === "object" && saved !== null) {
    const out: Record<string, unknown> = { ...(saved as Record<string, unknown>) };
    for (const [key, seedValue] of Object.entries(seed as Record<string, unknown>)) {
      out[key] = withDefaults((saved as Record<string, unknown>)[key], seedValue);
    }
    return out as T;
  }
  return saved as T;
}

export async function getHome(): Promise<{ home: HomeData; meeting: ZoomMeeting | null }> {
  try {
    const payload = await getPayload({ config });

    const [saved, zooms] = await Promise.all([
      payload.findGlobal({ slug: "home", depth: 2 }),
      payload.find({
        collection: "zooms",
        where: { active: { equals: true } },
        sort: "-updatedAt",
        limit: 1,
        depth: 0,
      }),
    ]);

    const meeting = (zooms.docs[0] as ZoomMeeting | undefined) ?? zoomSeed;
    return { home: withDefaults(saved, homeSeed), meeting };
  } catch (error) {
    // The database may not exist yet (fresh clone, or a build without a DB).
    // The site still renders completely from the bundled seed content.
    console.warn("[canigan] Falling back to seed content:", (error as Error).message);
    return { home: homeSeed, meeting: zoomSeed };
  }
}
