# Link check (links:check)

This document describes how the broken-link check works and how to run it.

## What it does

The script checks that every internal link on the statically exported site (`out/`) resolves to a valid page. It does **not** run a build; it assumes `out/` already exists (e.g. after `pnpm build`).

## How it works

**Script:** `scripts/check-links.sh`  
**Command:** `pnpm links:check` (or `pnpm links:check:all` to also check external links).

### Steps

1. **Check `out/` exists**  
   If not, the script exits and tells you to run the static export first.

2. **Start a local static server**  
   - Uses **http-server** to serve the `out/` folder on a port (default `4173`, overridable with `PORT`).
   - Command used by the script: `npx --yes http-server out -p "${PORT}" -c-1`.

3. **Wait for the server**  
   The script polls `http://127.0.0.1:${PORT}/` until it responds (up to ~10 seconds).

4. **Crawl with linkinator**  
   - **Tool:** [linkinator](https://github.com/JustinBeckwith/linkinator)  
   - **URL:** `http://127.0.0.1:${PORT}`  
   - **Options:**
     - `--recurse`: follow links on the same origin.
     - `--timeout 10000`: 10 seconds per request.
     - `--concurrency 50`: crawl aggressively (faster, but can expose transient server/crawler errors on large pages).
     - `--skip <regex>`: by default skip `mailto:`, `tel:`, and any URL that does **not** point to `127.0.0.1:${PORT}` (so only internal links are checked).

5. **Cleanup**  
   On exit (normal or signal), the script kills the static server.

### Summary of defaults

| Thing            | Default | Override              |
|------------------|--------|------------------------|
| Port             | 4173   | `PORT=3000 pnpm links:check` |
| Per-request timeout | 10 s (linkinator) | (fixed in script) |
| Concurrency      | 50      | (fixed in script)     |

## External links

- **Default:** `pnpm links:check` only checks links that point to `http://127.0.0.1:${PORT}`. External URLs are skipped.
- **Include externals:** `pnpm links:check:all` (runs the same script with `--all`), so linkinator also checks external links (slower and can fail on third-party sites).
- Some Dokka-generated source links may point to GitHub and fail if the upstream URL is wrong (for example `tree` used for a file path). Those are real external-link failures, not local route failures.
- **GitHub-only check:** `pnpm links:check:github` checks a sample of `github.com/Zernikalos/Zernikalos` links found under `out/api` without touching Kotlin/Oracle docs.

## Notes

- The API section has many pages (2000+).
- A status like `[0]` in linkinator usually means a request/network error (timeout/connection/socket), not a `404`. If the same URL returns `200` with `curl`, treat it as a crawler/server-load issue.
- If local API URLs intermittently fail with `[0]`, retry and/or temporarily run linkinator with lower concurrency (for debugging only). The project script intentionally keeps a higher concurrency for speed.
