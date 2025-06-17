import React from 'react';
import clsx from 'clsx';
import Heading from '@theme/Heading';
import Logo from '../../Logo';
import Title from '../Title';

interface SiteConfig {
  title: string;
  tagline: string;
}

interface HeaderProps {
  siteConfig: SiteConfig;
  className?: string;
}

export default function LandingHeader({ siteConfig, className }: HeaderProps): JSX.Element {
  return (
    <header
      className={clsx(
        'tw:min-h-3/5 tw:h-3/5',
        'tw:relative tw:overflow-hidden tw:py-16', // Base styles
        'tw:flex tw:items-center', // Center content vertically
        'tw:bg-gradient-to-br tw:from-gray-900 tw:via-gray-950 tw:to-black', // Futuristic dark gradient background
        className // Allow custom classes
      )}
    >
      {/* Decorative Animated Blobs */}
      <div
        aria-hidden="true"
        className="tw:pointer-events-none tw:absolute tw:inset-0 tw:overflow-hidden"
      >
        <div
          className="tw:absolute tw:-top-32 tw:-left-32 tw:w-[450px] tw:h-[450px] tw:bg-cyan-500/20 tw:blur-3xl tw:rounded-full tw:animate-[pulse_8s_ease-in-out_infinite]"
        ></div>
        <div
          className="tw:absolute tw:bottom-0 tw:right-0 tw:w-[450px] tw:h-[450px] tw:bg-purple-600/20 tw:blur-3xl tw:rounded-full tw:animate-[pulse_8s_ease-in-out_infinite]"
        ></div>
      </div>

      <div className="tw:container tw:mx-auto tw:px-4">
        <div className="tw:flex tw:flex-row tw:items-center tw:justify-between">
          <Title />
          <Logo />
        </div>
      </div>
    </header>
  );
}
