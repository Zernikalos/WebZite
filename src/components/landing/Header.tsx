import React from 'react';
import clsx from 'clsx';
import Logo from './Logo';
import BackgroundBlobs from './BackgroundBlobs';
import Title from './Title';

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
      <BackgroundBlobs />

      <div className="tw:container tw:mx-auto tw:px-4">
        <div className="tw:flex tw:flex-row tw:items-center tw:justify-between">
          <Title />
          <Logo />
        </div>
      </div>
    </header>
  );
}
