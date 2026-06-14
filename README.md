# rishavnaskar.github.io

Personal portfolio of **Rishav Naskar** — fullstack software engineer (AI · Mobile · Frontend · Backend). A premium, fully-responsive single-page site built with **Next.js**.

🔗 **Live:** https://rishavnaskar.github.io

## Stack

- **Next.js 16** (App Router) + **React 19** + **TypeScript**
- **Tailwind CSS v4** (`@theme` design tokens) for styling
- **Framer Motion** for animation — scroll reveals use `whileInView` (IntersectionObserver, GPU transforms only), so scrolling stays smooth
- **React Three Fiber + three.js** for the ambient particle hero (contained to the hero and **paused when off-screen** for performance)
- **lucide-react** icons
- Statically exported (`output: "export"`) and hosted on **GitHub Pages**

## Features

- **Automatic light / dark** — follows OS `prefers-color-scheme` with a manual toggle persisted to `localStorage` (no flash of wrong theme).
- **WebGL particle hero** — theme-aware, mouse-reactive, render loop paused when scrolled past or the tab is hidden.
- **Motion** — kinetic role rotator, staggered hero entrance, scroll reveals, 3D tilt cards, animated counters, infinite marquee.
- **Book a call** — Calendly popup integration (lazy-loaded, with link fallback).
- **SEO** — metadata, Open Graph/Twitter cards, JSON-LD, sitemap-friendly static HTML.
- **Accessible & robust** — `prefers-reduced-motion` honored, print stylesheet, no horizontal overflow at any breakpoint.

## Project structure

```
src/
  app/
    layout.tsx        # fonts, metadata, theme provider, no-flash script
    page.tsx          # composes the sections
    globals.css       # Tailwind v4 @theme tokens + light/dark + utilities
    not-found.tsx     # branded 404
    icon.svg          # gradient "RN" favicon
    manifest.ts
  components/          # Navbar, Hero, Hero3D, sections, Reveal, TiltCard, …
  lib/
    site.ts           # central identity/contact config
    data.ts           # experience, projects, skills, achievements
    utils.ts          # cn()
```

## Develop

```bash
npm install
npm run dev      # http://localhost:3003
```

## Build & deploy

```bash
npm run build    # static export → ./out
```

Deployment is automated: pushing to `master` triggers `.github/workflows/deploy.yml`, which builds the static export and publishes it to GitHub Pages. (Set **Settings → Pages → Source → GitHub Actions** once.)

---

© Rishav Naskar · San Francisco, CA
