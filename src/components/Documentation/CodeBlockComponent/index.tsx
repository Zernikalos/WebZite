import React from 'react';
import CodeBlock from '@theme/CodeBlock';
import _ from 'lodash';

export interface CodeBlockComponentProps {
  platform: string;
  code: string[];
  links?: { text: string; href: string }[];
  source?: string | null;
}

export const CodeBlockComponent: React.FC<CodeBlockComponentProps> = ({
  platform,
  code,
  links,
  source
}) => {
  const codeString = code.join('\n');

  const linksJsx = (links && links.length > 0)
    ? (
      <div className="tw:flex tw:flex-row tw:flex-wrap tw:gap-x-2 tw:items-center tw:mt-1 tw:pr-2 tw:justify-end tw:text-right">
        {links.reduce<React.ReactNode[]>((acc, link, idx) => {
          if (idx > 0) {
            acc.push(<span className="tw:text-xs tw:text-gray-400" key={`comma-${idx}`}>, </span>);
          }
          acc.push(
            <a
              key={idx}
              href={link.href}
              className="tw:text-xs tw:italic tw:underline tw:text-blue-500 hover:tw:text-blue-400"
            >
              {link.text}
            </a>
          );
          return acc;
        }, [])}
      </div>
    )
    : null;

  return (
    <div className="tw:relative">
      <CodeBlock language="kotlin" className='tw:mb-0'>
        {codeString}
      </CodeBlock>
      {linksJsx}
    </div>
  );
};

export default CodeBlockComponent;
