import Link from 'next/link';
import Image from 'next/image';
import BackgroundBlobs from '@/components/landing/BackgroundBlobs';

export default function NotFound() {
  return (
    <BackgroundBlobs>
      <main className="min-h-[100dvh] flex items-center justify-center px-6 py-16">
        <div className="w-full max-w-2xl">
          <div className="mb-6 flex items-center justify-center gap-3 text-slate-900 dark:text-white">
            <div className="relative h-10 w-10 overflow-hidden rounded-xl bg-white/70 ring-1 ring-slate-200 backdrop-blur dark:bg-white/5 dark:ring-white/10">
              <Image src="/zklogo.svg" alt="Zernikalos logo" fill sizes="40px" />
            </div>
            <p className="text-sm font-semibold tracking-[0.14em] uppercase text-slate-700 dark:text-white/70">
              Zernikalos
            </p>
          </div>

          <section className="rounded-3xl border border-slate-200 bg-white/70 p-8 text-center shadow-[0_18px_60px_rgba(15,23,42,0.08)] backdrop-blur dark:border-white/10 dark:bg-white/5">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-cyan-700 dark:text-cyan-200/90">
              404
            </p>
            <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl dark:text-white">
              Page not found
            </h1>
            <p className="mx-auto mt-4 max-w-xl text-sm leading-6 text-slate-700 sm:text-base dark:text-slate-200/90">
              The link may be outdated, or the URL may have changed between versions.
            </p>

            <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row sm:flex-wrap">
              <Link
                href="/"
                className="inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-cyan-400 to-sky-500 px-5 py-3 text-sm font-semibold text-slate-950 shadow-[0_12px_30px_rgba(56,189,248,0.25)] transition hover:brightness-110"
              >
                Back to home
              </Link>
            </div>

            <div className="mt-6 text-xs text-slate-500 dark:text-white/55">
              If you think this is a mistake, double-check the URL and try again.
            </div>
          </section>
        </div>
      </main>
    </BackgroundBlobs>
  );
}
