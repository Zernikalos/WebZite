/**
 * Sync Dokka HTML API docs into WebZite/api.
 *
 * Copies only configured entries (default: -zernikalos/, index.html, navigation.html)
 * from Zernikalos engine Dokka output. Does not copy Dokka static assets
 * (images, scripts, styles, ui-kit).
 *
 * CI (WebZite-only checkout): if Dokka output is missing, sync is skipped and
 * `api/` must already be committed. Set API_SYNC_REQUIRED=1 to fail instead.
 */

import fs from "node:fs";
import path from "node:path";
import {
  copyFile,
  ensureDir,
  isDir,
  isFile,
  resolveFrom,
  shouldCopy,
  syncDir,
} from "./fs-utils.mjs";

/**
 * @param {object} opts
 * @param {string} opts.webziteRoot
 * @param {object} opts.config - sync.config.mjs api section
 * @param {boolean} [opts.clean]
 * @param {string} [opts.dokkaHtmlRootOverride] - CLI / DOKKA_HTML_PATH
 */
export function syncApi({
  webziteRoot,
  config,
  clean = false,
  dokkaHtmlRootOverride,
}) {
  const dokkaHtmlRoot = resolveFrom(
    webziteRoot,
    dokkaHtmlRootOverride || config.dokkaHtmlRoot,
  );
  const destRoot = resolveFrom(webziteRoot, config.destRoot);
  const copyEntries = config.copyEntries || [
    "-zernikalos",
    "index.html",
    "navigation.html",
  ];

  const strict = process.env.API_SYNC_REQUIRED === "1";

  if (!isDir(dokkaHtmlRoot)) {
    const msg = `Missing Dokka HTML source: ${dokkaHtmlRoot}`;
    if (strict) {
      console.error(msg);
      process.exitCode = 1;
      return { skipped: true, failed: true };
    }
    console.warn(`[api:sync] ${msg}`);
    console.warn(
      "[api:sync] Skipping sync (use committed api/). To fail when sources are missing, set API_SYNC_REQUIRED=1.",
    );
    return { skipped: true, failed: false };
  }

  ensureDir(destRoot);

  let anyMissing = false;
  for (const entry of copyEntries) {
    const src = path.join(dokkaHtmlRoot, entry);
    const dst = path.join(destRoot, entry);

    if (isDir(src)) {
      console.log(`Syncing ${entry}/: ${src} -> ${dst}`);
      const result = syncDir(src, dst, { clean });
      console.log(
        `  copied: ${result.copied}${clean ? `, removed: ${result.removed}` : ""}`,
      );
      continue;
    }

    if (isFile(src)) {
      console.log(`Syncing ${entry}: ${src} -> ${dst}`);
      if (shouldCopy(src, dst)) {
        copyFile(src, dst);
        console.log(`  copied: 1`);
      } else {
        console.log(`  up-to-date`);
      }
      continue;
    }

    anyMissing = true;
    const msg = `Missing Dokka entry: ${src}`;
    if (strict) {
      console.error(msg);
      process.exitCode = 1;
      return { skipped: false, failed: true };
    }
    console.warn(`[api:sync] ${msg}`);
  }

  if (anyMissing && !strict) {
    console.warn(
      "[api:sync] Some entries were missing; partial sync completed.",
    );
  }

  // With --clean, drop unexpected top-level entries under dest that are not
  // in copyEntries (keeps api/ aligned with the intentional Dokka subset).
  if (clean) {
    const allowed = new Set(copyEntries);
    for (const name of fs.readdirSync(destRoot)) {
      if (!allowed.has(name)) {
        const p = path.join(destRoot, name);
        fs.rmSync(p, { recursive: true, force: true });
        console.log(`  removed unexpected: ${name}`);
      }
    }
  }

  console.log("[api:sync] Done.");
  return { skipped: false, failed: false };
}
