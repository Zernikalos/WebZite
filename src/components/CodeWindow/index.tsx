import clsx from 'clsx';
import { codeToHtml } from 'shiki';

interface CodeWindowProps {
  className?: string;
  language?: string;
  code?: string;
}

/**
 * Code display component with macOS-style window chrome and syntax highlighting.
 * Uses Shiki for syntax highlighting with a dark theme.
 */
export default async function CodeWindow({
  className,
  language = 'kotlin',
  code = '',
}: CodeWindowProps) {
  const highlightedCode = await codeToHtml(code, {
    lang: language,
    theme: 'github-dark',
  });

  return (
    <div
      className={clsx(
        'rounded-lg border border-gray-700 w-full bg-gray-900 overflow-hidden',
        className
      )}
    >
      {/* Window title bar with traffic lights */}
      <div className="flex items-center gap-2 px-4 py-3 bg-gray-800 border-b border-gray-700">
        <div className="w-3 h-3 rounded-full bg-red-500" />
        <div className="w-3 h-3 rounded-full bg-yellow-500" />
        <div className="w-3 h-3 rounded-full bg-green-500" />
      </div>

      {/* Code content with syntax highlighting */}
      <div
        className="bg-gray-950 px-4 py-4 overflow-x-auto text-sm leading-relaxed [&_pre]:!bg-transparent [&_code]:!bg-transparent"
        dangerouslySetInnerHTML={{ __html: highlightedCode }}
      />
    </div>
  );
}
