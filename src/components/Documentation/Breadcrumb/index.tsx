import React from 'react';
import Link from '@docusaurus/Link';

export interface BreadcrumbItem {
  label: string;
  to: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
  className?: string;
}

export const Breadcrumb: React.FC<BreadcrumbProps> = ({
  items,
  className = '',
}) => {
  return (
    <nav aria-label="breadcrumb" className={`tw-text-sm tw-text-gray-600 dark:tw-text-gray-400 tw-mb-6 ${className}`}>
      <div className="tw-bg-white dark:tw-bg-gray-800 tw-shadow-sm tw-rounded-lg tw-py-3 tw-px-4 tw-border tw-border-gray-200 dark:tw-border-gray-700">
        <ol className="tw-flex tw-flex-wrap tw-items-center tw-m-0 tw-p-0 tw-list-none">
          <li className="tw-flex tw-items-center">
            <Link 
              to="/" 
              className="tw-flex tw-items-center tw-text-primary-600 hover:tw-text-primary-800 dark:tw-text-primary-400 dark:hover:tw-text-primary-300 tw-transition-colors tw-duration-200"
            >
              <svg className="tw-w-4 tw-h-4 tw-mr-1" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
              </svg>
              <span>Home</span>
            </Link>
            <span className="tw-mx-2 tw-text-gray-400 dark:tw-text-gray-500 tw-select-none">/</span>
          </li>
          {items.map((item, index) => (
            <li key={index} className="tw-flex tw-items-center">
              {index < items.length - 1 ? (
                <>
                  <Link 
                    to={item.to} 
                    className="tw-text-primary-600 hover:tw-text-primary-800 dark:tw-text-primary-400 dark:hover:tw-text-primary-300 tw-transition-colors tw-duration-200"
                  >
                    {item.label}
                  </Link>
                  <span className="tw-mx-2 tw-text-gray-400 dark:tw-text-gray-500 tw-select-none">/</span>
                </>
              ) : (
                <span className="tw-font-semibold tw-text-gray-900 dark:tw-text-gray-100" aria-current="page">
                  {item.label}
                </span>
              )}
            </li>
          ))}
        </ol>
      </div>
    </nav>
  );
};

export default Breadcrumb;
