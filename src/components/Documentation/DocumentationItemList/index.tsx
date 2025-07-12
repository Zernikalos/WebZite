import React, { ReactElement, Children, isValidElement, useMemo } from 'react';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import { GroupType } from '../DocumentationItemComponent';

export interface DocumentationListHeader {
  name: string;
  description?: string;
  annotations?: string[];
  url?: string;
}

interface DocumentationItemListProps {
  children: React.ReactNode;
}

interface TabConfig {
  value: string;
  title: string;
  color: string;
  icon: JSX.Element;
}

// Define configurations and mappings as module-level constants
const TAB_CONFIGS: Record<string, TabConfig> = {
  all: {
    value: 'all',
    title: 'All',
    color: 'indigo',
    icon: (
      <svg className="tw:w-5 tw:h-5" fill="currentColor" viewBox="0 0 20 20">
        <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
      </svg>
    )
  },
  types: {
    value: 'types',
    title: 'Types',
    color: 'blue',
    icon: (
      <svg className="tw:w-5 tw:h-5" fill="currentColor" viewBox="0 0 20 20">
        <path fillRule="evenodd" d="M3 5a2 2 0 012-2h10a2 2 0 012 2v10a2 2 0 01-2 2H5a2 2 0 01-2-2V5zm11 1H6v8l4-2 4 2V6z" clipRule="evenodd" />
      </svg>
    )
  },
  constructors: {
    value: 'constructors',
    title: 'Constructors',
    color: 'blue', // Consider a different color if needed to distinguish from Types
    icon: (
      <svg className="tw:w-5 tw:h-5" fill="currentColor" viewBox="0 0 20 20">
        {/* Using the same icon as Types for now, can be changed */}
        <path fillRule="evenodd" d="M3 5a2 2 0 012-2h10a2 2 0 012 2v10a2 2 0 01-2 2H5a2 2 0 01-2-2V5zm11 1H6v8l4-2 4 2V6z" clipRule="evenodd" />
      </svg>
    )
  },
  enum_entries: {
    value: 'enum_entries',
    title: 'Enum Values',
    color: 'rose',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="tw:w-5 tw:h-5" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M10 3a1 1 0 011 1v.069l.36-1.59A1 1 0 0112.333 2h.025a1 1 0 01.975 1.217L12.9 6H16a1 1 0 110 2h-3.075l-.334 1.488A1 1 0 0111.618 11h.027a1 1 0 01.975 1.217L12.187 14H16a1 1 0 110 2h-3.813l-.36 1.59a1 1 0 01-1.975-.434L10.217 16H8a1 1 0 110-2h2.217l.36-1.59a1 1 0 011.975-.434L12.187 10H8a1 1 0 110-2h4.187l.334-1.488A1 1 0 0113.5 5h.025a1 1 0 01.975 1.217L14.066 8H10a1 1 0 01-1-1V4a1 1 0 011-1z" clipRule="evenodd" />
      </svg>
    )
  },
  properties: {
    value: 'properties',
    title: 'Properties',
    color: 'teal',
    icon: (
      <svg className="tw:w-5 tw:h-5" fill="currentColor" viewBox="0 0 20 20">
        <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
      </svg>
    )
  },
  functions: {
    value: 'functions',
    title: 'Functions',
    color: 'amber',
    icon: (
      <svg className="tw:w-5 tw:h-5" fill="currentColor" viewBox="0 0 20 20">
        <path fillRule="evenodd" d="M12.316 3.051a1 1 0 01.633 1.265l-4 12a1 1 0 11-1.898-.632l4-12a1 1 0 011.265-.633zM5.707 6.293a1 1 0 010 1.414L3.414 10l2.293 2.293a1 1 0 11-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0zm8.586 0a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 11-1.414-1.414L16.586 10l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
      </svg>
    )
  }
};

const GROUP_TYPE_TO_TAB_VALUE = {
  [GroupType.TYPE]: 'types',
  [GroupType.PACKAGE]: 'types',
  [GroupType.CONSTRUCTOR]: 'constructors',
  [GroupType.FUNCTION]: 'functions',
  [GroupType.PROPERTY]: 'properties',
  [GroupType.ENUM_ENTRY]: 'enum_entries',
  [GroupType.NONE]: '' // Ensure this case is handled if NONE items can appear
};

export const DocumentationItemList: React.FC<DocumentationItemListProps> = ({ children }) => {
  // tabConfigs and groupTypeToTabValue are now module-level constants: TAB_CONFIGS, GROUP_TYPE_TO_TAB_VALUE
  // The actual definitions for TAB_CONFIGS and GROUP_TYPE_TO_TAB_VALUE are now outside this component.
  const { itemsByType, totalItems } = useMemo(() => {
    const itemsAccumulator: Record<string, ReactElement[]> = {
      all: [],
      types: [],
      constructors: [],
      enum_entries: [],
      properties: [],
      functions: []
    };

    const groupTypeSortOrder: Record<GroupType, number> = {
      [GroupType.TYPE]: 0,
      [GroupType.PACKAGE]: 0,
      [GroupType.CONSTRUCTOR]: 1,
      [GroupType.ENUM_ENTRY]: 2,
      [GroupType.PROPERTY]: 3,
      [GroupType.FUNCTION]: 4,
      [GroupType.NONE]: 5
    };
    
    Children.forEach(children, (child) => {
      if (isValidElement(child) && child.props.groupType) {
        itemsAccumulator.all.push(child);
        
        const groupType = child.props.groupType as GroupType;
        const tabValue = GROUP_TYPE_TO_TAB_VALUE[groupType];
        
        if (tabValue && itemsAccumulator[tabValue]) {
          itemsAccumulator[tabValue].push(child);
        }
      }
    });

    // Sort the 'all' items based on the defined order
    itemsAccumulator.all.sort((a, b) => {
      const groupA = a.props.groupType as GroupType;
      const groupB = b.props.groupType as GroupType;
      const orderA = groupTypeSortOrder[groupA] ?? 99;
      const orderB = groupTypeSortOrder[groupB] ?? 99;
      return orderA - orderB;
    });
    
    const total = Object.values(itemsAccumulator).reduce(
      (sum, items) => sum + items.length, 0
    ) - itemsAccumulator.all.length; // Restamos all para no contar duplicados
    
    return { itemsByType: itemsAccumulator, totalItems: itemsAccumulator.all.length };
  }, [children]);
  
  const { tabsToDisplay, defaultValueForTabs } = useMemo(() => {
    const allActive = Object.keys(itemsByType).filter(
      type => itemsByType[type] && itemsByType[type].length > 0
    );

    const specificActive = allActive.filter(type => type !== 'all');

    // Caso especial: Solo una categoría específica contiene todos los elementos
    if (
      specificActive.length === 1 &&
      itemsByType.all && // Asegurar que 'all' existe
      itemsByType[specificActive[0]] && // Asegurar que la categoría específica existe
      itemsByType[specificActive[0]].length === itemsByType.all.length &&
      itemsByType[specificActive[0]].length > 0 // Asegurar que no estamos mostrando una pestaña vacía
    ) {
      return {
        tabsToDisplay: [specificActive[0]],
        defaultValueForTabs: specificActive[0],
      };
    }

    // Comportamiento estándar: mostrar todas las pestañas activas
    const defaultVal = allActive.includes('all')
      ? 'all'
      : (allActive.length > 0 ? allActive[0] : '');
    
    return {
      tabsToDisplay: allActive,
      defaultValueForTabs: defaultVal,
    };
  }, [itemsByType]);

  const hasTabs = tabsToDisplay.length > 0;

  // Formatear los valores para el componente Tabs de Docusaurus
  const formattedTabValues = tabsToDisplay
    .filter(type => TAB_CONFIGS[type])
    .map(type => ({
      label: `${TAB_CONFIGS[type].title} (${itemsByType[type].length})`,
      value: type
    }));

  const renderTabSection = (type: string) => {
    const items = itemsByType[type];
    const config = TAB_CONFIGS[type];
    
    if (!items || items.length === 0 || !config) return null;
    
    return (
      <TabItem value={type} key={type}>
        <div className="tw:space-y-6 tw:p-4">
          <div className="tw:flex tw:items-center tw:mb-4">
            <div className={`tw:flex-shrink-0 tw:w-10 tw:h-10 tw:bg-${config.color}-100 tw:dark:bg-${config.color}-900 tw:rounded-full tw:flex tw:items-center tw:justify-center tw:mr-3 tw:shadow-sm`}>
              {React.cloneElement(config.icon, { 
                className: `tw:w-5 tw:h-5 tw:text-${config.color}-600 tw:dark:text-${config.color}-400` 
              })}
            </div>
            <h2 className="tw:text-xl tw:font-bold tw:text-gray-900 tw:dark:text-white tw:m-0">
              {config.title}
            </h2>
            <span className={`tw:ml-3 tw:px-2 tw:py-1 tw:bg-${config.color}-100 tw:text-${config.color}-800 tw:dark:bg-${config.color}-900 tw:dark:text-${config.color}-200 tw:rounded-full tw:text-xs tw:font-medium`}>
              {items.length}
            </span>
          </div>
          {items}
        </div>
      </TabItem>
    );
  };

  return (
    <div className="tw:mt-8">
      {hasTabs && (
        <div className="tw:rounded-lg tw:shadow-md tw:overflow-hidden">
          {totalItems > 0 && (
            <div className="tw:absolute tw:top-4 tw:right-4 tw:bg-primary-100 tw:text-primary-800 tw:dark:bg-primary-900 tw:dark:text-primary-200 tw:px-3 tw:py-1 tw:rounded-full tw:text-sm tw:font-medium tw:shadow-sm">
              {totalItems} {totalItems === 1 ? 'item' : 'items'}
            </div>
          )}
          <Tabs defaultValue={defaultValueForTabs} values={formattedTabValues}>
            {tabsToDisplay.filter(type => TAB_CONFIGS[type]).map(renderTabSection)}
          </Tabs>
        </div>
      )}
    </div>
  );
};

export default DocumentationItemList;
