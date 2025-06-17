import React from 'react';
import clsx from 'clsx';
import Logo from './Logo';
import Title from './Title';
import { useMediaQuery } from '../../hooks/useMediaQuery';

interface SiteConfig {
  title: string;
  tagline: string;
}

interface HeaderProps {
  siteConfig: SiteConfig;
  className?: string;
}

export default function LandingHeader({ siteConfig, className }: HeaderProps): JSX.Element {
  const isMobile = useMediaQuery('(max-width: 768px)');
  return (
    <header
      className={clsx(
        'tw:relative tw:overflow-hidden tw:flex tw:items-center',
        isMobile
          ? 'tw:h-[85vh] tw:pt-24' // Taller container on mobile with more top padding
          : 'tw:min-h-3/5 tw:h-3/5 tw:py-16', // Original style for desktop
        className
      )}
    >

            <div className="tw:container tw:mx-auto tw:px-4 tw:relative">
        {isMobile ? (
          <>
            <div className="tw:absolute tw:inset-0 tw:flex tw:items-center tw:justify-center tw:opacity-30">
              <Logo isMobile />
            </div>
            <div className="tw:relative tw:z-10">
              <Title />
            </div>
          </>
        ) : (
          <div className="tw:flex tw:flex-row tw:items-center tw:justify-between">
            <Title />
            <Logo />
          </div>
        )}
      </div>
    </header>
  );
}
