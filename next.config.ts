import type { NextConfig } from "next";
import { withPayload } from "@payloadcms/next/withPayload";

const nextConfig: NextConfig = {
  // Production builds use webpack (--webpack in package.json) because Turbopack
  // fails to trace sharp@0.35's libvips .so into Vercel serverless bundles.
  serverExternalPackages: ["sharp"],
  outputFileTracingIncludes: {
    "/*": [
      "./node_modules/@img/sharp-libvips-linux-x64/**/*",
      "./node_modules/@img/sharp-linux-x64/**/*",
    ],
  },
  images: {
    // Next 16 blocks query strings on local images unless the pattern is listed,
    // and declaring localPatterns opts every other local path out — so each
    // directory the site optimizes from has to be named here.
    localPatterns: [
      { pathname: "/images/**", search: "" },
      { pathname: "/media/**", search: "" },
      // Cache-busted de-texted hero frame (see app/api/hero-image)
      { pathname: "/api/hero-image", search: "?v=2" },
    ],
    remotePatterns: [
      // Google Drive-hosted photography (see lib/drive.ts)
      { protocol: "https", hostname: "lh3.googleusercontent.com" },
      { protocol: "https", hostname: "drive.google.com" },
      { protocol: "https", hostname: "googleusercontent.com" },
      // Official Shaklee US product / lifestyle CDN (Ambassador marketing assets)
      { protocol: "https", hostname: "images.shaklee.com" },
      { protocol: "https", hostname: "us.shaklee.com" },
      { protocol: "https", hostname: "www.shaklee.com" },
      // Local Payload media is served from /api/media or /media
    ],
  },
};

export default withPayload(nextConfig);
