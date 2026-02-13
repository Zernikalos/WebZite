import clsx from 'clsx';
import { codeToHtml } from 'shiki';

interface CodeBlockProps {
  className?: string;
  language?: string;
  code?: string;
}

/**
 * Clean code display component with syntax highlighting.
 * Reuseable for both simple code blocks and complex windowed displays.
 */
export default async function CodeBlock({
  className,
  language = 'kotlin',
  code = '',
}: CodeBlockProps) {
  const highlightedCode = await codeToHtml(code, {
    lang: language,
    theme: 'github-dark',
  });

  return (
    <div
      className={clsx(
        'bg-gray-950 px-4 py-4 overflow-x-auto text-sm leading-relaxed rounded-md border border-gray-800 [&_pre]:!bg-transparent [&_code]:!bg-transparent',
        className
      )}
      dangerouslySetInnerHTML={{ __html: highlightedCode }}
    />
  );
}
