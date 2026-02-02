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
    <p className={clsx('mt-6 text-lg text-gray-300', className)}>
      {children}
    </p>
  );
}
