# API link generation

This document describes how the API reference section generates URLs and rewrites links so they work with the Next.js static export (trailing slashes, no `.html`).

## Overview

- The API docs are **Dokka** HTML files under the `api/` folder (e.g. `api/-zernikalos/zernikalos.action/-z-bone-track/bone-id.html`).
- Next.js serves them via a catch-all route `app/api/[[...slug]]/page.tsx`, so a URL like `/api/-zernikalos/zernikalos.action/-z-bone-track/bone-id/` is handled by that page.
- At build time we need to know every such path (**static params**), and when rendering we **rewrite** Dokka’s relative links (e.g. `bone-id.html`) into absolute paths with trailing slash (e.g. `/api/.../bone-id/`).

The logic lives in `src/app/api/apiTools.ts` and `src/app/api/[[...slug]]/page.tsx`.

---

## 1. Discovering pages: `getApiStaticParams()`

**Purpose:** Tell Next.js which `/api/...` paths exist so it can pre-render them (required for `output: 'export'`).

**Location:** `apiTools.ts` → `getApiStaticParams()`.

**How it works:**

1. **Scan** the `api/` directory recursively for every `.html` file.
2. For each file, build a **slug** (array of path segments):
   - `api/-zernikalos/zernikalos.action/-z-bone-track/bone-id.html`  
     → slug `['-zernikalos', 'zernikalos.action', '-z-bone-track', 'bone-id']`
   - `api/-zernikalos/zernikalos.action/-z-bone-track/index.html`  
     → slug `['-zernikalos', 'zernikalos.action', '-z-bone-track']`
3. **Decoded and encoded variants:** The HTML we render may contain URL-encoded segments (e.g. `%2Dzernikalos`). Next.js might request either form, so we add both:
   - One entry with the slug as-is (decoded).
   - One entry with each segment `encodeURIComponent`’d if that differs from the decoded key.

**Result:** A list of `{ slug: string[] }` that `generateStaticParams()` in the API page returns to Next.js.

---

## 2. Loading content: `getApiFileContent(slug)`

**Purpose:** Read the Dokka HTML for a given slug at build/render time.

**Location:** `apiTools.ts` → `getApiFileContent(slug)`.

**How it works:**

1. Build a path from the slug: `slug.join('/')` (e.g. `-zernikalos/zernikalos.action/-z-bone-track/bone-id`).
2. Try in order:
   - `api/<path>/index.html` (directory index) → returns `{ content, isIndex: true }`.
   - `api/<path>.html` (single file) → returns `{ content, isIndex: false }`.
3. If neither exists, return `null` (page will 404).

`isIndex` is used later so we resolve relative links from the correct base path (directory vs file).

---

## 3. Rewriting links in HTML: `processDokkaHtml(html, currentSlug, isIndex)`

**Purpose:** Turn Dokka’s relative links (e.g. `bone-id.html`, `../index.html`) into absolute URLs that match our routing: `/api/.../segment/` (trailing slash, no `.html`).

**Location:** `apiTools.ts` → `processDokkaHtml()`.

**How it works:**

1. **Base path** from current page:
   - If the current page is an index page (`isIndex === true`), base = `/api` + full `currentSlug`.
   - Otherwise base = `/api` + `currentSlug` without the last segment (the “directory” of the current file).
2. For GitHub absolute links (`https://github.com/...`):
   - For `Zernikalos/Zernikalos` links, we can optionally pin the ref (branch/tag/commit) using `ZERNIKALOS_GITHUB_SOURCES_REF` so source links don’t drift when `main` changes.
   - If Dokka emitted a file URL with `/tree/` (for example a Kotlin source file like `.../tree/main/.../Foo.kt`), rewrite it to `/blob/` because GitHub returns `404` for file pages under `tree`.
   - Directory links are left unchanged.
3. For every `<a href="...">` that is not external (`http`, `//`, `#`, `mailto:`):
   - Split off the hash: `urlPath` + `hash`.
   - Build absolute path: `path.posix.join(currentBasePath, urlPath)`.
   - Normalize:
     - Remove `.html` or `/index.html` at the end: `.replace(/(\/index)?\.html$/, '')`.
     - Remove trailing slashes then add a single one: `.replace(/\/+$/, '') + '/'`.
   - Encode each path segment consistently: `encodeURIComponent(decodeURIComponent(p))` so the result matches the sidebar and Next.js routes.
   - Set `href` to that path (+ hash if present).

So a link like `bone-id.html` on the page `/api/.../ -z-bone-track/` becomes `/api/.../-z-bone-track/bone-id/`.

---

## 4. Sidebar navigation: `getApiNavigationTree()`

**Purpose:** Build the Fumadocs sidebar tree for the API section from Dokka’s `api/navigation.html`.

**Location:** `apiTools.ts` → `getApiNavigationTree()`.

**How it works:**

1. Read `api/navigation.html` and parse it with Cheerio.
2. Walk the DOM: each `.toc--part` is a node; `.toc--row a.toc--link` gives the link and label.
3. For each link:
   - Take `href` (e.g. `-zernikalos/zernikalos.action/-z-bone-track/bone-id.html`).
   - Strip `index.html` or `.html`: so the path has no extension.
   - Build the URL: `/api` + path segments, each segment encoded, with a trailing slash.
4. Recursively build children from nested `.toc--part` elements.
5. If the root has a single “Zernikalos” folder, flatten so packages/classes are top-level in the sidebar.
6. Folders are rendered with `defaultOpen: false` to avoid embedding a fully expanded API tree in every page, which can make exported pages much larger and cause noisy link-check failures under crawler load.

Result: a tree of folders and pages with `url` values that match the same scheme as the rewritten content links.

---

## 5. The API page route: `app/api/[[...slug]]/page.tsx`

**Flow:**

1. **generateStaticParams()** returns the result of `getApiStaticParams()` so every API URL is pre-rendered at build time.
2. For a request, **params.slug** is the array of path segments (possibly URL-encoded). The page decodes each segment with `decodeURIComponent` for filesystem lookups.
3. **Special case:** `/api/-zernikalos` (single segment `-zernikalos`) is mapped to the root index: `getApiFileContent([])` and `processingSlug = []`.
4. **Load content:** `getApiFileContent(slug)`; if `null`, call `notFound()`.
5. **Rewrite links:** `processDokkaHtml(htmlData.content, processingSlug, htmlData.isIndex)` and render the result inside the docs layout.

So the **generation of API links** is: static params from the file tree, content from Dokka HTML, and link rewriting so every href is an absolute, trailing-slash URL that matches the same route and encoding used by the sidebar and Next.js.
