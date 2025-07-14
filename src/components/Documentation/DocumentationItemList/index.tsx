import React, { ReactElement, Children, isValidElement, useMemo } from 'react';
import { FaLayerGroup, FaCubes, FaWrench, FaCogs, FaListOl, FaBoxOpen } from 'react-icons/fa';
import { BsCodeSlash } from 'react-icons/bs';
import DocumentationTabs from '../DocumentationTabs';
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
    icon: <FaLayerGroup />,
  },
  types: {
    value: 'types',
    title: 'Types',
    color: 'blue',
    icon: <FaCogs />, // Changed from FaLayerGroup to FaCogs
  },
  constructors: {
    value: 'constructors',
    title: 'Constructors',
    color: 'blue', // Consider a different color if needed to distinguish from Types
    icon: <FaCubes />,
  },
  enum_entries: {
    value: 'enum_entries',
    title: 'Enum Values',
    color: 'rose',
    icon: <FaListOl />,
  },
  properties: {
    value: 'properties',
    title: 'Properties',
    color: 'teal',
    icon: <FaWrench />,
  },
  functions: {
    value: 'functions',
    title: 'Functions',
    color: 'amber',
    icon: <BsCodeSlash />,
  },
  objects: {
    value: 'objects',
    title: 'Objects',
    color: 'cyan',
    icon: <FaBoxOpen />,
  }
};

const GROUP_TYPE_TO_TAB_VALUE = new Map([
  [GroupType.TYPE, 'types'],
  [GroupType.PACKAGE, 'types'],
  [GroupType.CONSTRUCTOR, 'constructors'],
  [GroupType.FUNCTION, 'functions'],
  [GroupType.PROPERTY, 'properties'],
  [GroupType.ENUM_ENTRY, 'enum_entries'],
  [GroupType.OBJECT, 'objects'],
  [GroupType.NONE, ''] // Ensure this case is handled if NONE items can appear
]);

export const DocumentationItemList: React.FC<DocumentationItemListProps> = ({ children }) => {
  // Compute mapping and tabs as before
  // tabConfigs and groupTypeToTabValue are now module-level constants: TAB_CONFIGS, GROUP_TYPE_TO_TAB_VALUE
  // The actual definitions for TAB_CONFIGS and GROUP_TYPE_TO_TAB_VALUE are now outside this component.
  const { itemsByType, totalItems } = useMemo(() => {
    const itemsMap = new Map<string, ReactElement[]>();
    itemsMap.set('all', []);

    const groupTypeSortOrder: Record<GroupType, number> = {
      [GroupType.TYPE]: 1,
      [GroupType.PACKAGE]: 0,
      [GroupType.CONSTRUCTOR]: 2,
      [GroupType.PROPERTY]: 3,
      [GroupType.OBJECT]: 4, // Just before functions
      [GroupType.FUNCTION]: 5,
      [GroupType.ENUM_ENTRY]: 6,
      [GroupType.NONE]: 99
    };

    Children.forEach(children, (child) => {
      if (isValidElement(child) && child.props.groupType) {
        itemsMap.get('all').push(child);

        const groupType = child.props.groupType as GroupType;
        const tabValue = GROUP_TYPE_TO_TAB_VALUE.get(groupType);

        if (tabValue) {
          if (!itemsMap.has(tabValue)) {
            itemsMap.set(tabValue, []);
          }
          itemsMap.get(tabValue).push(child);
        }
      }
    });

    // Sort all items based on groupType
    itemsMap.get('all').sort((a, b) => {
      const groupA = a.props.groupType as GroupType;
      const groupB = b.props.groupType as GroupType;
      return (groupTypeSortOrder[groupA] ?? 99) - (groupTypeSortOrder[groupB] ?? 99);
    });

    const itemsAccumulator = Object.fromEntries(itemsMap);

    return {
      itemsByType: itemsAccumulator,
      totalItems: itemsMap.get('all')?.length || 0
    };
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

  // Prepare data for DocumentationTabs component
  const tabInfo = tabsToDisplay
    .filter(type => TAB_CONFIGS[type])
    .map(type => ({
      value: type,
      title: TAB_CONFIGS[type].title,
      icon: TAB_CONFIGS[type].icon,
      count: itemsByType[type].length
    }));

  const [selectedTab, setSelectedTab] = React.useState<string>(defaultValueForTabs);

  const itemsToRender = itemsByType[selectedTab] || [];

  return (
    <div className="tw:mt-8">
      {hasTabs && (
        <div className="tw:rounded-lg tw:shadow-md tw:overflow-hidden tw:relative">

          <DocumentationTabs
            tabs={tabInfo}
            selected={selectedTab}
            onSelect={setSelectedTab}
          />
          <div className="tw:p-4">
            {itemsToRender}
          </div>
        </div>
      )}
    </div>
  );
};

export default DocumentationItemList;
