import type { MetadataRoute } from "next";

// Required for `output: export` — emit the manifest as a static file at build.
export const dynamic = "force-static";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Rishav Naskar — Fullstack Software Engineer",
    short_name: "Rishav Naskar",
    description: "Portfolio of Rishav Naskar — AI · Mobile · Frontend · Backend.",
    start_url: "/",
    display: "standalone",
    background_color: "#0b0b0c",
    theme_color: "#0b0b0c",
    icons: [{ src: "/icon.svg", sizes: "any", type: "image/svg+xml" }],
  };
}
