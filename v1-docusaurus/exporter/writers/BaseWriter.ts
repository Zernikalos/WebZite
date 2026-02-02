import { ExApiDefinition, PageType } from '../definitions';
import { IWriter } from './IWriter';
import { generateFrontmatter } from './templates/frontmatter';
import { generateImports } from './templates/imports';
import { generateDocHeader, generateDocumentationItemList } from './templates/components';

/**
 * Base writer with common functionality
 */
export abstract class BaseWriter<T extends ExApiDefinition> implements IWriter<T> {
  abstract canWrite(definition: ExApiDefinition): definition is T;

  /**
   * Generate MDX content from a definition
   */
  write(definition: T, slug: string): string {
    const parts: string[] = [];

    // Frontmatter
    parts.push(generateFrontmatter({
      slug,
      title: definition.title,
      hideTitle: true
    }));

    // Imports
    parts.push('');
    parts.push(generateImports());

    // Header component
    parts.push('');
    parts.push(generateDocHeader(
      definition.title,
      definition.namespace,
      definition.breadcrumbs,
      [] // Type info - can be extended by subclasses
    ));

    // Documentation items
    if (definition.documentationItems.length > 0) {
      parts.push('');
      parts.push(generateDocumentationItemList(definition.documentationItems));
    }

    return parts.join('\n');
  }
}
