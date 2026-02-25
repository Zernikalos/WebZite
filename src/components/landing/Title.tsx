import clsx from 'clsx';
import Link from 'next/link';

/**
 * Animated gradient title component for the landing page.
 * Displays "Zernikalos - The Kotlin 3D Engine" with animated gradient text.
 */
export default function Title() {
  return (
    <div className="grow text-left pr-4">
      <h1
        className={clsx(
          // Typography & Layout
          'inline-block font-extrabold tracking-tight pr-4',
          // Background Gradient
          'bg-gradient-to-r from-cyan-700 via-blue-700 to-violet-700 dark:from-cyan-400 dark:via-sky-500 dark:to-purple-600',
          // Gradient Text Effect
          'bg-clip-text text-transparent bg-[length:200%_auto]',
          // Animation
          'animate-[gradientShift_10s_ease-in-out_infinite]',
          // Visual Effect
          'drop-shadow-none dark:drop-shadow-[0_0_8px_rgba(99,102,255,0.7)]'
        )}
      >
        <span
          className={clsx(
            'block',
            // Responsive Typography
            'text-5xl sm:text-7xl md:text-7xl lg:text-8xl xl:text-9xl italic'
          )}
        >
          Zernikalos
        </span>
        <span
          className={clsx(
            'mt-1 block text-left md:text-right',
            // Responsive Typography
            'text-xl sm:text-2xl md:text-3xl lg:text-4xl',
            'leading-normal'
          )}
        >
          The Kotlin 3D Engine
        </span>
      </h1>

      <p className="mt-5 max-w-2xl text-base leading-7 text-slate-700 sm:text-lg sm:leading-8 dark:text-slate-200/90">
        Build 3D games in Kotlin and evaluate a multiplatform workflow for{' '}
        <strong className="text-slate-950 dark:text-white">Android</strong>,{' '}
        <strong className="text-slate-950 dark:text-white">iOS</strong>,{' '}
        <strong className="text-slate-950 dark:text-white">JVM</strong>, and{' '}
        <strong className="text-slate-950 dark:text-white">Web</strong> from a single project foundation.
      </p>

      <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
        <Link
          href="/docs/quick-start"
          className="inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-cyan-400 to-sky-500 px-5 py-3 text-sm font-semibold text-slate-950 shadow-[0_12px_30px_rgba(56,189,248,0.25)] transition hover:brightness-110"
        >
          Start Building
        </Link>
        <Link
          href="/docs"
          className="inline-flex items-center justify-center rounded-xl border border-slate-300/70 bg-white/70 px-5 py-3 text-sm font-semibold text-slate-900 backdrop-blur transition hover:border-cyan-500/40 hover:bg-white dark:border-white/15 dark:bg-white/5 dark:text-white dark:hover:border-cyan-200/40 dark:hover:bg-white/10"
        >
          Read Documentation
        </Link>
        <Link
          href="/api"
          className="inline-flex items-center justify-center rounded-xl border border-slate-300/70 bg-white/55 px-5 py-3 text-sm font-medium text-slate-800 transition hover:text-slate-950 dark:border-white/10 dark:bg-transparent dark:text-white/85 dark:hover:text-white"
        >
          Explore API Reference
        </Link>
      </div>

      <div className="mt-7 grid max-w-2xl grid-cols-1 gap-3 sm:grid-cols-3">
        <div className="rounded-xl border border-slate-200 bg-white/70 px-4 py-3 backdrop-blur dark:border-white/10 dark:bg-white/5">
          <p className="text-xs uppercase tracking-[0.16em] text-slate-500 dark:text-white/55">Platforms</p>
          <p className="mt-1 text-sm font-semibold text-slate-900 dark:text-white">Android, iOS, JVM, Web</p>
        </div>
        <div className="rounded-xl border border-slate-200 bg-white/70 px-4 py-3 backdrop-blur dark:border-white/10 dark:bg-white/5">
          <p className="text-xs uppercase tracking-[0.16em] text-slate-500 dark:text-white/55">Language</p>
          <p className="mt-1 text-sm font-semibold text-slate-900 dark:text-white">Kotlin Multiplatform</p>
        </div>
        <div className="rounded-xl border border-slate-200 bg-white/70 px-4 py-3 backdrop-blur dark:border-white/10 dark:bg-white/5">
          <p className="text-xs uppercase tracking-[0.16em] text-slate-500 dark:text-white/55">Focus</p>
          <p className="mt-1 text-sm font-semibold text-slate-900 dark:text-white">3D game engine</p>
        </div>
      </div>
    </div>
  );
}
