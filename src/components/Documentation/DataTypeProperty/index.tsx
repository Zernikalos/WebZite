import React from 'react';

interface PropertyValue {
  type: 'actual' | 'expect';
  value: string;
  typeHref?: string;
}

interface DataTypePropertyProps {
  name: string;
  values: PropertyValue[];
  description?: string;
  className?: string;
}

export const DataTypeProperty: React.FC<DataTypePropertyProps> = ({
  name,
  values,
  description,
  className = '',
}) => {
  return (
    <div className={`tw:mb-6 tw:border tw:border-gray-200 tw:dark:border-gray-700 tw:rounded-lg tw:overflow-hidden tw:transition-colors hover:tw:border-primary-300 dark:hover:tw:border-primary-600 tw:shadow-sm hover:tw:shadow-md tw:bg-white tw:dark:bg-gray-800 ${className}`}>
      <div className="tw:px-4 tw:py-3 tw:border-b tw:border-gray-200 tw:dark:border-gray-700 tw:bg-gray-50 tw:dark:bg-gray-800 tw:flex tw:justify-between tw:items-center">
        <h4 className="tw:m-0 tw:flex tw:items-center">
          <span className="tw:inline-flex tw:items-center tw:justify-center tw:w-6 tw:h-6 tw:rounded-full tw:bg-primary-100 tw:dark:bg-primary-900 tw:mr-2">
            <svg className="tw:w-3.5 tw:h-3.5 tw:text-primary-700 tw:dark:text-primary-300" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2-1a1 1 0 00-1 1v12a1 1 0 001 1h8a1 1 0 001-1V4a1 1 0 00-1-1H6z" clipRule="evenodd" />
            </svg>
          </span>
          <a 
            href={`#${name.toLowerCase()}`} 
            className="tw:font-mono tw:font-semibold tw:text-gray-900 tw:dark:text-white hover:tw:text-primary-600 dark:hover:tw:text-primary-400 tw:no-underline tw:transition-colors"
          >
            {name}
          </a>
        </h4>
        <div className="tw:flex tw:items-center tw:gap-2">
          <span className="tw:text-xs tw:text-gray-500 tw:dark:text-gray-400 tw:font-medium">{values.length} {values.length === 1 ? 'value' : 'values'}</span>
        </div>
      </div>
      
      <div className="tw:divide-y tw:divide-gray-100 tw:dark:divide-gray-700">
        {values.map((item, index) => (
          <div 
            key={index} 
            className={`tw:px-4 tw:py-3 tw:flex tw:items-start ${item.type === 'actual' 
              ? 'tw:bg-blue-50 tw:dark:bg-blue-900/20 tw:border-l-4 tw:border-blue-500' 
              : 'tw:bg-green-50 tw:dark:bg-green-900/20 tw:border-l-4 tw:border-green-500'}`}
          >
            <span className={`tw:inline-block tw:px-2 tw:py-1 tw:rounded tw:mr-3 tw:text-xs tw:font-semibold ${item.type === 'actual' ? 'tw:bg-blue-100 tw:text-blue-800 tw:dark:bg-blue-900 tw:dark:text-blue-200' : 'tw:bg-green-100 tw:text-green-800 tw:dark:bg-green-900 tw:dark:text-green-200'}`}>
              {item.type}
            </span>
            <code className="tw:flex-1 tw:font-mono tw:text-sm tw:text-gray-800 tw:dark:text-gray-200 tw:p-2 tw:bg-gray-50 tw:dark:bg-gray-700 tw:rounded">
              <span className="tw:opacity-70">val </span>
              <span className="tw:text-primary-600 tw:dark:text-primary-400 tw:font-semibold">{name}</span>
              <span className="tw:opacity-70">: </span>
              {item.typeHref ? (
                <a 
                  href={item.typeHref} 
                  className="tw:text-blue-600 tw:dark:text-blue-400 hover:tw:underline tw:font-medium"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {item.value}
                </a>
              ) : (
                <span className="tw:font-medium">{item.value}</span>
              )}
            </code>
          </div>
        ))}
      </div>
      
      {description && (
        <div className="tw:p-4 tw:text-sm tw:text-gray-700 tw:dark:text-gray-300 tw:border-t tw:border-gray-100 tw:dark:border-gray-700 tw:bg-white tw:dark:bg-gray-800">
          <div className="tw:flex tw:items-start">
            <span className="tw:inline-flex tw:items-center tw:justify-center tw:w-5 tw:h-5 tw:rounded-full tw:bg-gray-200 tw:dark:bg-gray-700 tw:mr-2 tw:mt-0.5">
              <svg className="tw:w-3 tw:h-3 tw:text-gray-600 tw:dark:text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2h-1V9a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
            </span>
            <div className="tw:flex-1">{description}</div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DataTypeProperty;
