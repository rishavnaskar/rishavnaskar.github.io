/**
 * ─────────────────────────────────────────────────────────────────
 *  Google Analytics 4 — lightweight, dependency-free wiring.
 *
 *  - Loads gtag.js only on the production host (never on localhost /
 *    preview), and never for bots/headless — so reports stay clean.
 *  - GA4 Enhanced Measurement handles page_view, scroll depth and
 *    outbound clicks automatically; `track()` adds named events for
 *    the conversions that matter (booking a call, project clicks, …).
 *  - The Measurement ID is public — safe to ship to the browser.
 * ─────────────────────────────────────────────────────────────────
 */

export const GA_ID = "G-REMG8GHJW1";

/** Hosts on which analytics is active. Add a custom domain here later. */
const TRACKED_HOSTS = ["rishavnaskar.github.io"];

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

function isBot(): boolean {
  if (typeof navigator === "undefined") return true;
  if (navigator.webdriver) return true;
  return /bot|crawl|spider|slurp|lighthouse|headless|preview/i.test(navigator.userAgent);
}

export function shouldTrack(): boolean {
  if (typeof window === "undefined") return false;
  if (!TRACKED_HOSTS.includes(window.location.hostname)) return false;
  return !isBot();
}

let initialised = false;

/** Inject gtag.js and configure GA4. No-op off the tracked host / for bots. */
export function initGA(): void {
  if (initialised || !shouldTrack()) return;
  initialised = true;

  const s = document.createElement("script");
  s.async = true;
  s.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`;
  document.head.appendChild(s);

  window.dataLayer = window.dataLayer || [];
  window.gtag = function gtag() {
    // eslint-disable-next-line prefer-rest-params
    window.dataLayer!.push(arguments);
  };
  window.gtag("js", new Date());
  window.gtag("config", GA_ID);
}

/** Record a custom event. Safe anywhere on the client. */
export function track(name: string, params: Record<string, unknown> = {}): void {
  if (!shouldTrack() || typeof window.gtag !== "function") return;
  window.gtag("event", name, params);
}
