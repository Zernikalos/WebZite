import type { Metadata } from 'next';
import Link from 'next/link';
import BackgroundBlobs from '@/components/landing/BackgroundBlobs';
import LandingHeader from '@/components/landing/Header';
import MultiplatformSection from '@/components/landing/sections/Multiplatform';
import BlazingFastSection from '@/components/landing/sections/BlazingFast';
import SimpleSampleSection from '@/components/landing/SimpleSampleSection';
import PoweredByKotlinSection from '@/components/landing/sections/PoweredByKotlin';

const overviewCards = [
  {
    title: 'What It Is',
    description:
      'A Kotlin-first 3D game engine oriented to multiplatform game development and real-time rendering.',
  },
  {
    title: 'Why It Matters',
    description:
      'A Kotlin-first approach to building and iterating on 3D games across multiple platforms.',
  },
  {
    title: 'Best Next Step',
    description:
      'Start in Quick Start, validate capabilities with the live demo and code snippet, then dive into the API.',
  },
];

const useCases = [
  'Indie 3D game prototypes',
  'Gameplay and mechanics iteration',
  'Cross-platform game experiments',
  'Real-time rendering R&D for games',
];

export const metadata: Metadata = {
  title: 'Kotlin 3D Engine for Multiplatform Apps',
  description:
    'Zernikalos is a Kotlin Multiplatform 3D engine for Android, iOS, JVM, and Web. Explore docs, API reference, and interactive samples.',
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Zernikalos | Kotlin Multiplatform 3D Engine',
    description:
      'Build 3D applications in Kotlin for Android, iOS, JVM, and Web with one codebase.',
    url: 'https://zernikalos.dev',
  },
};

export default function HomePage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'Zernikalos',
    applicationCategory: 'DeveloperApplication',
    operatingSystem: 'Android, iOS, JVM, Web',
    programmingLanguage: 'Kotlin',
    description:
      'Kotlin Multiplatform 3D engine for building graphics apps and interactive experiences.',
    url: 'https://zernikalos.dev',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
  };

  return (
    <BackgroundBlobs>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-white focus:px-3 focus:py-2 focus:text-black"
      >
        Skip to content
      </a>

      <div className="border-b border-amber-400/30 bg-amber-100/80 py-2 text-center text-sm text-amber-900 dark:border-amber-300/30 dark:bg-amber-400/10 dark:text-amber-100">
        <span className="font-medium">Early-stage project:</span> best for prototyping and
        experimentation.
        <Link href="/docs/quick-start" className="ml-2 underline decoration-amber-500/50 underline-offset-4 hover:text-amber-950 dark:decoration-amber-200/60 dark:hover:text-white">
          Start with the quick-start guide
        </Link>
      </div>

      <LandingHeader />

      <main id="main-content" className="pb-20">
        <section aria-labelledby="why-zernikalos" className="pb-8">
          <div className="container mx-auto px-6 md:px-8 lg:px-12">
            <div className="mx-auto max-w-3xl text-center">
              <p className="text-sm font-semibold uppercase tracking-[0.22em] text-cyan-700 dark:text-cyan-200/90">
                Overview
              </p>
              <h2
                id="why-zernikalos"
                className="mt-4 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl lg:text-5xl dark:text-white"
              >
                A clearer path to evaluate Zernikalos
              </h2>
              <p className="mt-5 text-base leading-7 text-slate-700 sm:text-lg dark:text-slate-300">
                Zernikalos is a Kotlin 3D game engine focused on multiplatform development. This
                page keeps the essentials for evaluating it: platform reach, developer workflow, a
                runnable sample, and the open-source ecosystem behind it.
              </p>
            </div>

            <div className="mt-10 grid gap-4 md:grid-cols-3">
              {overviewCards.map((feature) => (
                <article
                  key={feature.title}
                  className="group rounded-2xl border border-slate-200 bg-white/70 p-5 backdrop-blur transition hover:border-cyan-400/40 hover:bg-white dark:border-white/10 dark:bg-white/5 dark:hover:border-cyan-300/30 dark:hover:bg-white/7"
                >
                  <div className="mb-3 inline-flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-cyan-400/20 to-sky-500/20 ring-1 ring-cyan-300/20">
                    <span className="h-2 w-2 rounded-full bg-cyan-300 shadow-[0_0_10px_rgba(103,232,249,0.8)]" />
                  </div>
                  <h3 className="text-lg font-semibold text-slate-900 dark:text-white">{feature.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-slate-700 dark:text-slate-300">{feature.description}</p>
                </article>
              ))}
            </div>
            <div className="mt-6 rounded-2xl border border-slate-200 bg-white/60 px-4 py-4 sm:px-5 dark:border-white/10 dark:bg-white/4">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-600 dark:text-white/60">
                Good fit for
              </p>
              <ul className="mt-3 flex flex-wrap gap-2">
                {useCases.map((item) => (
                  <li
                    key={item}
                    className="rounded-full border border-slate-200 bg-white/80 px-3 py-1.5 text-sm text-slate-800 dark:border-white/10 dark:bg-black/20 dark:text-slate-100"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <MultiplatformSection />
        <BlazingFastSection />
        <SimpleSampleSection />
        <PoweredByKotlinSection />

        <section aria-labelledby="start-now" className="py-24 w-full">
          <div className="container mx-auto px-6 md:px-8 lg:px-12">
            <div className="mx-auto max-w-5xl rounded-3xl border border-cyan-300/30 bg-gradient-to-r from-cyan-100/80 via-sky-100/70 to-indigo-100/70 p-6 text-center sm:p-8 dark:border-cyan-300/20 dark:from-cyan-400/10 dark:via-sky-500/8 dark:to-indigo-500/10">
              <p className="text-sm font-semibold uppercase tracking-[0.22em] text-cyan-700 dark:text-cyan-200/90">
                Start Here
              </p>
              <h2
                id="start-now"
                className="mt-4 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl dark:text-white"
              >
                Evaluate the engine in a few minutes
              </h2>
              <p className="mx-auto mt-4 max-w-3xl text-sm leading-6 text-slate-700 sm:text-base dark:text-slate-200">
                Read the quick-start guide, inspect the code sample, and test the live demo to see
                how Zernikalos fits your Kotlin multiplatform workflow.
              </p>
              <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
                <Link
                  href="/docs/quick-start"
                  className="inline-flex items-center justify-center rounded-xl bg-white px-5 py-3 text-sm font-semibold text-slate-950 hover:bg-cyan-50"
                >
                  Quick Start
                </Link>
                <Link
                  href="/docs"
                  className="inline-flex items-center justify-center rounded-xl border border-slate-300 bg-white/70 px-5 py-3 text-sm font-semibold text-slate-900 dark:border-white/20 dark:bg-transparent dark:text-white"
                >
                  Documentation
                </Link>
                <Link
                  href="/api"
                  className="inline-flex items-center justify-center rounded-xl border border-slate-300 bg-white/70 px-5 py-3 text-sm font-semibold text-slate-900 dark:border-white/20 dark:bg-transparent dark:text-white"
                >
                  API Reference
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
    </BackgroundBlobs>
  );
}
