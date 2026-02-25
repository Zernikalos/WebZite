import clsx from 'clsx';
import Image from 'next/image';

interface LogoProps {
  className?: string;
  variant?: 'background' | 'inline';
}

/**
 * Zernikalos logo component with responsive sizing.
 * - background: Large semi-transparent logo for mobile background
 * - inline: Smaller logo for desktop side-by-side layout (responsive sizes)
 */
export default function Logo({ className, variant = 'inline' }: LogoProps) {
  const isBackground = variant === 'background';

  return (
    <div
      className={clsx(
        'relative shrink-0',
        // Make the SVG logo read better on light backgrounds (it is rendered as an <img>)
        '[&_img]:brightness-[0.78] [&_img]:contrast-125 [&_img]:saturate-90 dark:[&_img]:brightness-100 dark:[&_img]:contrast-100 dark:[&_img]:saturate-100',
        isBackground && 'w-96 h-96 sm:w-[28rem] sm:h-[28rem]',
        !isBackground && 'w-[420px] h-[420px] lg:w-[520px] lg:h-[520px] xl:w-[600px] xl:h-[600px]',
        className
      )}
      style={{
        transform: isBackground
          ? 'scaleX(-1) rotate(10deg) translateX(-10%)'
          : 'scaleX(-1) scale(1.2) rotate(10deg) translateX(-10%)',
        transformOrigin: 'center',
      }}
    >
      <Image
        src="/zklogo.svg"
        alt="Zernikalos Logo"
        fill
        priority
        sizes={isBackground ? '(max-width: 768px) 24rem, 28rem' : '600px'}
        style={{ objectFit: 'contain' }}
        className="dark:opacity-100 opacity-95"
      />
    </div>
  );
}
