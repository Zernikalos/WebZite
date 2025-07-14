import React from 'react';
import CodeBlock from '@theme/CodeBlock';

export interface CodeBlockComponentProps {
  code: string[];
}

export const CodeBlockComponent: React.FC<CodeBlockComponentProps> = ({
  code
}) => {
  // Join the array of code lines into a single string with newlines.
  const codeString = code.join('\n');

  return (
    <div>
      <CodeBlock language="kotlin" className='tw:mb-0'>
        {codeString}
      </CodeBlock>
    </div>
  );
};

export default CodeBlockComponent;
