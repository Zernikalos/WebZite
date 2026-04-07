/**
 * Side-effect CSS imports (e.g. `import './foo.css'`) need a module declaration when
 * TypeScript checks side-effect imports (e.g. `noUncheckedSideEffectImports` / TS 6+).
 * Next only ships `*.module.css` in `next/types/global.d.ts`.
 */
declare module '*.css';
