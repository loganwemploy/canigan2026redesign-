/**
 * Payload Live Preview needs the public origin. On Vercel, derive it from the
 * deployment rather than accidentally sending server-rendered pages to localhost.
 */
export function getPublicServerUrl() {
  if (process.env.NEXT_PUBLIC_SERVER_URL) return process.env.NEXT_PUBLIC_SERVER_URL;
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`;
  return "http://localhost:3000";
}
