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
    'The Zernikalos engine is proudly built with Kotlin Multiplatform, making it a truly versatile and modern solution. ' +
    'As an open-source project, we welcome developers and contributors to explore the code, share ideas, and help shape its future.';

  return (
    <section className="py-24 w-full">
      <div className="container mx-auto px-6 md:px-8 lg:px-12 flex flex-col items-center gap-10">
        {/* Textual content - centered */}
        <div className="w-full max-w-3xl text-center">
          <SectionTitle title={title} />
          <SectionText className="text-center">{description}</SectionText>
        </div>

        {/* Visual content - icons below */}
        <div className="flex flex-row items-center justify-center gap-4 md:gap-6">
          <SiKotlin
            size={60}
            className="text-purple-700 dark:text-purple-500"
            title="Kotlin"
          />
          <FaHeart
            size={30}
            className="text-pink-500 dark:text-pink-400"
          />
          <SiOpensourceinitiative
            size={60}
            className="text-green-600 dark:text-green-400"
          />
        </div>
      </div>
    </section>
  );
}
