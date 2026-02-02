import React from 'react';
import Link from '@docusaurus/Link';

interface SourceLink {
  label: string;
  url: string;
}

interface DocHeaderProps {
  title: string;
  namespace: string;
  breadcrumbs: Array<{
    label: string;
    url: string;
  }>;
  typeInfo: Array<{
    type: 'actual' | 'expect';
    keyword: string;
    name: string;
    url: string;
    source?: SourceLink;
  }>;
  className?: string;
}

export const DocHeader: React.FC<DocHeaderProps> = ({
  title,
  namespace,
  breadcrumbs,
  typeInfo,
  className = '',
}) => {
  // Determinar el color del borde y el badge según el tipo
  const getTypeColor = (type: string) => {
    switch (type) {
      case 'class': return 'tw:border-blue-500';
      case 'data class': return 'tw:border-green-500';
      case 'interface': return 'tw:border-purple-500';
      case 'object': return 'tw:border-amber-500';
      default: return 'tw:border-primary-500';
    }
  };

  // Determinar el color del badge según el tipo de implementación
  const getImplBadgeColor = (implType: 'actual' | 'expect') => {
    return implType === 'actual' 
      ? 'tw:bg-blue-100 tw:text-blue-800 tw:dark:bg-blue-900 tw:dark:text-blue-200'
      : 'tw:bg-green-100 tw:text-green-800 tw:dark:bg-green-900 tw:dark:text-green-200';
  };

  return (
    <div className={`tw:mb-8 tw:rounded-lg tw:shadow-md tw:border tw:border-gray-200 tw:dark:border-gray-700 tw:overflow-hidden ${className}`}>
      {/* Header con gradiente mejorado */}
      <div className="tw:bg-gradient-to-r tw:from-primary-600 tw:to-primary-800 tw:dark:from-primary-700 tw:dark:to-primary-900 tw:p-6 tw:relative tw:overflow-hidden tw:shadow-inner">
        {/* Breadcrumbs */}
        {/* <div className="tw:mb-3 tw:flex tw:flex-wrap tw:items-center tw:text-white tw:opacity-90">
          {breadcrumbs.map((item, index) => (
            <React.Fragment key={index}>
              <Link
                to={item.url}
                className="tw:text-white hover:tw:text-primary-100 tw:transition-colors tw:duration-200 tw:font-medium"
              >
                {item.label}
              </Link>
              {index < breadcrumbs.length - 1 && <span className="tw:mx-2 tw:text-white tw:opacity-70">/</span>}
              {index === breadcrumbs.length - 1 && <span className="tw:mx-2 tw:text-white tw:opacity-70">/</span>}
              {index === breadcrumbs.length - 1 && <span className="tw:text-white tw:opacity-90 tw:font-semibold">{namespace}</span>}
            </React.Fragment>
          ))}
        </div> */}

        {/* Title con efecto de texto */}
        <h1 className="tw:text-3xl tw:font-bold tw:text-white tw:mb-2 tw:tracking-tight tw:drop-shadow-sm">
          {title}
        </h1>
        
        {/* Decoración de fondo */}
        <div className="tw:absolute tw:right-0 tw:bottom-0 tw:transform tw:translate-x-1/4 tw:translate-y-1/4 tw:opacity-10">
          <svg width="220" height="220" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M100 0L120.6 69.4L190 90L120.6 110.6L100 180L79.4 110.6L10 90L79.4 69.4L100 0Z" fill="currentColor" />
          </svg>
        </div>
      </div>

      {/* Type Information */}
      <div className="tw:p-6 tw:bg-white tw:dark:bg-gray-800 tw:space-y-4">
        {typeInfo.map((info, index) => {
          // Determinar el color del borde según la palabra clave (class, interface, etc.)
          const borderColor = getTypeColor(info.keyword);
          
          return (
            <div 
              key={index} 
              className={`tw:flex tw:items-center tw:p-4 tw:rounded-lg tw:border-l-4 ${borderColor} tw:bg-gray-50 tw:dark:bg-gray-700 tw:shadow-sm tw:border tw:border-gray-200 tw:dark:border-gray-600 tw:transition-all hover:tw:shadow-md hover:tw:translate-y-[-1px]`}
            >
              <span className={`tw:px-2 tw:py-1 tw:rounded-md tw:text-xs tw:font-medium tw:mr-3 ${getImplBadgeColor(info.type)}`}>
                {info.type}
              </span>
              <span className="tw:mr-2 tw:text-gray-600 tw:dark:text-gray-300 tw:font-medium tw:px-2 tw:py-1 tw:bg-gray-100 tw:dark:bg-gray-600 tw:rounded">{info.keyword}</span>
              <Link
                to={info.url}
                className="tw:text-primary-600 hover:tw:text-primary-800 tw:dark:text-primary-400 tw:dark:hover:tw:text-primary-300 tw:font-medium"
              >
                {info.name}
              </Link>
              {info.source && (
                <span className="tw:ml-auto tw:flex tw:items-center">
                  <a
                    href={info.source.url}
                    className="tw:flex tw:items-center tw:px-3 tw:py-1 tw:bg-gray-200 tw:dark:bg-gray-600 tw:rounded-full tw:text-gray-700 hover:tw:text-primary-600 tw:dark:text-gray-300 tw:dark:hover:tw:text-primary-400 tw:transition-colors"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <svg className="tw:w-4 tw:h-4 tw:mr-1" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.167 6.839 9.49.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.463-1.11-1.463-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.254-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.202 2.393.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.163 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
                    </svg>
                    {info.source.label}
                  </a>
                </span>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default DocHeader;
