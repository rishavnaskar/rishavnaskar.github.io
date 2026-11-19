/**
 * rishavnaskar.buildforge.top — the same site, served under the BuildForge
 * domain.
 *
 * GitHub Pages stays the single place the site is built and published: this
 * Worker only fronts it. Every push to master that redeploys
 * rishavnaskar.github.io shows up here too, with no second build or token to
 * keep in sync. Canonical URLs in the HTML still name github.io, so search
 * engines treat this host as a mirror rather than duplicate content.
 *
 * Deploy (only needed when this file or wrangler.jsonc changes):
 *   npm run deploy:edge
 */

const ORIGIN = "https://rishavnaskar.github.io";
const ORIGIN_HOST = new URL(ORIGIN).host;

/** Request headers worth passing upstream: content negotiation and revalidation. */
const FORWARD = ["accept", "accept-language", "if-none-match", "if-modified-since", "range"];

/** GitHub/Fastly plumbing that means nothing to a visitor of this host. */
const STRIP = ["x-github-request-id", "x-fastly-request-id", "x-served-by", "x-cache", "x-cache-hits", "x-timer", "via"];

const YEAR = 60 * 60 * 24 * 365;

const worker = {
  async fetch(request) {
    if (request.method !== "GET" && request.method !== "HEAD") {
      return new Response("Method Not Allowed", { status: 405, headers: { allow: "GET, HEAD" } });
    }

    const url = new URL(request.url);
    const upstream = new URL(url.pathname + url.search, ORIGIN);
    // Next fingerprints everything under /_next/static, so it never changes
    // in place — cache it for a year. Pages keep GitHub's own 10-minute TTL.
    const immutable = url.pathname.startsWith("/_next/static/");

    const headers = new Headers();
    for (const name of FORWARD) {
      const value = request.headers.get(name);
      if (value) headers.set(name, value);
    }

    const res = await fetch(upstream, {
      method: request.method,
      headers,
      redirect: "manual",
      cf: immutable ? { cacheEverything: true, cacheTtl: YEAR } : { cacheEverything: true },
    });

    const out = new Headers(res.headers);
    for (const name of STRIP) out.delete(name);

    // GitHub's redirects (adding the trailing slash, say) point at github.io.
    // Rewrite them so a visitor stays on this host.
    const location = out.get("location");
    if (location) {
      const target = new URL(location, upstream);
      if (target.host === ORIGIN_HOST) {
        target.protocol = url.protocol;
        target.host = url.host;
        out.set("location", target.href);
      }
    }

    if (immutable && res.ok) out.set("cache-control", `public, max-age=${YEAR}, immutable`);
    out.set("x-content-type-options", "nosniff");
    out.set("referrer-policy", "strict-origin-when-cross-origin");

    return new Response(res.body, { status: res.status, statusText: res.statusText, headers: out });
  },
};

export default worker;
