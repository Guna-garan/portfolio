# Nova — Futuristic Developer Portfolio (React / Vite)

A cinematic, dark, glass-and-glow portfolio built as a plain React app with
Vite, TypeScript, Tailwind CSS, and Framer Motion — converted from the
original Next.js version, same design, same content structure.

## Getting started

```bash
npm install
npm run dev
```

Open the local URL Vite prints (usually http://localhost:5173).

## Add your content

- **Photo** — drop a portrait into `public/profile.jpg` (used in the hero's
  3D scroll reveal). If it's missing, the hero still renders cleanly with the
  gradient plate behind it.
- **Favicon / social image** — replace `public/favicon.ico`,
  `public/apple-touch-icon.png`, and `public/og-image.png` (1200×630).
- **Text content** — everything (roles, stats, projects, skills, experience,
  certifications, social links) lives in one file:
  `src/data/content.ts`. Edit that file to update the site without touching
  any component.
- **Domain** — update the canonical/OG URLs in `index.html` and the URL in
  `public/sitemap.xml` / `public/robots.txt` to your real domain once deployed.
- **Contact form** — `src/components/Contact.tsx` currently shows a success
  state on submit without sending anywhere. Wire `handleSubmit` up to an API
  endpoint or a service like Formspree/Resend to actually deliver messages.

## What changed from the Next.js version

- Routing/App Router removed — this is a single-page app (`src/App.tsx`)
  rendered by `src/main.tsx` via `ReactDOM.createRoot`.
- `next/image` → plain `<img>` with `loading="eager"` on the hero portrait
  (it's above the fold) — everything else that would've been an image uses
  CSS/SVG, so no other swaps were needed.
- `next/font` → Google Fonts loaded via `<link>` tags in `index.html`
  (Space Grotesk, Inter, IBM Plex Mono — same typefaces as before).
- Next's file-based `sitemap.ts` / `robots.ts` → static `public/sitemap.xml`
  and `public/robots.txt`, since Vite has no server-side route handlers.
- `next/head`-style metadata → plain `<meta>` tags and JSON-LD directly in
  `index.html`, with `react-helmet-async` wired up in `main.tsx` in case you
  want to manage per-view metadata later.
- All design, animation, layout, and copy are unchanged.

## Background

The ambient background got an upgrade: layered aurora blobs in more hues,
a slow-rotating conic glow ring for depth, and a small field of drifting
particles — all cursor-reactive light stays, and the particle layer and
cursor tracking still switch off automatically on touch devices so phones
stay light and fast.

## Mobile & performance notes

- The custom cursor, cursor-reactive background light, floating particles,
  and card tilt effects are automatically disabled on touch devices and
  narrow screens (`src/lib/use-device.ts`).
- Lenis smooth scrolling is skipped on touch devices and for users with
  "reduce motion" enabled, falling back to normal native scrolling.
- All animation respects `prefers-reduced-motion`.

## Build for production

```bash
npm run build
npm run preview
```

`npm run build` outputs static files to `dist/` — deployable to Vercel,
Netlify, GitHub Pages, or any static host.
