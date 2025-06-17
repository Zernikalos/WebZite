import React from 'react';
import clsx from 'clsx';
import Heading from '@theme/Heading';

export default function Title(): JSX.Element {

  return (
    <div className={
          // Layout: Grow to fill space, align text left, add right padding
          "tw:flex-grow tw:text-left tw:pr-4"
        }>
      <Heading
        as="h1"
        className={clsx(
          // Typography & Layout: Extra-bold, italic, tight tracking, inline-block, right padding
          'tw:inline-block tw:font-extrabold tw:tracking-tight tw:pr-4',
          // Background Gradient: Defines the gradient colors
          'tw:bg-gradient-to-r tw:from-cyan-400 tw:via-sky-500 tw:to-purple-600',
          // Gradient Text Effect: Clips background to text, makes text transparent
          'tw:bg-clip-text tw:text-transparent tw:bg-[length:200%_auto]',
          // Animation: Applies a gradient shifting animation
          'tw:animate-[gradientShift_10s_ease-in-out_infinite]',
          // Visual Effect: Adds a drop shadow
          'tw:drop-shadow-[0_0_8px_rgba(99,102,255,0.7)]'
        )}
      >
        <span className={clsx(
            // Layout: Display as block
            'tw:block',
            // Responsive Typography: Font size scales with screen size
            'tw:text-6xl tw:sm:text-7xl tw:md:text-8xl tw:lg:text-9xl tw:italic'
          )}>Zernikalos</span>
        <span className={clsx(
            // Layout & Text Behavior: Block display, right-aligned text, no wrapping
            'tw:block tw:text-right tw:whitespace-nowrap',
            // Responsive Typography: Font size scales with screen size
            'tw:text-2xl tw:sm:text-3xl tw:md:text-4xl tw:lg:text-5xl',
            // Typography: Normal line height
            'tw:leading-normal'
          )}>The Kotlin 3D Engine</span>
      </Heading>
    </div>
  );
}
