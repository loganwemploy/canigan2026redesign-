import type { ImageSlot } from "@/lib/home-types";

/**
 * Turn a Google Drive share link (any common format) into a directly embeddable
 * image URL served from Google's image CDN. Non-Drive URLs pass through as-is.
 *
 * Supported inputs:
 *   https://drive.google.com/file/d/<ID>/view?usp=sharing
 *   https://drive.google.com/open?id=<ID>
 *   https://drive.google.com/uc?export=download&id=<ID>
 *   https://drive.google.com/uc?id=<ID>
 *   a bare file ID
 */
export function driveToImageUrl(input: string): string {
  const trimmed = input.trim();
  if (!trimmed) return "";

  let id: string | undefined;
  const fileMatch = trimmed.match(/\/file\/d\/([A-Za-z0-9_-]{10,})/);
  const idParam = trimmed.match(/[?&]id=([A-Za-z0-9_-]{10,})/);
  const bareId = trimmed.match(/^([A-Za-z0-9_-]{25,})$/);

  if (fileMatch) id = fileMatch[1];
  else if (idParam) id = idParam[1];
  else if (bareId) id = bareId[1];

  if (id) {
    // lh3 CDN is reliably embeddable for publicly shared Drive files
    return `https://lh3.googleusercontent.com/d/${id}=w2400`;
  }

  return trimmed;
}

/** Resolve an image slot: Google Drive link → uploaded media → bundled fallback. */
export function resolveImage(slot: ImageSlot | undefined | null, fallback: string): string {
  if (slot?.driveUrl && slot.driveUrl.trim()) {
    return driveToImageUrl(slot.driveUrl);
  }

  if (slot?.upload && typeof slot.upload === "object" && slot.upload.url) {
    return slot.upload.url;
  }

  return fallback;
}

/** True when the resolved src needs next/image remotePatterns / unoptimized. */
export function isRemoteImage(src: string): boolean {
  return /^https?:\/\//i.test(src);
}
