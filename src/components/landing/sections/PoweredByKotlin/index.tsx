'use client';

import SectionTitle from '../SectionTitle';
import SectionText from '../SectionText';
import { FaHeart } from 'react-icons/fa';
import { SiOpensourceinitiative, SiKotlin } from 'react-icons/si';

/**
 * Section highlighting Kotlin and open-source nature of the project.
 * Layout: text on top, icons below (centered).
 */
export default function PoweredByKotlinSection() {
  const title = 'Powered by Kotlin & Open Source';
  const description =
    'Zernikalos is built on Kotlin Multiplatform and developed as an open-source project. ' +
    'That combination makes the engine easier to inspect, extend, and improve with community feedback.';

  return (
    <section className="py-24 w-full">
      <div className="container mx-auto px-6 md:px-8 lg:px-12 flex flex-col items-center gap-10">
        <div className="w-full max-w-5xl rounded-3xl border border-slate-200 bg-white/70 p-6 sm:p-8 backdrop-blur dark:border-white/10 dark:bg-white/5">
          {/* Textual content - centered */}
          <div className="w-full max-w-4xl mx-auto text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-cyan-700 dark:text-cyan-200/90">
              Ecosystem
            </p>
            <SectionTitle
              title={title}
              className="mt-3 text-3xl sm:text-4xl lg:text-5xl xl:text-[3.5rem]"
            />
            <SectionText className="text-center">{description}</SectionText>
          </div>

          {/* Visual content - icons below */}
          <div className="mt-8 flex flex-row items-center justify-center gap-4 md:gap-6 px-2 py-2">
            <SiKotlin
              size={56}
              className="text-purple-600 dark:text-purple-500"
              title="Kotlin"
            />
            <FaHeart
              size={28}
              className="text-pink-500 dark:text-pink-400"
            />
            <SiOpensourceinitiative
              size={56}
              className="text-green-600 dark:text-green-400"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
