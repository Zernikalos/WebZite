import React from 'react';

interface SectionTextProps {
  children: React.ReactNode;
  className?: string;
}

export default function SectionText({ children, className }: SectionTextProps): JSX.Element {
  return (
    <p className={`tw:mt-6 tw:text-lg tw:text-gray-300 ${className || ''}`}>
      {children}
    </p>
  );
}
