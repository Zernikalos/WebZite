import React, { useState } from 'react';

interface TabSelectorProps {
  tabs: {
    id: string;
    label: string;
    togglableTypes: string[];
  }[];
  onTabChange?: (tabId: string) => void;
}

const TabSelector: React.FC<TabSelectorProps> = ({ 
  tabs, 
  onTabChange 
}) => {
  const [activeTab, setActiveTab] = useState(tabs[0].id);

  const handleTabClick = (tabId: string) => {
    setActiveTab(tabId);
    onTabChange?.(tabId);
  };

  return (
    <div role="tablist" className="tw:tabs tw:tabs-bordered">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          role="tab"
          className={`tw:btn tw:tab ${activeTab === tab.id ? 'tw:tab-active' : ''}`}
          data-togglable={tab.togglableTypes.join(',')}
          onClick={() => handleTabClick(tab.id)}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
};

export default TabSelector;