import React from 'react';
import Link from '@docusaurus/Link';

interface DataTypeCardProps {
  name: string;
  type: string;
  href: string;
  sourceHref?: string;
  description?: string;
  children?: React.ReactNode;
  className?: string;
}

export const DataTypeCard: React.FC<DataTypeCardProps> = ({
  name,
  type,
  href,
  sourceHref,
  description,
  children,
  className = '',
}) => {
  return (
    <div className={`tw:bg-white tw:dark:bg-gray-800 tw:rounded-lg tw:shadow-md tw:overflow-hidden tw:mb-6 tw:border tw:border-gray-200 tw:dark:border-gray-700 hover:tw:border-primary-500 dark:hover:tw:border-primary-400 tw:transition-all tw:duration-200 ${className}`}>
      <div className="tw:flex tw:justify-between tw:items-center tw:p-4 tw:border-b tw:border-gray-200 tw:dark:border-gray-700 tw:bg-gradient-to-r tw:from-gray-50 tw:to-gray-100 tw:dark:from-gray-700 tw:dark:to-gray-800">
        <h3 className="tw:m-0 tw:text-lg tw:font-medium tw:flex tw:items-center">
          <span className="tw:w-1 tw:h-5 tw:bg-primary-500 tw:rounded-full tw:mr-2"></span>
          <Link 
            to={href} 
            className="tw:text-gray-900 tw:dark:text-white hover:tw:text-primary-600 dark:hover:tw:text-primary-400 tw:no-underline hover:tw:no-underline tw:transition-colors"
          >
            {name}
          </Link>
        </h3>
        {sourceHref && (
          <a
            href={sourceHref}
            target="_blank"
            rel="noopener noreferrer"
            className="tw:text-gray-500 hover:tw:text-primary-600 tw:dark:text-gray-400 dark:hover:tw:text-primary-400 tw:transition-colors tw:p-2 tw:rounded-full hover:tw:bg-gray-200 dark:hover:tw:bg-gray-600"
            title="View source"
            aria-label="View source"
          >
            <svg
              className="tw:w-5 tw:h-5"
              viewBox="0 0 24 24"
              fill="currentColor"
              aria-hidden="true"
            >
              <path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.167 6.839 9.49.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.463-1.11-1.463-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.254-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.202 2.393.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.163 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
            </svg>
          </a>
        )}
      </div>
      
      <div className="tw:px-4 tw:py-2 tw:bg-gray-50 tw:dark:bg-gray-700 tw:border-b tw:border-gray-100 tw:dark:border-gray-600 tw:flex tw:items-center">
        <span className="tw:text-xs tw:font-semibold tw:uppercase tw:text-gray-500 tw:dark:text-gray-400 tw:mr-2">Type:</span>
        <code className="tw:text-sm tw:px-2 tw:py-1 tw:rounded tw:bg-gray-100 tw:dark:bg-gray-600 tw:text-primary-600 tw:dark:text-primary-400">{type}</code>
      </div>
      
      {description && (
        <div className="tw:p-4 tw:text-gray-700 tw:dark:text-gray-300 tw:border-b tw:border-gray-100 tw:dark:border-gray-700">
          <p className="tw:mb-0">{description}</p>
        </div>
      )}
      
      {children && (
        <div className="tw:p-4 tw:bg-white tw:dark:bg-gray-800">
          {children}
        </div>
      )}
    </div>
  );
};

export default DataTypeCard;
