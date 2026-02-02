import CodeBlock from '@theme/CodeBlock';

interface BlazingFastProps {
    className?: string;
    language?: string;
    code?: string;
}

export default function BlazingFast({className, language, code}: BlazingFastProps) {
  
  return (
    <div className={`tw:mockup-window tw:border tw:border-gray-500 tw:w-full ${className || ''}`}>
      <CodeBlock
        className='tw:mb-0! tw:rounded-none'
        language={language}
        showLineNumbers

        >
        {code}
      </CodeBlock>
    </div>
  );
}