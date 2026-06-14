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
};

export default nextConfig;
