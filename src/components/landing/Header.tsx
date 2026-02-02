import clsx from 'clsx';
import Logo from './Logo';
import Title from './Title';

/**
 * Landing page header with responsive layout.
 * Mobile: stacked layout with logo as background.
 * Desktop: side-by-side layout.
 */
export default function LandingHeader() {
  return (
    <header
      className={clsx(
        'relative overflow-hidden flex items-center',
        'h-[85vh] pt-24',
        'md:min-h-[60vh] md:h-[60vh] md:py-16 md:pt-16'
      )}
    >
      <div className="container mx-auto px-6 md:px-8 lg:px-12 relative">
        {/* Mobile Layout - Logo as background */}
        <div className="md:hidden relative">
          <div className="absolute inset-0 flex items-center justify-center opacity-30 -z-10">
            <Logo variant="background" />
          </div>
          <Title />
        </div>

        {/* Desktop Layout - Side by side */}
        <div className="hidden md:flex flex-row items-center justify-between gap-8">
          <Title />
          <Logo variant="inline" />
        </div>
      </div>
    </header>
  );
}
