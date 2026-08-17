#!/usr/bin/env node
/**
 * Unified sync CLI for WebZite.
 *
 * Usage:
 *   node scripts/sync.mjs              # demos + api
 *   node scripts/sync.mjs demos
 *   node scripts/sync.mjs api
 *   node scripts/sync.mjs demos api --clean
 *
 * Flags:
 *   --clean
 *   --demoapps <path>   (or DEMOAPPS_PATH)
 *   --dokka <path>      (or DOKKA_HTML_PATH)
 *
 * Paths defaults live in sync.config.mjs at the WebZite root.
 */

import path from "node:path";
import { loadSyncConfig } from "./lib/load-sync-config.mjs";
import { syncApi } from "./lib/sync-api.mjs";
import { syncDemos } from "./lib/sync-demos.mjs";

const webziteRoot = path.resolve(import.meta.dirname, "..");
const rawArgs = process.argv.slice(2);

function getArgValue(flag) {
  const idx = rawArgs.indexOf(flag);
  if (idx === -1) return undefined;
  return rawArgs[idx + 1];
}

const clean = rawArgs.includes("--clean");
const demoAppsRootOverride =
  getArgValue("--demoapps") || process.env.DEMOAPPS_PATH;
const dokkaHtmlRootOverride =
  getArgValue("--dokka") || process.env.DOKKA_HTML_PATH;

const knownTargets = new Set(["demos", "api"]);
const targets = rawArgs.filter((a) => knownTargets.has(a));
const runTargets = targets.length > 0 ? targets : ["demos", "api"];

const unknown = rawArgs.filter(
  (a) =>
    !knownTargets.has(a) &&
    a !== "--clean" &&
    a !== "--demoapps" &&
    a !== "--dokka" &&
    a !== demoAppsRootOverride &&
    a !== dokkaHtmlRootOverride,
);

if (unknown.length) {
  console.error(`Unknown argument(s): ${unknown.join(", ")}`);
  console.error(
    "Usage: node scripts/sync.mjs [demos] [api] [--clean] [--demoapps <path>] [--dokka <path>]",
  );
  process.exit(1);
}

const config = await loadSyncConfig(webziteRoot);

let failed = false;

if (runTargets.includes("demos")) {
  const result = syncDemos({
    webziteRoot,
    config: config.demos,
    clean,
    demoAppsRootOverride,
  });
  if (result.failed) failed = true;
}

if (runTargets.includes("api")) {
  const result = syncApi({
    webziteRoot,
    config: config.api,
    clean,
    dokkaHtmlRootOverride,
  });
  if (result.failed) failed = true;
}

if (failed) process.exit(1);
