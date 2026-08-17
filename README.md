# WebZite

Next.js site for **Zernikalos** documentation and demos, built with [Fumadocs](https://fumadocs.dev) and [Next.js](https://nextjs.org).

## Requirements

- [Node.js](https://nodejs.org/) 24 or later
- [pnpm](https://pnpm.io/) 11.1 or later (`packageManager` is pinned to 11.3.0)

## Setup

```bash
pnpm install
```

## Scripts

| Script | Description |
| ------ | ----------- |
| `pnpm dev` | Starts the Next.js dev server (does **not** sync). |
| `pnpm build` | Runs `next build` (does **not** sync). |
| `pnpm start` | Serves the production build (`next start`). |
| `pnpm sync` | Syncs demos **and** API docs (see below). |
| `pnpm sync demos` / `pnpm sync:demos` | Copies demo assets from DemoApps into `public/demos`. |
| `pnpm sync api` / `pnpm sync:api` | Copies Dokka HTML into `api/`. |
| `pnpm types:check` | MDX codegen, Next typegen, and `tsc --noEmit`. |
| `pnpm lint` | ESLint. |
| `pnpm checklinks` | Internal link checks (see `scripts/check-links.sh`). |
| `pnpm checklinks:api` | Internal + external link checks. |
| `pnpm checklinks:github` | Sample of GitHub source links under `out/api`. |

Sync is **manual only** — run it when upstream demos or Dokka output change. Default paths live in [`sync.config.mjs`](sync.config.mjs).

## Sync (`pnpm sync`)

```bash
pnpm sync                 # demos + api
pnpm sync demos --clean
pnpm sync api --clean
```

### Demos (`/demos`)

Interactive demos live under **`public/demos`** (HTML examples, `.zko` assets, optional SDK bundle). The app serves them as static files and lists them at `/demos`.

If a **DemoApps** checkout sits **next to** this repo (`../DemoApps`), demos sync copies:

- `DemoApps/web/examples/**` → `public/demos/examples/`
- `DemoApps/assets/zko/**` → `public/demos/zko/`
- Optional: `../Zernikalos/.../zernikalos.js` → `public/demos/sdk/zernikalos.js` when that file exists

Pass `--clean` to mirror sources (remove files in the destination that no longer exist upstream).

Override the DemoApps root:

```bash
DEMOAPPS_PATH=/path/to/DemoApps pnpm sync demos --clean
# or
pnpm sync demos --demoapps /path/to/DemoApps --clean
```

### API (`/api`)

API reference pages are **Dokka** HTML under **`api/`**. Sync copies only:

- `-zernikalos/` → `api/-zernikalos/`
- `index.html` → `api/index.html`
- `navigation.html` → `api/navigation.html`

from `../Zernikalos/engine/build/dokka/html` (see `sync.config.mjs`). Dokka static assets (`images`, `styles`, etc.) are **not** copied — WebZite rewrites and serves the HTML itself.

Override the Dokka root:

```bash
DOKKA_HTML_PATH=/path/to/dokka/html pnpm sync api --clean
# or
pnpm sync api --dokka /path/to/dokka/html --clean
```

### CI and WebZite-only checkouts

Jobs that only clone **WebZite** usually do **not** have `../DemoApps` or Dokka build output. In that case sync **skips** missing sources and exits successfully; the build uses whatever is already committed under `public/demos` and `api/`. Keep those trees up to date in git when upstream changes.

To **fail** when sources are missing (e.g. monorepo jobs):

```bash
DEMOS_SYNC_REQUIRED=1 pnpm sync demos
API_SYNC_REQUIRED=1 pnpm sync api
```

## Project layout

| Path | Role |
| ---- | ---- |
| `src/app/(home)` | Landing and related pages. |
| `src/app/docs` | Documentation (Fumadocs MDX). |
| `src/app/demos` | Demos index and per-demo pages (iframe + code tabs). |
| `src/app/api` | Catch-all route that serves Dokka HTML from `api/`. |
| `api/` | Committed Dokka HTML subset (`-zernikalos`, index, navigation). |
| `content/docs` | Hand-written guides (MDX). |
| `sync.config.mjs` | Default paths for demos + API sync. |
| `lib/source.ts` | Fumadocs content source; see [`loader()`](https://fumadocs.dev/docs/headless/source-api). |
| `lib/layout.shared.tsx` | Shared layout options for docs. |
| `source.config.ts` | MDX / frontmatter configuration. |
| `scripts/sync.mjs` | Unified sync CLI. |

## Local development

```bash
pnpm sync   # when demos or API docs need refreshing
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000).

## Learn more

- [Next.js documentation](https://nextjs.org/docs)
- [Fumadocs](https://fumadocs.dev) — MDX, layouts, search
- [Fumadocs MDX intro](https://fumadocs.dev/docs/mdx)
