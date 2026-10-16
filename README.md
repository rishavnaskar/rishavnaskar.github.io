# rishavnaskar.github.io

Personal portfolio of **Rishav Naskar** — fullstack software engineer (AI · Mobile · Frontend · Backend). A single-page, statically exported **Next.js** site hosted on GitHub Pages.

🔗 **Live:** https://rishavnaskar.github.io

```bash
npm install
npm run dev      # http://localhost:3003
npm run build    # static export → ./out
npm run lint     # eslint (next/core-web-vitals + typescript)
```

## Stack

- **Next.js 16** (App Router) + **React 19** + **TypeScript**, `output: "export"`
- **Tailwind CSS v4** — the whole design system is `@theme` tokens in `globals.css`
- **Framer Motion** for the few things CSS cannot do (route-less page transitions, the mobile menu, the role rotator)
- **React Three Fiber + three.js** for the hero phone and the two hobby models — both lazy, both paused off-screen
- **lucide-react** icons

## Where things live

| Path | What it is |
| --- | --- |
| `src/lib/site.ts` | Identity, links, contact details, nav. Edit here, not in components. |
| `src/lib/data.ts` | Résumé content — experience, projects, skills, achievements, stats. |
| `src/app/globals.css` | Design tokens (light + dark), type scale, the `.shell` / `.eyebrow` / `.rail-m` primitives, reveal animations. |
| `src/components/ui.tsx` | Reveal primitives (`Rise`, `ClipLines`), chrome (`Button`, `Eyebrow`, `SectionHead`, `Tag`) and disclosure (`Collapse`, `TextToggle`, `PlusIcon`). |
| `src/components/LatticeGrid.tsx` | The signature canvas: a field of squares resolving into a lattice, with pointer-reactive ember cells. |
| `src/components/*Section.tsx` | One file per page section, composed in `src/app/page.tsx`. |
| `src/components/playground/` | The device mockups and the app screens that run inside them. |
| `src/components/hobbies/` | The lazy 3D stage (`HobbyModel` → `ModelViewer` → `HobbyCanvas`). |
| `src/app/opengraph-image.png` | The social share card. Regenerate by hand if the headline changes. |

## Design system — "paper & ink"

- **Surfaces** — `paper` (the page: warm off-white, charcoal in dark mode) and `ink` (near-black bands that stay dark in *both* themes). Text on paper is `fg` / `graphite` / `ash`; text on ink is `on-ink` or white at an opacity.
- **Accent** — one ember, `#f0521c`, with `ember-lit` for dark grounds and `ember-deep` for small labels on light ones.
- **Type** — Host Grotesk for everything, JetBrains Mono for the uppercase eyebrows. Display sizes are fluid `clamp()` values.
- **Rhythm** — paper, warm paper and ink bands alternate down the page. Ink sections carry `data-nav="dark"`, which inverts the floating nav pill as it passes over them.
- **Theme** — follows the OS, with a manual toggle persisted to `localStorage` and a no-flash script in `layout.tsx`. Re-pointing the `--color-*` variables under `[data-theme]` re-themes the whole site.

## Keeping it short

The page is long in content and short in scroll, on purpose:

- Card rows become **horizontal snap rails** below `sm` (`.rail-m`), or below `md` for the device mockups (`.rail-md`).
- Projects are an **index + panel** on desktop and an **accordion** on phones; experience is an accordion everywhere, with the current role open.
- Long copy collapses behind a toggle (`Collapse`) and **stays in the DOM**, so it is still crawlable and findable in-page.
- Stats live in the hero's credibility band rather than a section of their own.

## Performance notes

- Reveals are CSS animations armed after hydration — nothing ships as `opacity: 0`, so the page reads with JS off and LCP is not gated on React.
- three.js is never in the initial bundle: the hero scene mounts only on desktop, and the hobby viewer's chunk is requested when its section scrolls within 600px.
- The Calendly widget loads on **intent** (hover / focus / touch), not on page load; a click before it is ready opens the booking page in a new tab.
- The WebGL loops and the lattice canvas pause whenever they are off-screen or the tab is hidden.

## Deploy

Pushing to `master` runs `.github/workflows/deploy.yml`, which builds the static export and publishes `./out` to GitHub Pages. `robots.txt`, `sitemap.xml` and the manifest are generated at build time.

---

© Rishav Naskar · Bengaluru, India
