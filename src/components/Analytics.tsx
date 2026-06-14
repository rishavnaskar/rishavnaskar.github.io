"use client";

import { useEffect } from "react";
import { initGA, track } from "@/lib/track";

/**
 * Invisible sitewide tracker (mirrors the pareez pattern).
 *
 * - Boots GA4 (gtag.js) — only on the production host, never for bots.
 * - One document-level click listener classifies the CTAs that matter
 *   (book a call, project links, socials, email) with no per-button wiring.
 *   Elements can also opt in explicitly via `data-track` / `data-track-label`.
 */

type Hit = { name: string; params: Record<string, unknown> };

function classify(el: Element): Hit | null {
  const explicit = el.getAttribute("data-track");
  if (explicit) {
    return {
      name: explicit,
      params: { label: el.getAttribute("data-track-label") ?? el.textContent?.trim().slice(0, 80) ?? "" },
    };
  }
  const href = el.getAttribute("href") ?? "";
  if (href.includes("calendly.com")) return { name: "book_call", params: { source: location.hash || "page" } };
  if (href.includes("github.com")) return { name: "social_click", params: { network: "github" } };
  if (href.includes("linkedin.com")) return { name: "social_click", params: { network: "linkedin" } };
  if (href.startsWith("mailto:")) return { name: "email_click", params: {} };
  return null;
}

export default function Analytics() {
  useEffect(() => {
    initGA();

    const onClick = (e: MouseEvent) => {
      const el = (e.target as Element | null)?.closest?.("a[href], [data-track]");
      if (!el) return;
      const hit = classify(el);
      if (hit) track(hit.name, hit.params);
    };
    document.addEventListener("click", onClick, { capture: true, passive: true });
    return () => document.removeEventListener("click", onClick, { capture: true });
  }, []);

  return null;
}
