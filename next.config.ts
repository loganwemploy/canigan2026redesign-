import type { NextConfig } from "next";
import { withPayload } from "@payloadcms/next/withPayload";

const nextConfig: NextConfig = {
  images: {
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
