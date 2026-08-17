/**
 * Sync demos from DemoApps into WebZite/public/demos (single source of truth).
 *
 * Sources (from sync.config.mjs, overridable):
 * - DemoApps/web/examples -> public/demos/examples
 * - DemoApps/assets/zko   -> public/demos/zko
 * - (optional) zernikalos.js -> public/demos/sdk/zernikalos.js
 *
 * CI (WebZite-only checkout): if DemoApps is not present, sync is skipped and
 * `public/demos` must already be committed. Set DEMOS_SYNC_REQUIRED=1 to fail
 * instead (e.g. monorepo jobs that checkout both repos).
 */

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
 * @param {object} opts.config - sync.config.mjs demos section
 * @param {boolean} [opts.clean]
 * @param {string} [opts.demoAppsRootOverride] - CLI / DEMOAPPS_PATH
 */
export function syncDemos({
  webziteRoot,
  config,
  clean = false,
  demoAppsRootOverride,
}) {
  const demoAppsRoot = resolveFrom(
    webziteRoot,
    demoAppsRootOverride || config.demoAppsRoot,
  );

  const srcExamplesDir = path.resolve(demoAppsRoot, config.examplesSrc);
  const srcZkoDir = path.resolve(demoAppsRoot, config.zkoSrc);
  const srcSdkPath = resolveFrom(webziteRoot, config.sdkSrc);

  const dstRoot = resolveFrom(webziteRoot, config.destRoot);
  const dstExamplesDir = path.resolve(dstRoot, "examples");
  const dstZkoDir = path.resolve(dstRoot, "zko");
  const dstSdkPath = path.resolve(dstRoot, "sdk", "zernikalos.js");

  const examplesOk = isDir(srcExamplesDir);
  const zkoOk = isDir(srcZkoDir);
  const strict = process.env.DEMOS_SYNC_REQUIRED === "1";

  if (!examplesOk || !zkoOk) {
    const msg = !examplesOk
      ? `Missing examples source: ${srcExamplesDir}`
      : `Missing zko source: ${srcZkoDir}`;
    if (strict) {
      console.error(msg);
      process.exitCode = 1;
      return { skipped: true, failed: true };
    }
    console.warn(`[sync:demos] ${msg}`);
    console.warn(
      "[sync:demos] Skipping sync (use committed public/demos). To fail when sources are missing, set DEMOS_SYNC_REQUIRED=1.",
    );
    return { skipped: true, failed: false };
  }

  ensureDir(dstRoot);

  console.log(`Syncing examples: ${srcExamplesDir} -> ${dstExamplesDir}`);
  const ex = syncDir(srcExamplesDir, dstExamplesDir, { clean });
  console.log(
    `  copied: ${ex.copied}${clean ? `, removed: ${ex.removed}` : ""}`,
  );

  console.log(`Syncing zko: ${srcZkoDir} -> ${dstZkoDir}`);
  const z = syncDir(srcZkoDir, dstZkoDir, { clean });
  console.log(`  copied: ${z.copied}${clean ? `, removed: ${z.removed}` : ""}`);

  if (isFile(srcSdkPath)) {
    console.log(`Syncing sdk: ${srcSdkPath} -> ${dstSdkPath}`);
    if (shouldCopy(srcSdkPath, dstSdkPath)) {
      copyFile(srcSdkPath, dstSdkPath);
      console.log(`  copied: 1`);
    } else {
      console.log(`  up-to-date`);
    }
  } else {
    console.log(`SDK not found (skipping): ${srcSdkPath}`);
  }

  console.log("[sync:demos] Done.");
  return { skipped: false, failed: false };
}
