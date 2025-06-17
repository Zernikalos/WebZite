import React from 'react';
import Link from '@docusaurus/Link';
import CodeBlock from '@theme/CodeBlock';

interface PropertyItemProps {
  name: string;
  url: string;
  type: string;
  typeUrl: string;
  implementations: Array<{
    type: 'actual' | 'expect';
    value: string;
  }>;
}

export const PropertyList: React.FC<{ properties: PropertyItemProps[] }> = ({ properties }) => {
  // Determinar el color del borde y el badge según el tipo de implementación
  const getImplBorderColor = (implType: 'actual' | 'expect') => {
    return implType === 'actual' ? 'tw:border-blue-500' : 'tw:border-green-500';
  };

  const getImplBadgeColor = (implType: 'actual' | 'expect') => {
    return implType === 'actual' 
      ? 'tw:bg-blue-100 tw:text-blue-800 tw:dark:bg-blue-900 tw:dark:text-blue-200'
      : 'tw:bg-green-100 tw:text-green-800 tw:dark:bg-green-900 tw:dark:text-green-200';
  };

  return (
    <div className="tw:mt-8 tw:mb-8">
      <div className="tw:flex tw:items-center tw:mb-6">
        <div className="tw:flex-shrink-0 tw:w-10 tw:h-10 tw:bg-primary-100 tw:dark:bg-primary-900 tw:rounded-full tw:flex tw:items-center tw:justify-center tw:mr-3 tw:shadow-sm">
          <svg className="tw:w-5 tw:h-5 tw:text-primary-600 tw:dark:text-primary-400" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M3 5a2 2 0 012-2h10a2 2 0 012 2v10a2 2 0 01-2 2H5a2 2 0 01-2-2V5zm11 1H6v8l4-2 4 2V6z" clipRule="evenodd" />
          </svg>
        </div>
        <h2 className="tw:text-2xl tw:font-bold tw:text-gray-900 tw:dark:text-white tw:m-0">Properties</h2>
      </div>
      
      <div className="tw:grid tw:gap-6 tw:md:grid-cols-2 tw:lg:grid-cols-3">
        {properties.map((property, index) => {
          // Determinar el tipo de propiedad (val o var) basado en el valor
          const propertyType = property.implementations.length > 0 && property.implementations[0].value.includes('val ') 
            ? 'val' 
            : 'var';
          
          // Determinar el color del borde basado en el tipo de propiedad
          const borderColor = propertyType === 'val' 
            ? 'tw:border-teal-500' 
            : 'tw:border-rose-500';
          
          // Determinar el color del badge basado en el tipo de propiedad
          const badgeColor = propertyType === 'val'
            ? 'tw:bg-teal-100 tw:text-teal-800 tw:dark:bg-teal-900 tw:dark:text-teal-200'
            : 'tw:bg-rose-100 tw:text-rose-800 tw:dark:bg-rose-900 tw:dark:text-rose-200';
          
          return (
            <div 
              key={index} 
              className={`tw:bg-white tw:dark:bg-gray-800 tw:rounded-lg tw:shadow-md tw:border-l-4 ${borderColor} tw:border tw:border-gray-200 tw:dark:border-gray-700 tw:overflow-hidden tw:transition-all tw:duration-200 tw:transform hover:tw:translate-y-[-2px] hover:tw:shadow-lg`}
            >
              <div className="tw:bg-gray-50 tw:dark:bg-gray-700 tw:p-4 tw:border-b tw:border-gray-200 tw:dark:border-gray-700">
                <div className="tw:flex tw:items-center tw:justify-between">
                  <div className="tw:flex tw:items-center">
                    <span className={`tw:px-2 tw:py-1 tw:rounded-md tw:text-xs tw:font-medium tw:mr-3 ${badgeColor}`}>
                      {propertyType}
                    </span>
                    <Link
                      to={property.url}
                      className="tw:text-lg tw:font-semibold tw:text-gray-900 tw:dark:text-white hover:tw:text-primary-600 dark:hover:tw:text-primary-400 tw:no-underline"
                    >
                      {property.name}
                    </Link>
                  </div>
                  <div className="tw:flex tw:items-center">
                    <span className="tw:text-xs tw:font-semibold tw:uppercase tw:text-gray-500 tw:dark:text-gray-400 tw:mr-1">Type:</span>
                    <Link
                      to={property.typeUrl}
                      className="tw:text-sm tw:px-2 tw:py-1 tw:rounded tw:bg-gray-100 tw:dark:bg-gray-600 tw:text-primary-600 hover:tw:text-primary-800 tw:dark:text-primary-400 dark:hover:tw:text-primary-300 tw:font-mono"
                    >
                      {property.type}
                    </Link>
                  </div>
                </div>
              </div>
              
              <div className="tw:divide-y tw:divide-gray-100 tw:dark:divide-gray-700">
                {property.implementations.map((impl, idx) => {
                  // Extraer el código limpio para mostrar en el CodeBlock
                  const cleanCode = impl.value
                    .replace(/<[^>]*>/g, '') // Eliminar cualquier etiqueta HTML
                    .replace(/&lt;/g, '<') // Reemplazar entidades HTML
                    .replace(/&gt;/g, '>')
                    .replace(/&amp;/g, '&')
                    .replace(/&quot;/g, '"')
                    .replace(/&#39;/g, "'");
                    
                  return (
                    <div 
                      key={idx} 
                      className={`tw:p-4 tw:border-l-4 ${getImplBorderColor(impl.type)}`}
                    >
                      <div className="tw:flex tw:items-center tw:mb-2">
                        <span className={`tw:px-2 tw:py-1 tw:rounded tw:text-xs tw:font-semibold tw:mr-2 ${getImplBadgeColor(impl.type)}`}>
                          {impl.type}
                        </span>
                      </div>
                      <div className="tw:mt-2">
                        <CodeBlock language="kotlin" className="tw:text-sm">
                          {cleanCode}
                        </CodeBlock>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PropertyList;
