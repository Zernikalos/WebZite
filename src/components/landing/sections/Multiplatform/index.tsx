import React from 'react';
import clsx from 'clsx';
import PlatformSolarSystem from './PlatformSolarSystem';
import SectionTitle from '../SectionTitle';
import SectionText from '../SectionText';

export default function MultiplatformSection(): JSX.Element {
  return (
    <section className="tw:py-24 tw:w-full">
      <div className="container tw:flex tw:flex-row tw:justify-between tw:items-center tw:gap-12">
        {/* Icon composition */}
        <div className="tw:w-full md:tw:w-1/2 tw:flex tw:justify-center md:tw:justify-start tw:scale-75 md:tw:scale-90 lg:tw:scale-100">
          <PlatformSolarSystem />
        </div>

        {/* Textual content */}
        <div className="tw:w-full md:tw:w-1/2">
          <SectionTitle title="Truly Multiplatform" />
          <SectionText>
            Write your game or 3D application once and run it everywhere. Thanks to&nbsp;
            <span className="tw:font-semibold">Kotlin Multiplatform</span>, the Zernikalos engine
            shares a single codebase that delivers native performance on <span className="tw:font-semibold">Android</span>, <span className="tw:font-semibold">iOS</span>, and <span className="tw:font-semibold">Web</span>.
          </SectionText>
        </div>
      </div>
    </section>
  );
}
