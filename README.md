# WebZite

Next.js site for **Zernikalos** documentation and demos, built with [Fumadocs](https://fumadocs.dev) and [Next.js](https://nextjs.org).

## Requirements

- [Node.js](https://nodejs.org/) (LTS recommended)
- [pnpm](https://pnpm.io/)

## Setup

```bash
pnpm install
```

## Scripts

| Script | Description |
| ------ | ----------- |
| `pnpm dev` | Runs `demos:sync --clean`, then starts the Next.js dev server. |
| `pnpm build` | Runs `demos:sync --clean`, then `next build`. |
| `pnpm start` | Serves the production build (`next start`). |
| `pnpm demos:sync` | Copies demo assets from DemoApps into `public/demos` (see below). |
| `pnpm types:check` | MDX codegen, Next typegen, and `tsc --noEmit`. |
| `pnpm lint` | ESLint. |
| `pnpm links:check` | Internal link checks (see `scripts/check-links.sh`). |

## Demos (`/demos`)

Interactive demos live under **`public/demos`** (HTML examples, `.zko` assets, optional SDK bundle). The app serves them as static files and lists them at `/demos`.

### Syncing from DemoApps

If a **DemoApps** checkout sits **next to** this repo (`../DemoApps`), `pnpm demos:sync` copies:

- `DemoApps/web/examples/**` → `public/demos/examples/`
- `DemoApps/assets/zko/**` → `public/demos/zko/`
- Optional: `../Zernikalos/.../zernikalos.js` → `public/demos/sdk/zernikalos.js` when that file exists

Pass `--clean` to mirror sources (remove files in the destination that no longer exist upstream).

Override the DemoApps root:

```bash
DEMOAPPS_PATH=/path/to/DemoApps pnpm demos:sync --clean
# or
node scripts/sync-demos.mjs --demoapps /path/to/DemoApps --clean
```

### CI and WebZite-only checkouts

GitHub Actions (or any job that only clones **WebZite**) usually does **not** have `../DemoApps`. In that case **`demos:sync` skips copying** and exits successfully; the build uses whatever is already committed under `public/demos`. **Keep `public/demos` up to date in git** when you change demos upstream.

To **fail the job** if DemoApps sources are missing (e.g. a monorepo workflow that checks out both repos):

```bash
DEMOS_SYNC_REQUIRED=1 pnpm demos:sync
```

## Project layout

| Path | Role |
| ---- | ---- |
| `src/app/(home)` | Landing and related pages. |
| `src/app/docs` | Documentation (Fumadocs MDX). |
| `src/app/demos` | Demos index and per-demo pages (iframe + code tabs). |
| `src/app/api` | API routes (e.g. search). |
| `lib/source.ts` | Fumadocs content source; see [`loader()`](https://fumadocs.dev/docs/headless/source-api). |
| `lib/layout.shared.tsx` | Shared layout options for docs. |
| `source.config.ts` | MDX / frontmatter configuration. |
| `scripts/sync-demos.mjs` | Demo asset sync (see above). |

## Local development

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000).

## Learn more

- [Next.js documentation](https://nextjs.org/docs)
- [Fumadocs](https://fumadocs.dev) — MDX, layouts, search
- [Fumadocs MDX intro](https://fumadocs.dev/docs/mdx)
