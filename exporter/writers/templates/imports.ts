/**
 * Generate import statements for MDX files
 */

/**
 * Generate the standard documentation imports
 *
 * @returns Import statement string
 */
export function generateImports(): string {
  return `import { DocHeader, DocumentationItemList, DocumentationItemComponent, CodeBlockComponent } from '@site/src/components/Documentation';`;
}
