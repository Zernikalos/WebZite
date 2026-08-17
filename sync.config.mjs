/**
 * Default paths for `pnpm sync` (demos + API).
 *
 * Paths are relative to the WebZite root unless absolute.
 * Overridable via env / CLI (see scripts/sync.mjs).
 */
export default {
  demos: {
    demoAppsRoot: "../DemoApps",
    examplesSrc: "web/examples",
    zkoSrc: "assets/zko",
    sdkSrc:
      "../Zernikalos/engine/build/dist/js/productionExecutable/zernikalos.js",
    destRoot: "public/demos",
  },
  api: {
    dokkaHtmlRoot: "../Zernikalos/engine/build/dokka/html",
    destRoot: "api",
    // Only these artifacts are copied into destRoot
    copyEntries: ["-zernikalos", "index.html", "navigation.html"],
  },
};
