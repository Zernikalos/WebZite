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
    themes: {
      light: 'github-light',
      dark: 'github-dark',
    },
    defaultColor: false,
  });

  return (
    <div
      className={clsx(
        'overflow-x-auto rounded-md border border-slate-200 bg-white px-4 py-4 text-sm leading-relaxed text-slate-900 dark:border-gray-800 dark:bg-gray-950 dark:text-slate-100 [&_pre]:!bg-transparent [&_code]:!bg-transparent',
        '[&_pre]:!whitespace-pre [&_.shiki]:!bg-transparent [&_.shiki]:!p-0 [&_.shiki]:!m-0',
        'dark:[&_.shiki]:[color-scheme:dark] [&_.shiki]:[color-scheme:light]',
        className
      )}
      dangerouslySetInnerHTML={{ __html: highlightedCode }}
    />
  );
}
