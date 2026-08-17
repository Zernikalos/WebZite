import path from "node:path";
import { pathToFileURL } from "node:url";

/**
 * Load sync.config.mjs from the WebZite root.
 * @param {string} webziteRoot
 */
export async function loadSyncConfig(webziteRoot) {
  const configPath = path.join(webziteRoot, "sync.config.mjs");
  const mod = await import(pathToFileURL(configPath).href);
  return mod.default;
}
