import React, { isValidElement } from 'react';
import Link from '@docusaurus/Link';
import CodeBlockComponent, { CodeBlockComponentProps } from '../CodeBlockComponent';


export enum TokenType {
  PACKAGE = 'package',
  CLASS = 'class',
  DATA_CLASS = 'data class',
  CONSTRUCTOR = 'constructor',
  INTERFACE = 'interface',
  OBJECT = 'object',
  FUNCTION = 'fun',
  VAL = 'val',
  VAR = 'var',
  ENUM = 'enum',
  ENUM_ENTRY = 'enum entry',
  NONE = ''
}

export enum GroupType {
  NONE = 'NONE',
  PACKAGE = 'PACKAGE',
  CONSTRUCTOR = 'CONSTRUCTOR',
  PROPERTY = 'PROPERTY',
  ENUM_ENTRY = 'ENUM_ENTRY',
  FUNCTION = 'FUNCTION',
  TYPE = 'TYPE',
  OBJECT = 'OBJECT',
}

interface DocumentationItemComponentProps {
  name: string;
  description?: string;
  groupType: GroupType;
  tokenType: TokenType;
  annotations?: string[];
  url?: string;
  children?: React.ReactNode;
}

export const DocumentationItemComponent: React.FC<DocumentationItemComponentProps> = ({
  name,
  description,
  groupType,
  tokenType,
  annotations = [],
  url,
  children
}) => {
  const codeBlockChildren = React.useMemo(() => 
    React.Children.toArray(children).filter(React.isValidElement) as React.ReactElement<CodeBlockComponentProps>[],
  [children]);


  // Determinar el esquema de color y las clases CSS correspondientes
  const getColorSchemeName = (): string => {
    switch (tokenType) {
      case TokenType.CLASS:
      case TokenType.INTERFACE:
      case TokenType.ENUM:
      case TokenType.OBJECT:
        return 'purple';
      case TokenType.PACKAGE:
        return 'yellow';
      case TokenType.DATA_CLASS:
        return 'green';
      case TokenType.FUNCTION:
      case TokenType.CONSTRUCTOR:
        return 'blue';
      case TokenType.VAL:
      case TokenType.VAR:
      case TokenType.ENUM_ENTRY:
        return 'red';
      default:
        return 'gray';
    }
  };

  const colorSchemeName = getColorSchemeName();

  const borderClass = React.useMemo((): string => {
    const map: Record<string, string> = {
      purple: 'tw:border-l-purple-500',
      green: 'tw:border-l-green-500',
      blue: 'tw:border-l-blue-500',
      red: 'tw:border-l-red-500',
      yellow: 'tw:border-l-yellow-500',
      gray: 'tw:border-l-gray-500',
    };
    return map[colorSchemeName] || map.gray;
  }, [colorSchemeName]);

  const getAnnotationClasses = (schemeName: string): string => {
    // Estas cadenas completas deben estar presentes para que Tailwind las encuentre.
    // Clases base comunes que se añadirán por separado: tw:px-2.5 tw:py-1 tw:text-xs tw:font-medium tw:rounded-full tw:border
    switch (schemeName) {
      case 'purple':
        return 'tw:bg-purple-50 tw:text-purple-700 tw:dark:bg-purple-900/20 tw:dark:text-purple-300 tw:border-purple-200 tw:dark:border-purple-800/50';
      case 'green':
        return 'tw:bg-green-50 tw:text-green-700 tw:dark:bg-green-900/20 tw:dark:text-green-300 tw:border-green-200 tw:dark:border-green-800/50';
      case 'blue':
        return 'tw:bg-blue-50 tw:text-blue-700 tw:dark:bg-blue-900/20 tw:dark:text-blue-300 tw:border-blue-200 tw:dark:border-blue-800/50';
      case 'red':
        return 'tw:bg-red-50 tw:text-red-700 tw:dark:bg-red-900/20 tw:dark:text-red-300 tw:border-red-200 tw:dark:border-red-800/50';
      case 'yellow':
        return 'tw:bg-yellow-50 tw:text-yellow-700 tw:dark:bg-yellow-900/20 tw:dark:text-yellow-300 tw:border-yellow-200 tw:dark:border-yellow-800/50';
      default: // gray
        return 'tw:bg-gray-50 tw:text-gray-700 tw:dark:bg-gray-900/20 tw:dark:text-gray-300 tw:border-gray-200 tw:dark:border-gray-800/50';
    }
  };

  const getBadgeColor = () => {
    switch (tokenType) {
      case TokenType.PACKAGE:
        return 'tw:bg-yellow-100 tw:text-yellow-800 tw:dark:bg-yellow-900 tw:dark:text-yellow-300';
      case TokenType.CLASS:
      case TokenType.INTERFACE:
      case TokenType.ENUM:
      case TokenType.OBJECT:
        return 'tw:bg-purple-100 tw:text-purple-800 tw:dark:bg-purple-900 tw:dark:text-purple-300';
      case TokenType.FUNCTION:
      case TokenType.CONSTRUCTOR:
        return 'tw:bg-blue-100 tw:text-blue-800 tw:dark:bg-blue-900 tw:dark:text-blue-300';
      case TokenType.VAL:
      case TokenType.VAR:
      case TokenType.ENUM_ENTRY:
        return 'tw:bg-red-100 tw:text-red-800 tw:dark:bg-red-900 tw:dark:text-red-300';
      default:
        return 'tw:bg-gray-100 tw:text-gray-800 tw:dark:bg-gray-700 tw:dark:text-gray-300';
    }
  };

  // colorSchemeName, borderClass, and getAnnotationClasses are defined above using getColorSchemeName()

  return (
    <div className={`tw:mb-6 tw:rounded-xl tw:overflow-hidden tw:bg-white tw:dark:bg-gray-800 tw:shadow-lg tw:transform tw:transition-all hover:tw:translate-y-[-3px] hover:tw:shadow-xl tw:border tw:border-gray-200 tw:dark:border-gray-700 tw:border-l-4 ${borderClass}`}>
      {/* Barra superior con gradiente de color (opcional si se usa el borde izquierdo) */}
      {/* <div className={`tw:h-1.5 tw:bg-gradient-to-r tw:from-${colorScheme}-400 tw:to-${colorScheme}-600`}></div> */}
      
      {/* Cabecera con información principal */}
      <div className="tw:px-5 tw:py-4">
        <div className="tw:flex tw:items-center tw:justify-between">
          {/* Badge original y Nombre */}
          <div className="tw:flex tw:items-center">
            <span className={`tw:px-2 tw:py-1 tw:rounded-md tw:text-xs tw:font-medium tw:mr-3 ${getBadgeColor()}`}>
              {tokenType}
            </span>
            {/* {url ? (
              <Link 
                to={url} 
                className="tw:text-gray-900 tw:dark:text-white tw:font-medium tw:text-lg hover:tw:text-primary-600 tw:dark:hover:tw:text-primary-400 tw:transition-colors"
              >
                {name}
              </Link>
            ) : (
              <h3 className="tw:text-gray-900 tw:dark:text-white tw:font-medium tw:text-lg">{name}</h3>
            )} */}
            <h3 className="tw:text-gray-900 tw:dark:text-white tw:font-medium tw:text-lg">{name}</h3>
          </div>
          
          {/* Anotaciones (estilo actual) */}
          {annotations && annotations.length > 0 && (
            <div className="tw:flex tw:flex-wrap tw:gap-1.5 tw:flex-shrink-0 tw:ml-4">
              {annotations.map((annotation, index) => (
                <span 
                  key={index} 
                  className={`tw:px-2.5 tw:py-1 tw:text-xs tw:font-medium tw:rounded-full tw:border ${getAnnotationClasses(colorSchemeName)}`}
                >
                  {annotation}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
      
      {/* Bloques de código */}
      {codeBlockChildren.length > 0 && (
        <div className="tw:border-t tw:border-gray-200 tw:dark:border-gray-700 tw:bg-gray-100 tw:dark:bg-gray-900 tw:p-4">
          <div className="tw:flex tw:flex-col tw:gap-4">
            {codeBlockChildren}
          </div>
        </div>
      )}
      
      {/* Descripción con estilo mejorado */}
      {description && (
        <div className={`tw:p-5 ${codeBlockChildren.length === 0 ? 'tw:border-t tw:border-gray-200 tw:dark:border-gray-700' : 'tw:border-t tw:border-gray-100 tw:dark:border-gray-700'} tw:bg-gray-50/50 tw:dark:bg-gray-800/50 tw:text-gray-700 tw:dark:text-gray-300 tw:text-sm tw:leading-relaxed`}>
          {description}
        </div>
      )}
    </div>
  );
};

export default DocumentationItemComponent;
