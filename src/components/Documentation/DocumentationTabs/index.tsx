import React from 'react';

interface TabDefinition {
  value: string;
  title: string;
  icon: JSX.Element;
  count: number;
}

interface DocumentationTabsProps {
  tabs: TabDefinition[];
  selected: string;
  onSelect: (value: string) => void;
}

const DocumentationTabs: React.FC<DocumentationTabsProps> = ({ tabs, selected, onSelect }) => {
  if (!tabs || tabs.length === 0) return null;

  // Find the selected tab to display its count in the badge
  const selectedTab = tabs.find(tab => tab.value === selected);

  return (
    <div className="tw:border-b tw:border-gray-200 tw:dark:tw:border-gray-700 tw:bg-transparent tw:px-2">
      <div className="tw:flex tw:items-center tw:gap-x-2">
        {tabs.map((tab) => {
          const isActive = tab.value === selected;
          return (
            <button
              key={tab.value}
              onClick={() => onSelect(tab.value)}
              className={`tw:flex tw:items-center tw:gap-2 tw:whitespace-nowrap tw:py-2 tw:px-3 tw:rounded-t-md tw:font-medium tw:text-sm tw:transition-all tw:duration-150 focus:tw:outline-none
                ${isActive
                  ? 'tw:bg-blue-100 tw:dark:bg-gray-800 tw:shadow-sm tw:border-b-2 tw:border-b-transparent'
                  : 'tw:bg-transparent tw:text-gray-700 tw:dark:text-gray-300 tw:border-b-2 tw:border-b-transparent tw:hover:bg-gray-100 tw:dark:hover:bg-gray-800/40'}
              `}>
              {React.cloneElement(tab.icon, {
                className: `tw:w-4 tw:h-4 ${isActive ? 'tw:text-blue-800 tw:dark:text-blue-300' : 'tw:text-gray-400 tw:dark:text-gray-500'}`
              })}
              <span>{tab.title}</span>
              <span className={`tw:ml-1 tw:px-1.5 tw:py-0.5 tw:rounded-full tw:text-xs tw:font-semibold
                ${isActive
                  ? 'tw:bg-blue-200 tw:text-blue-900 tw:dark:bg-blue-800 tw:dark:text-blue-200'
                  : 'tw:bg-gray-100 tw:text-gray-600 tw:dark:bg-gray-800/40 tw:dark:text-gray-300'}
              `}>
                {tab.count}
              </span>
            </button>
          );
        })}
        {/* Total badge, aligned to the right, not selectable */}
        <div className="tw:ml-auto tw:mr-2">
          <span className="tw:bg-primary-100 tw:text-primary-800 tw:dark:bg-primary-900 tw:dark:text-primary-200 tw:px-3 tw:py-1 tw:rounded-full tw:text-sm tw:font-medium tw:shadow-sm">
            {selectedTab ? selectedTab.count : 0} {selectedTab && selectedTab.count === 1 ? 'item' : 'items'}
          </span>
        </div>
      </div>
    </div>
  );
};

export default DocumentationTabs;
