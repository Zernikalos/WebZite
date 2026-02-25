import clsx from 'clsx';
import CodeBlock from '../CodeBlock';

interface CodeWindowProps {
  className?: string;
  language?: string;
  code?: string;
}

/**
 * Code display component with macOS-style window chrome.
 * Wraps the CodeBlock component with window decorations.
 */
export default function CodeWindow({
  className,
  language = 'kotlin',
  code = '',
}: CodeWindowProps) {
  return (
    <div
      className={clsx(
        'w-full overflow-hidden rounded-lg border border-slate-200 bg-white shadow-2xl dark:border-gray-700 dark:bg-gray-900',
        className
      )}
    >
      {/* Window title bar with traffic lights */}
      <div className="flex items-center gap-2 border-b border-slate-200 bg-slate-100 px-4 py-3 dark:border-gray-700 dark:bg-gray-800">
        <div className="w-3 h-3 rounded-full bg-[#ff5f56]" />
        <div className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
        <div className="w-3 h-3 rounded-full bg-[#27c93f]" />
      </div>

      {/* Code content using CodeBlock (without its own border/rounded corners) */}
      <CodeBlock
        language={language}
        code={code}
        className="!rounded-none !border-none !bg-slate-50 dark:!bg-gray-950/50"
      />
    </div>
  );
}
