/**
 * Templates for MDX to React conversion
 */

import _ from 'lodash';
import { DocumentationItem, GroupType, TokenType } from "./extractors/DocumentationItem";
import { PageType } from './extractors/DocumentationPage';

/**
 * Interface for breadcrumb item
 */
export interface BreadcrumbItem {
  label: string;
  url: string;
}

/**
 * Interface for type information
 */
export interface TypeInfoItem {
  type: string;
  keyword: string;
  name: string;
  url: string;
}


/**
 * Interface for template data
 */
export interface TemplateData {
  title: string;
  namespace: string;
  pageType: PageType;
  breadcrumbs: BreadcrumbItem[];
  typeInfo: TypeInfoItem[];
  documentationItems: DocumentationItem[];
}

/**
 * Private function to generate the header template
 * @param data - Header data
 * @returns DocHeader component template
 */
const headerTemplate = (data: TemplateData): string => {
  return `<DocHeader
  title="${data.title}"
  namespace="${data.namespace}"
  breadcrumbs={${JSON.stringify(data.breadcrumbs)}}
  typeInfo={${JSON.stringify(data.typeInfo)}}
/>`;
};

/**
 * Creates a template string for a single CodeBlockComponent.
 * @param block - The code block data.
 * @returns A string representing a CodeBlockComponent.
 */
const createCodeBlockComponentString = (block: { platform: string; code: string[] }): string => {
  // Serialize the code array into a JSON string, which is a valid way to represent an array prop in JSX.
  const codeProp = JSON.stringify(block.code);
  return `<CodeBlockComponent platform="${block.platform}" code={${codeProp}} />`;
};

/**
 * Helper function to create a DocumentationItemComponent template string.
 * @param item - Documentation item.
 * @returns DocumentationItemComponent template string.
 */
export const createDocumentationItemComponent = (item: DocumentationItem): string => {
  const escapedDescription = item.description?.replace(/"/g, "'").replace(/\n/g, ' ') || '';

  const codeBlockChildren = item.codeBlocks
    ?.map(createCodeBlockComponentString)
    .map(line => `    ${line}`)
    .join('\n') || '';

  if (codeBlockChildren) {
    return `<DocumentationItemComponent
    name="${item.name}"
    tokenType="${item.tokenType}"
    groupType="${item.groupType}"
    url="${item.url}"
    description="${escapedDescription}"
  >
${codeBlockChildren}
  </DocumentationItemComponent>`;
  }

  return `<DocumentationItemComponent
    name="${item.name}"
    tokenType="${item.tokenType}"
    groupType="${item.groupType}"
    url="${item.url}"
    description="${escapedDescription}"
  />`;
};

const codeListTemplate = (data: TemplateData): string => {
  // Array para todos los componentes
  let documentationItemsRC: string[] = [];
  
  // Process documentation items
  if (data.documentationItems && data.documentationItems.length > 0) {
    data.documentationItems.forEach(item => {
      // Crear el componente para cada item
      const componentString = createDocumentationItemComponent(item);
      documentationItemsRC.push(componentString);
    });
  }
  
  // Generate the CodeClassList component with all DocumentationItemComponent children
  return `<DocumentationItemList>
  ${documentationItemsRC.join('\n  ')}
</DocumentationItemList>`;
};

/**
 * Public function to generate a complete document template
 * @param data - Document data
 * @returns Complete document template
 */
const docTemplate = (data: TemplateData): string => {
  // Imports section is common for all document types
  const imports = "import { DocHeader, DocumentationItemList, DocumentationItemComponent, CodeBlockComponent } from '@site/src/components/Documentation';\n\n";
  
  // Generate header section
  const header = headerTemplate(data);
  
  // Determine document type based on pageType
  let type = 'properties';
  if (data.pageType === PageType.MEMBER) {
    type = 'parameters';
  }
  
  // Generate code list section
  let codeList = codeListTemplate(data);

  // Combine all sections
  return imports + header + '\n\n' + codeList;
};

export {
  docTemplate
};
