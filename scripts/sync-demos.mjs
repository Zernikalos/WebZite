#!/usr/bin/env node
/**
 * Thin wrapper kept for direct invocations.
 * Prefer: pnpm sync demos  |  node scripts/sync.mjs demos
 */
import { spawnSync } from "node:child_process";
import path from "node:path";
import { fileURLToPath } from "node:url";

const here = path.dirname(fileURLToPath(import.meta.url));
const syncCli = path.join(here, "sync.mjs");
const result = spawnSync(
  process.execPath,
  [syncCli, "demos", ...process.argv.slice(2)],
  { stdio: "inherit" },
);
process.exit(result.status ?? 1);
