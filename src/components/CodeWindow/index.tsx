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
        'rounded-lg border border-gray-700 w-full bg-gray-900 overflow-hidden shadow-2xl',
        className
      )}
    >
      {/* Window title bar with traffic lights */}
      <div className="flex items-center gap-2 px-4 py-3 bg-gray-800 border-b border-gray-700">
        <div className="w-3 h-3 rounded-full bg-[#ff5f56]" />
        <div className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
        <div className="w-3 h-3 rounded-full bg-[#27c93f]" />
      </div>

      {/* Code content using CodeBlock (without its own border/rounded corners) */}
      <CodeBlock 
        language={language} 
        code={code} 
        className="!border-none !rounded-none !bg-gray-950/50"
      />
    </div>
  );
}
