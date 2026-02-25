'use client';

import PlatformSolarSystem from './PlatformSolarSystem';
import SectionTitle from '../SectionTitle';
import SectionText from '../SectionText';

/**
 * Multiplatform section showcasing cross-platform capabilities.
 * Features an animated solar system visualization of supported platforms.
 */
export default function MultiplatformSection() {
  return (
    <section className="py-24 w-full">
      <div className="container mx-auto px-6 md:px-8 lg:px-12 flex flex-col md:flex-row justify-between items-center gap-8 lg:gap-10">
        {/* Icon composition */}
        <div className="order-2 md:order-1 w-full md:w-1/2 min-h-[320px] flex items-center justify-center overflow-visible">
          <div className="flex justify-center scale-[0.62] sm:scale-[0.7] md:scale-[0.66] lg:scale-[0.78]">
            <PlatformSolarSystem />
          </div>
        </div>

        {/* Textual content */}
        <div className="order-1 md:order-2 w-full md:w-1/2 rounded-3xl border border-slate-200 bg-white/70 p-6 sm:p-8 backdrop-blur dark:border-white/10 dark:bg-white/5">
          <p className="text-sm font-semibold uppercase tracking-[0.22em] text-cyan-700 dark:text-cyan-200/90">
            Platforms
          </p>
          <SectionTitle title="Truly Multiplatform" />
          <SectionText>
            Keep core game logic, scene behavior, and rendering flow in one Kotlin codebase. With{' '}
            <span className="font-semibold">Kotlin Multiplatform</span>, Zernikalos helps you
            target{' '}
            <span className="font-semibold">Android</span>,{' '}
            <span className="font-semibold">iOS</span>, and{' '}
            <span className="font-semibold">Web</span> while preserving platform-specific
            integration where needed.
          </SectionText>
        </div>
      </div>
    </section>
  );
}
