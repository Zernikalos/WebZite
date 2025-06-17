import React from 'react';
import SectionTitle from '../SectionTitle';
import SectionText from '../SectionText';
import { FaHeart } from 'react-icons/fa';
import { SiOpensourceinitiative, SiKotlin } from 'react-icons/si'; // Added SiKotlin

export default function PoweredByKotlinSection(): JSX.Element {
  const title = "Powered by Kotlin & Open Source";
  const description = 
    "The Zernikalos engine is proudly built with Kotlin Multiplatform, making it a truly versatile and modern solution. " +
    "As an open-source project, we welcome developers and contributors to explore the code, share ideas, and help shape its future.";

  return (
    <section className="tw:py-24 tw:w-full">
      <div className="container tw:flex tw:flex-col md:tw:flex-row tw:items-center tw:justify-between tw:gap-12">
        {/* Textual content */}
        <div className="tw:w-full md:tw:w-1/2 tw:text-center md:tw:text-left md:tw:pr-8">
          <SectionTitle title={title} />
          <SectionText>
            {description}
          </SectionText>
        </div>

        {/* Visual content */}
        <div className="tw:w-full md:tw:w-1/2 tw:flex tw:justify-center tw:items-center tw:mt-10 md:tw:mt-0">
          <div className="tw:flex tw:flex-row tw:items-center tw:justify-center tw:gap-4 md:tw:gap-6">
            <SiKotlin 
              size={60} // Adjust size as needed, matching OSI icon for consistency
              className="tw:text-purple-700 dark:tw:text-purple-500" // Example Kotlin color, adjust as needed
              title="Kotlin" // Accessibility: title for SVG
            />
            <FaHeart 
              size={30} 
              className="tw:text-pink-500 dark:tw:text-pink-400" // Adjusted heart color for better contrast/theme
            />
            <SiOpensourceinitiative 
              size={60} 
              className="tw:text-green-600 dark:tw:text-green-400" // Adjusted OSI color for better theming
            />
          </div>
        </div>
      </div>
    </section>
  );
}
