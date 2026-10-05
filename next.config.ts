import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Fully static build: everything is pre-rendered into ./out and served
  // from Cloudflare's edge as plain files. No server, no runtime attack surface.
  output: "export",
  trailingSlash: true,
  images: { unoptimized: true },
  poweredByHeader: false,
};

export default nextConfig;
