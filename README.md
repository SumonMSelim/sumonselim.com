# sumonselim.com

[![Made with Lovable](https://img.shields.io/badge/Made%20with-Lovable-ff69b4?style=flat-square&logo=heart)](https://lovable.dev)
[![AI Assisted](https://img.shields.io/badge/AI%20Assisted-Claude-8A2BE2?style=flat-square&logo=anthropic)](https://claude.ai)
[![Verified by Human](https://img.shields.io/badge/Verified%20by-Human-2ea44f?style=flat-square&logo=checkmarx)](https://sumonselim.com)
[![Astro](https://img.shields.io/badge/Astro-4-FF5D01?style=flat-square&logo=astro&logoColor=white)](https://astro.build)
[![React](https://img.shields.io/badge/React-18-61DAFB?style=flat-square&logo=react&logoColor=black)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=flat-square&logo=typescript&logoColor=white)](https://typescriptlang.org)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white)](https://tailwindcss.com)
[![Cloudflare Pages](https://img.shields.io/badge/Cloudflare-Pages-F38020?style=flat-square&logo=cloudflare&logoColor=white)](https://pages.cloudflare.com)
[![MIT License](https://img.shields.io/badge/License-MIT-yellow?style=flat-square)](LICENSE)

----

Personal website of Muhammad Sumon Molla Selim.

## Stack

- **Framework**: Astro 4 (SSG) + React islands
- **Content**: Astro Content Collections + MDX
- **Styling**: Tailwind CSS
- **Hosting**: Cloudflare Pages
- **CI/CD**: GitHub Actions

## Local Development

Requires Docker.

```bash
docker compose up
```

App runs at `http://localhost:4321`.

After installing new packages:

```bash
docker compose up --build
```

## Content

Articles and pages are MDX files in `src/content/`:

```
src/content/articles/   # blog posts
src/content/pages/      # standalone pages (mentorship, privacy-policy)
```

## Deployment

Pushing to `main` triggers the GitHub Actions workflow which builds the Astro project and deploys to Cloudflare Pages automatically.
