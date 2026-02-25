import clsx from 'clsx';

interface SectionTextProps {
  children: React.ReactNode;
  className?: string;
}

/**
 * Section description text component.
 * Provides consistent styling for section paragraphs.
 */
export default function SectionText({ children, className }: SectionTextProps) {
  return (
    <p
      className={clsx(
        'mt-4 text-base leading-7 text-slate-700 sm:text-lg sm:leading-8 dark:text-slate-300',
        className
      )}
    >
      {children}
    </p>
  );
}
