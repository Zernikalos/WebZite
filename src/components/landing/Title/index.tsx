import React from 'react';
import clsx from 'clsx';
import Heading from '@theme/Heading';

export default function Title(): JSX.Element {

  return (
    <div className="tw:flex-grow tw:text-left tw:pr-4">
      <Heading
        as="h1"
        className={clsx(
          'tw:text-7xl tw:font-extrabold tw:tracking-tight lg:tw:text-8xl tw:italic',
          'tw:bg-gradient-to-r tw:from-cyan-400 tw:via-sky-500 tw:to-purple-600',
          'tw:bg-[length:200%_auto] tw:bg-clip-text tw:text-transparent',
          'tw:animate-[gradientShift_10s_ease-in-out_infinite]',
          'tw:drop-shadow-[0_0_8px_rgba(99,102,255,0.7)]'
        )}
      >
        <span className="tw:block tw:text-8xl lg:tw:text-9xl">Zernikalos</span>
        <span className="tw:block tw:text-5xl tw:pl-20 md:tw:pl-24 lg:tw:pl-28">The Kotlin 3D Engine</span>
      </Heading>
    </div>
  );
}
