import clsx from 'clsx';

interface SectionTitleProps {
  title: string;
}

/**
 * Animated gradient section title component.
 * Used for major section headings on the landing page.
 */
export default function SectionTitle({ title }: SectionTitleProps) {
  return (
    <h2
      className={clsx(
        'text-5xl lg:text-6xl font-extrabold tracking-tight leading-normal',
        'bg-gradient-to-r from-cyan-400 via-sky-500 to-purple-600',
        'bg-clip-text text-transparent',
        'animate-[gradientShift_10s_ease-in-out_infinite]',
        'drop-shadow-[0_0_8px_rgba(99,102,255,0.7)]'
      )}
    >
      {title}
    </h2>
  );
}
