import { ExApiDocItem, ExApiCodeBlock, ExApiBreadcrumb } from '../../definitions';

/**
 * Type info item for DocHeader
 */
export interface TypeInfoItem {
  type: string;
  keyword: string;
  name: string;
  url: string;
}

/**
 * Generate DocHeader component
 *
 * @param title - Page title
 * @param namespace - Namespace string
 * @param breadcrumbs - Breadcrumb items
 * @param typeInfo - Type information items
 * @returns DocHeader JSX string
 */
export function generateDocHeader(
  title: string,
  namespace: string,
  breadcrumbs: ExApiBreadcrumb[],
  typeInfo: TypeInfoItem[] = []
): string {
  return `<DocHeader
  title="${escapeAttribute(title)}"
  namespace="${escapeAttribute(namespace)}"
  breadcrumbs={${JSON.stringify(breadcrumbs)}}
  typeInfo={${JSON.stringify(typeInfo)}}
/>`;
}

/**
 * Generate CodeBlockComponent
 *
 * @param block - Code block data
 * @returns CodeBlockComponent JSX string
 */
export function generateCodeBlock(block: ExApiCodeBlock): string {
  const codeProp = JSON.stringify(block.code);
  const linksProp = JSON.stringify(block.links || []);
  const sourceProp = block.sourceUrl ? ` source="${block.sourceUrl}"` : '';

  return `<CodeBlockComponent platform="${escapeAttribute(block.platform)}" code={${codeProp}} links={${linksProp}}${sourceProp} />`;
}

/**
 * Generate DocumentationItemComponent
 *
 * @param item - Documentation item data
 * @returns DocumentationItemComponent JSX string
 */
export function generateDocumentationItem(item: ExApiDocItem): string {
  const escapedDescription = escapeDescription(item.description);
  const codeBlockChildren = item.codeBlocks
    .map(generateCodeBlock)
    .map(line => `    ${line}`)
    .join('\n');

  if (codeBlockChildren) {
    return `<DocumentationItemComponent
    name="${escapeAttribute(item.name)}"
    tokenType="${item.tokenType}"
    groupType="${item.groupType}"
    url="${escapeAttribute(item.url)}"
    description="${escapedDescription}"
  >
${codeBlockChildren}
  </DocumentationItemComponent>`;
  }

  return `<DocumentationItemComponent
    name="${escapeAttribute(item.name)}"
    tokenType="${item.tokenType}"
    groupType="${item.groupType}"
    url="${escapeAttribute(item.url)}"
    description="${escapedDescription}"
  />`;
}

/**
 * Generate DocumentationItemList with items
 *
 * @param items - Documentation items
 * @returns DocumentationItemList JSX string
 */
export function generateDocumentationItemList(items: ExApiDocItem[]): string {
  if (items.length === 0) {
    return '<DocumentationItemList />';
  }

  const itemStrings = items.map(generateDocumentationItem);

  return `<DocumentationItemList>
  ${itemStrings.join('\n  ')}
</DocumentationItemList>`;
}

/**
 * Escape a string for use in JSX attributes
 */
function escapeAttribute(str: string): string {
  return str
    .replace(/\\/g, '\\\\')
    .replace(/"/g, '\\"');
}

/**
 * Escape a description string
 */
function escapeDescription(str: string): string {
  return str
    .replace(/"/g, "'")
    .replace(/\n/g, ' ')
    .trim();
}
