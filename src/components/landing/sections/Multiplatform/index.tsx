import React from 'react';
import clsx from 'clsx';
import PlatformSolarSystem from './PlatformSolarSystem';

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
          <h2
            className={clsx(
              'tw:text-5xl lg:tw:text-6xl tw:font-extrabold tw:tracking-tight',
              'tw:bg-gradient-to-r tw:from-cyan-400 tw:via-sky-500 tw:to-purple-600',
              'tw:bg-clip-text tw:text-transparent',
              'tw:animate-[gradientShift_10s_ease-in-out_infinite]'
            )}
          >
            Truly Multiplatform
          </h2>
          <p className="tw:mt-6 tw:text-lg tw:text-gray-300">
            Write your game or 3D application once and run it everywhere. Thanks to&nbsp;
            <span className="tw:font-semibold">Kotlin Multiplatform</span>, the Zernikalos engine
            shares a single codebase that delivers native performance on <span className="tw:font-semibold">Android</span>, <span className="tw:font-semibold">iOS</span>, and <span className="tw:font-semibold">Web</span>.
          </p>
        </div>
      </div>
    </section>
  );
}
