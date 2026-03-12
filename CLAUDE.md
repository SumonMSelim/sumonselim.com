# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development commands

All commands run inside Docker. Never run npm directly on the host.

```bash
docker compose up                                  # start dev server (port 4321, hot-reload)
docker compose up --build                          # rebuild after adding/removing packages
docker compose exec web npm install <pkg>          # install a package
docker compose exec web npm run lint               # ESLint
docker compose exec web npm run build              # production build (dist/)
```

There is no test suite.

## Architecture

**Astro 4 SSG** — everything pre-rendered at build time. React components are islands that hydrate only when marked with `client:*` directives.

### Content

- `src/content/articles/` — MDX blog posts. Schema: `title`, `date`, `tag`, `excerpt?`.
- `src/content/pages/` — MDX standalone pages (mentorship, privacy-policy). Schema: `title` only.
- `src/content/config.ts` — Zod schemas for both collections.

MDX files can use two components passed via `components` prop: `<Embed>` (iframes) and `<Gallery>` (photo grid).

### Routing

| Route             | File                                                        |
|-------------------|-------------------------------------------------------------|
| `/`               | `src/pages/index.astro`                                     |
| `/articles`       | `src/pages/articles/index.astro`                            |
| `/<article-slug>` | `src/pages/[slug].astro` (also serves standalone MDX pages) |
| `/about`          | `src/pages/about.astro`                                     |
| `/og/<slug>.png`  | `src/pages/og/[slug].png.ts` (OG image generation)          |

`src/pages/[slug].astro` handles both `articles` and `pages` collections via `getCollection` and sets `isArticle` flag to conditionally render article-specific UI (date, tag, reading time, JSON-LD, breadcrumbs).

### Key files

- `src/layouts/Layout.astro` — single layout wrapper with full SEO meta, theme init script, console art, `@fontsource` imports
- `src/index.css` — all CSS custom properties (light + dark themes), utility classes (`.rich-content`, `.terminal-card`, `.glow-text`, etc.)
- `tailwind.config.ts` — custom font families, color tokens (`terminal`, `glow`), dark mode via `class`
- `src/lib/static-data.ts` — bio, social links, certifications (no external CMS)
- `src/lib/types.ts` — shared TypeScript interfaces (`Article`, `Photo`, `Social`, etc.) and `formatDate` helper

### Design system

Hacker/Matrix terminal aesthetic, dark-first. Fonts: Special Elite (display), Fira Code (mono), Inter (body) — all via `@fontsource` (no CDN). Primary accent: `#00e545`. CSS variables drive both themes; dark mode toggled via `document.documentElement.classList` + localStorage.

## Deployment

GitHub Actions (`push` to `main`) → `npm run build` → Cloudflare Pages via `cloudflare/pages-action@v1`.

Required GitHub secrets: `CLOUDFLARE_API_TOKEN`, `CLOUDFLARE_ACCOUNT_ID`.

Static hosting config lives in `public/`:
- `_headers` — CSP, immutable cache for `/_astro/*` and `/assets/*`
- `_redirects` — page-level redirects
- `robots.txt`, `site.webmanifest`

## Page title format

All pages use the suffix `— Muhammad Sumon Molla Selim | Senior Software Engineer`.
