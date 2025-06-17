import React from 'react';
import CodeBlock from '@theme/CodeBlock';

export interface CodeBlockComponentProps {
  code: string;
}

export const CodeBlockComponent: React.FC<CodeBlockComponentProps> = ({
  code
}) => {
  return (
    // El div contenedor ya no tiene padding ni fondo, 
    // permitiendo que @theme/CodeBlock maneje su propio estilo y espaciado.
    <div>
      <CodeBlock language="kotlin" className='tw:mb-0'>
        {code
          .replace(/<[^>]*>/g, '') // Eliminar cualquier etiqueta HTML
          .replace(/&lt;/g, '<') // Reemplazar entidades HTML
          .replace(/&gt;/g, '>')
          .replace(/&amp;/g, '&')
          .replace(/&quot;/g, '"')
          .replace(/&#39;/g, "'")}
      </CodeBlock>
    </div>
  );
};

export default CodeBlockComponent;
