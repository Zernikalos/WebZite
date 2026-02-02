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
      <div className="container mx-auto px-6 md:px-8 lg:px-12 flex flex-col md:flex-row justify-between items-center gap-12">
        {/* Icon composition */}
        <div className="order-2 md:order-1 w-full md:w-1/2 flex justify-center scale-75 md:scale-90 lg:scale-100">
          <PlatformSolarSystem />
        </div>

        {/* Textual content */}
        <div className="order-1 md:order-2 w-full md:w-1/2">
          <SectionTitle title="Truly Multiplatform" />
          <SectionText>
            Write your game or 3D application once and run it everywhere. Thanks to{' '}
            <span className="font-semibold">Kotlin Multiplatform</span>, the Zernikalos engine
            shares a single codebase that delivers native performance on{' '}
            <span className="font-semibold">Android</span>,{' '}
            <span className="font-semibold">iOS</span>, and{' '}
            <span className="font-semibold">Web</span>.
          </SectionText>
        </div>
      </div>
    </section>
  );
}
