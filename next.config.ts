import type { NextConfig } from "next";

/**
 * This site is hosted on GitHub Pages (rishavnaskar.github.io — a user site
 * served from the domain root), so we statically export to plain HTML/CSS/JS.
 * No basePath is needed because it lives at the root (not a project subpath).
 */
const nextConfig: NextConfig = {
  output: "export",
  reactStrictMode: true,
  poweredByHeader: false,
  trailingSlash: true,
  images: {
    // Required for `output: export` — no server image optimizer at runtime.
    unoptimized: true,
    formats: ["image/avif", "image/webp"],
  },
  /**
   * Lets `next dev` accept requests that arrive on the LAN address rather than
   * localhost, which is how the site gets opened on a real phone for testing.
   * Dev-only and ignored by the export, so it has no effect on what ships. The
   * address is DHCP-assigned — if phone testing starts failing, re-check it
   * with `ipconfig getifaddr en0` and update this list.
   */
  allowedDevOrigins: ["192.168.68.110"],
};

export default nextConfig;
