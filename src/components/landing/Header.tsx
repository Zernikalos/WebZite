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
        'min-h-[92vh] pt-20',
        'md:min-h-[78vh] md:h-auto md:py-16 md:pt-12'
      )}
    >
      <div className="container mx-auto px-6 md:px-8 lg:px-12 relative">
        {/* Mobile Layout - Logo as background */}
        <div className="md:hidden relative">
          <div className="absolute inset-0 flex items-center justify-center opacity-25 -z-10">
            <Logo variant="background" />
          </div>
          <Title />
        </div>

        {/* Desktop Layout - Side by side */}
        <div className="hidden md:flex flex-row items-center justify-between gap-8 lg:gap-12">
          <Title />
          <Logo
            variant="inline"
            className="opacity-95 drop-shadow-[0_12px_24px_rgba(15,23,42,0.08)] dark:drop-shadow-[0_0_32px_rgba(34,211,238,0.18)]"
          />
        </div>
      </div>
    </header>
  );
}
