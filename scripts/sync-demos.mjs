#!/usr/bin/env node
/**
 * Sync demos from DemoApps into WebZite/public/demos (single source of truth).
 *
 * Sources:
 * - ../DemoApps/webdemo/examples/**    -> public/demos/examples/**
 * - ../DemoApps/assets/zko/**          -> public/demos/zko/**
 * - (optional) ../Zernikalos/.../zernikalos.js -> public/demos/sdk/zernikalos.js
 *
 * Usage:
 * - node scripts/sync-demos.mjs
 * - node scripts/sync-demos.mjs --clean
 *
 * CI (WebZite-only checkout): if DemoApps is not present, sync is skipped and
 * `public/demos` must already be committed. Set DEMOS_SYNC_REQUIRED=1 to fail
 * instead (e.g. monorepo jobs that checkout both repos).
 */

import fs from "node:fs";
import path from "node:path";

const rawArgs = process.argv.slice(2);
const args = new Set(rawArgs);
const clean = args.has("--clean");

function getArgValue(flag) {
  const idx = rawArgs.indexOf(flag);
  if (idx === -1) return undefined;
  return rawArgs[idx + 1];
}

const webziteRoot = path.resolve(import.meta.dirname, "..");
const repoRoot = path.resolve(webziteRoot, "..");

// Allow overriding where DemoApps lives (useful for local setups / CI).
// Examples:
// - DEMOAPPS_PATH=/abs/path/to/DemoApps pnpm demos:sync
// - node scripts/sync-demos.mjs --demoapps /abs/path/to/DemoApps
const demoAppsRoot =
  getArgValue("--demoapps") ||
  process.env.DEMOAPPS_PATH ||
  path.resolve(repoRoot, "DemoApps");

const srcExamplesDir = path.resolve(demoAppsRoot, "webdemo", "examples");
const srcZkoDir = path.resolve(demoAppsRoot, "assets", "zko");
const srcSdkPath = path.resolve(
  repoRoot,
  "Zernikalos",
  "engine",
  "build",
  "dist",
  "js",
  "productionExecutable",
  "zernikalos.js",
);

const dstRoot = path.resolve(webziteRoot, "public", "demos");
const dstExamplesDir = path.resolve(dstRoot, "examples");
const dstZkoDir = path.resolve(dstRoot, "zko");
const dstSdkPath = path.resolve(dstRoot, "sdk", "zernikalos.js");

function ensureDir(p) {
  fs.mkdirSync(p, { recursive: true });
}

function isDir(p) {
  try {
    return fs.statSync(p).isDirectory();
  } catch {
    return false;
  }
}

function isFile(p) {
  try {
    return fs.statSync(p).isFile();
  } catch {
    return false;
  }
}

function listFilesRecursive(dirAbs) {
  const out = [];
  const stack = [dirAbs];
  while (stack.length) {
    const cur = stack.pop();
    const entries = fs.readdirSync(cur, { withFileTypes: true });
    for (const e of entries) {
      const p = path.join(cur, e.name);
      if (e.isDirectory()) stack.push(p);
      else if (e.isFile()) out.push(p);
    }
  }
  return out;
}

function shouldCopy(src, dst) {
  if (!isFile(dst)) return true;
  const s = fs.statSync(src);
  const d = fs.statSync(dst);
  return s.mtimeMs > d.mtimeMs || s.size !== d.size;
}

function copyFile(src, dst) {
  ensureDir(path.dirname(dst));
  fs.copyFileSync(src, dst);
}

function syncDir(srcDir, dstDir) {
  ensureDir(dstDir);
  const srcFiles = listFilesRecursive(srcDir);
  const srcRelSet = new Set();
  let copied = 0;
  for (const srcAbs of srcFiles) {
    const rel = path.relative(srcDir, srcAbs);
    srcRelSet.add(rel);
    const dstAbs = path.join(dstDir, rel);
    if (shouldCopy(srcAbs, dstAbs)) {
      copyFile(srcAbs, dstAbs);
      copied += 1;
    }
  }

  let removed = 0;
  if (clean) {
    const dstFiles = listFilesRecursive(dstDir);
    for (const dstAbs of dstFiles) {
      const rel = path.relative(dstDir, dstAbs);
      if (!srcRelSet.has(rel)) {
        fs.rmSync(dstAbs);
        removed += 1;
      }
    }
  }
  return { copied, removed };
}

function main() {
  const examplesOk = isDir(srcExamplesDir);
  const zkoOk = isDir(srcZkoDir);
  const strict = process.env.DEMOS_SYNC_REQUIRED === "1";

  if (!examplesOk || !zkoOk) {
    const msg = !examplesOk
      ? `Missing examples source: ${srcExamplesDir}`
      : `Missing zko source: ${srcZkoDir}`;
    if (strict) {
      console.error(msg);
      process.exit(1);
    }
    console.warn(`[demos:sync] ${msg}`);
    console.warn(
      "[demos:sync] Skipping sync (use committed public/demos). To fail when sources are missing, set DEMOS_SYNC_REQUIRED=1.",
    );
    process.exit(0);
  }

  ensureDir(dstRoot);

  console.log(`Syncing examples: ${srcExamplesDir} -> ${dstExamplesDir}`);
  const ex = syncDir(srcExamplesDir, dstExamplesDir);
  console.log(`  copied: ${ex.copied}${clean ? `, removed: ${ex.removed}` : ""}`);

  console.log(`Syncing zko: ${srcZkoDir} -> ${dstZkoDir}`);
  const z = syncDir(srcZkoDir, dstZkoDir);
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

  console.log("Done.");
}

main();

