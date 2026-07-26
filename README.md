# Portfolio — Next.js + TypeScript + Tailwind CSS

A minimal, modern, fully responsive developer portfolio with a resume download
link, SEO metadata, and an animated system-architecture graphic in the hero.

---

## 1. Tech stack & dependencies

| Package | Version | What it's for |
|---|---|---|
| `next` | 14.2.35 | React framework (App Router), routing, SSG, SEO metadata API |
| `react` / `react-dom` | 18.3.1 | UI library |
| `typescript` | 5.6.2 | Type safety |
| `tailwindcss` | 3.4.13 | Utility-first styling |
| `framer-motion` | 11.5.6 | Scroll-reveal animations (respects reduced-motion) |
| `lucide-react` | 0.446.0 | Icon set (menu, resume download, socials, etc.) |
| `autoprefixer` / `postcss` | — | Required by Tailwind |
| `eslint` / `eslint-config-next` | — | Linting |

Nothing else is required. No database, no backend, no API keys — it's a
static site, so it deploys instantly and free on Vercel.

Fonts (Space Grotesk, Inter, JetBrains Mono) are **self-hosted** inside
`app/fonts/` and loaded with `next/font/local`, so the site makes zero
requests to Google Fonts — faster load, no layout shift, works offline.

---

## 2. Run it locally

You need [Node.js 18.18+](https://nodejs.org) installed (20 LTS recommended).

```bash
# 1. unzip and enter the folder
cd portfolio

# 2. install dependencies
npm install

# 3. start the dev server
npm run dev
```

Open **http://localhost:3000** — you should see the site with hot reload.

Other scripts:
```bash
npm run build   # production build (also catches type/lint errors)
npm run start   # serve the production build locally
npm run lint    # run ESLint
```

---

## 3. Personalize it

Everything you need to change lives in **one file**: `lib/data.ts`.

- `site` — your name, role, tagline, email, GitHub/LinkedIn/Twitter URLs,
  and `siteUrl` (your final domain, used for SEO tags).
- `about` — your bio paragraphs.
- `skills` — your tech stack, grouped (Frontend / Backend / Data / Infra).
- `projects` — your real projects: title, description, tech tags,
  live link, repo link.
- `journey` — your learning timeline (currently ends at "System design").

No other file needs editing for basic personalization.

### Add your resume
Replace `public/resume.pdf` with your real resume — **keep the exact
filename** `resume.pdf` and the download buttons (navbar, hero, contact)
will automatically serve it. If you'd rather use a different filename,
change `resumeUrl` in `lib/data.ts`.

### Swap the social preview image (optional)
`public/og-image.png` is what shows up when your link is shared on
LinkedIn/Twitter/WhatsApp. It's a placeholder — swap it for a real
1200×630 image whenever you like.

### Favicon
`public/favicon.svg` is a small generated mark. Replace it with your own
logo/initials if you want.

---

## 4. SEO — what's already set up

- Per-page `<title>` template, meta description, keywords via the Next.js
  Metadata API (`app/layout.tsx`)
- Open Graph + Twitter Card tags (so shared links look good)
- JSON-LD `Person` structured data (helps Google understand who you are)
- Auto-generated `sitemap.xml` and `robots.txt` (`app/sitemap.ts`,
  `app/robots.ts`)
- Semantic HTML, alt text on icons, visible focus states, fast static
  pages (all good ranking signals)

**Before you deploy:** update `siteUrl` in `lib/data.ts` to your real
domain (or your `*.vercel.app` URL) — this feeds the sitemap and Open
Graph tags. After deploying, submit your site to
[Google Search Console](https://search.google.com/search-console) and
verify + submit `https://yourdomain.com/sitemap.xml` so Google indexes it.

---

## 5. Deploy to Vercel

**Option A — GitHub (recommended):**
1. Push this folder to a new GitHub repo.
2. Go to [vercel.com/new](https://vercel.com/new), import the repo.
3. Framework preset auto-detects as Next.js — just click **Deploy**.
4. Done — you'll get a live `*.vercel.app` URL in ~1 minute.

**Option B — Vercel CLI, no GitHub needed:**
```bash
npm install -g vercel
vercel
```
Follow the prompts; it deploys straight from your machine.

After the first deploy, every future `git push` (Option A) auto-redeploys.

To use a custom domain: in the Vercel dashboard → your project →
**Settings → Domains** → add your domain and follow the DNS instructions.

---

## 6. Project structure

```
portfolio/
├── app/
│   ├── fonts/            self-hosted variable fonts
│   ├── layout.tsx         root layout, fonts, SEO metadata, JSON-LD
│   ├── page.tsx           assembles all sections
│   ├── globals.css        design tokens, base styles
│   ├── sitemap.ts         auto-generated sitemap.xml
│   └── robots.ts          auto-generated robots.txt
├── components/
│   ├── Navbar.tsx
│   ├── Hero.tsx
│   ├── SchemaGraphic.tsx  animated architecture-diagram hero visual
│   ├── About.tsx
│   ├── TechStack.tsx
│   ├── Projects.tsx
│   ├── Journey.tsx
│   ├── Contact.tsx
│   ├── Footer.tsx
│   └── ScrollReveal.tsx   scroll-in animation wrapper
├── lib/
│   └── data.ts            ← all your content goes here
├── public/
│   ├── resume.pdf          ← replace with your real resume
│   ├── og-image.png        social preview image (placeholder)
│   └── favicon.svg
└── package.json
```

Enjoy — and good luck with the portfolio.
