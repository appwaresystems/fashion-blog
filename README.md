# The Style Edit

An editorial year-round fashion journal for women, built with Next.js App Router, JavaScript, Markdown, and Tailwind CSS. The site is fully static and ready to deploy on Cloudflare Pages.

## Stack

- Next.js 15 with the App Router
- React 19
- JavaScript and JSX only
- Tailwind CSS 3
- Markdown articles parsed with `gray-matter`, `remark`, and `remark-html`
- Static export to `out/`
- No database, authentication, checkout, or server runtime

## Requirements

- Node.js 20.19.0 or newer
- npm 10 or newer

The included `.nvmrc` selects Node 20.19.0. Run `nvm use` before installing dependencies.

## Local development

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Scripts

| Command | Purpose |
| --- | --- |
| `npm run dev` | Start the development server |
| `npm run lint` | Run ESLint across the project |
| `npm run build` | Create the production build and static export in `out/` |
| `npm run preview` | Serve the exported `out/` directory locally |

Always run `npm run lint` and `npm run build` before deploying.

## Project structure

```text
app/                  App Router pages, metadata routes, and global styles
components/           Reusable editorial and navigation components
content/articles/     Markdown articles
lib/                  Article parsing, categories, SEO, and site configuration
public/images/        Local editorial photography and SVG assets
out/                  Generated static export after a build
```

## Writing an article

Add a Markdown file to `content/articles/`. The filename should match the slug where possible.

```md
---
title: "How to Build a Capsule Wardrobe"
description: "A practical guide to building a versatile capsule wardrobe."
slug: "capsule-wardrobe"
date: "2026-09-08"
category: "Capsule Wardrobe"
tags:
  - capsule wardrobe
  - neutral style
  - wardrobe planning
cover: "/images/articles/capsule-wardrobe.jpg"
coverAlt: "Wardrobe rail with neutral coats, knits, and trousers"
featured: true
draft: false
author: "The Style Edit Editorial Team"
affiliate: false
---

Opening paragraph.
```

Required frontmatter:

- `title`
- `description`
- `slug`
- `date` in `YYYY-MM-DD` format
- `category`, using one of the category names in `lib/categories.js`
- `tags`
- `cover`
- `coverAlt`
- `featured`
- `draft`
- `author`
- `affiliate`

Optional frontmatter:

- `updated` in `YYYY-MM-DD` format

Articles with `draft: true` are excluded from listings, sitemaps, and static routes. Use H2 and H3 headings to generate the article table of contents. Internal links should use root-relative paths with trailing slashes, such as `/blog/casual-outfits/`.

## Image workflow

- Article covers and inline images should be JPG or WebP files with a 2:3 portrait ratio. The current image set uses 1200 x 1800 files.
- The homepage hero uses the same 2:3 portrait source and is cropped by the layout.
- Store images in `public/images/articles/` or `public/images/editorial/`.
- Reference images with root-relative paths beginning with `/images/`.
- Add every new Pexels image to `lib/image-credits.js` with its source photo ID and description.
- Missing article images resolve to `/images/fallback-editorial.svg` and emit a build warning. Check the build output before deploying.

## Site configuration

Edit `lib/site-config.js` to update:

- The public site name and description
- `contactEmail`, which powers the contact page mail link
- The Pinterest profile URL in the footer
- The Pinterest verification code

The contact page deliberately shows a setup notice while `contactEmail` is empty. The footer hides the Pinterest profile link while `profileUrl` is empty, but Pinterest sharing remains available on every article.

## Environment variables

Copy `.env.example` to `.env.local` for local overrides.

```bash
NEXT_PUBLIC_SITE_URL=https://thestyleedit.pages.dev
NEXT_PUBLIC_NEWSLETTER_ENDPOINT=
```

- `NEXT_PUBLIC_SITE_URL` sets canonical URLs, Open Graph URLs, JSON-LD URLs, and sitemap URLs. Use the final production origin with no trailing slash. Set it before the production build.
- `NEXT_PUBLIC_NEWSLETTER_ENDPOINT` is optional. When empty, the newsletter form remains a non-submitting design preview. When set, the form sends a `POST` request with the JSON body `{"email":"reader@example.com"}` and expects a successful 2xx response. The endpoint must allow browser CORS requests. Use a provider that handles consent, storage, and unsubscribe requirements.

## SEO and metadata

The build generates:

- Per-page titles, descriptions, canonical URLs, Open Graph tags, and Twitter cards
- Article, breadcrumb, and organization JSON-LD
- `sitemap.xml`
- `robots.txt`
- `manifest.webmanifest`
- A custom 404 page excluded from indexing

Set `NEXT_PUBLIC_SITE_URL` before building. If the domain changes, update the variable and rebuild so canonical and sitemap URLs are correct.

## Pinterest

Each article includes Pinterest share buttons that open Pinterest's Pin creator in a new tab. They do not post automatically. Add a verification code in `siteConfig.pinterest.verificationCode` to emit the `p:domain_verify` meta tag after verification. Add the profile URL to show the Pinterest link in the footer.

## Deploying to Cloudflare Pages

1. Push the project to a Git repository supported by Cloudflare Pages.
2. Create a Pages project and connect the repository.
3. Use these build settings:
   - Framework preset: `None`
   - Build command: `npm run build`
   - Build output directory: `out`
   - Node version: `20.19.0` or newer
4. Add `NEXT_PUBLIC_SITE_URL` under the production environment variables, using the final site origin.
5. Add `NEXT_PUBLIC_NEWSLETTER_ENDPOINT` only after a newsletter endpoint is ready.
6. Deploy. Cloudflare Pages serves the static files from `out/` and uses `404.html` for unmatched routes.
7. The included `public/_headers` file adds baseline security headers and long-lived caching for hashed assets and images. `public/_redirects` preserves the old autumn-era article and category URLs after the year-round rebrand.

After connecting a custom domain, set `NEXT_PUBLIC_SITE_URL` to that domain and redeploy. The domain change affects canonical links, social images, JSON-LD, and the sitemap, so it must happen before final indexing.

You can also deploy the generated directory directly with Wrangler:

```bash
npm run build
npx wrangler pages deploy out
```

## Pre-launch checklist

- Replace `[SITE OWNER NAME]`, `[EFFECTIVE DATE]`, and `[CONTACT EMAIL]` in the privacy policy.
- Replace `[EFFECTIVE DATE]` in the affiliate disclosure.
- Add a real contact email in `lib/site-config.js`.
- Review the legal pages with a qualified professional.
- Set the final production URL and rebuild.
- Add the Pinterest profile and verification code if available.
- Connect and test the newsletter endpoint, or leave the preview notice in place.
- Add analytics only after updating the privacy policy and consent approach.
- Confirm all images remain licensed and credited.
- Run `npm run lint` and `npm run build`.
- Check `out/sitemap.xml`, `out/robots.txt`, and `out/manifest.webmanifest`.

## Dependency notes

`npm audit --omit=dev` is clean. A full `npm audit` reports moderate build-time advisories in the Tailwind CSS 3 PostCSS toolchain. These packages are development dependencies and are not part of the exported site. Resolving them requires a breaking Tailwind upgrade, so review that change separately rather than running `npm audit fix --force`.
