import clsx from 'clsx';

interface SectionTitleProps {
  title: string;
  className?: string;
}

/**
 * Shared section title style for the landing page.
 */
export default function SectionTitle({ title, className }: SectionTitleProps) {
  return (
    <h2
      className={clsx(
        'text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight',
        'text-slate-900 dark:text-white',
        className
      )}
    >
      {title}
    </h2>
  );
}
