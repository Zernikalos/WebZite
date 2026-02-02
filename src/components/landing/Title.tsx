import clsx from 'clsx';

/**
 * Animated gradient title component for the landing page.
 * Displays "Zernikalos - The Kotlin 3D Engine" with animated gradient text.
 */
export default function Title() {
  return (
    <div className="grow text-left pr-4">
      <h1
        className={clsx(
          // Typography & Layout
          'inline-block font-extrabold tracking-tight pr-4',
          // Background Gradient
          'bg-gradient-to-r from-cyan-400 via-sky-500 to-purple-600',
          // Gradient Text Effect
          'bg-clip-text text-transparent bg-[length:200%_auto]',
          // Animation
          'animate-[gradientShift_10s_ease-in-out_infinite]',
          // Visual Effect
          'drop-shadow-[0_0_8px_rgba(99,102,255,0.7)]'
        )}
      >
        <span
          className={clsx(
            'block',
            // Responsive Typography
            'text-6xl sm:text-7xl md:text-8xl lg:text-9xl italic'
          )}
        >
          Zernikalos
        </span>
        <span
          className={clsx(
            'block text-right whitespace-nowrap',
            // Responsive Typography
            'text-2xl sm:text-3xl md:text-4xl lg:text-5xl',
            'leading-normal'
          )}
        >
          The Kotlin 3D Engine
        </span>
      </h1>
    </div>
  );
}
