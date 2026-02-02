import { ExApiDefinition } from '../definitions';

/**
 * Writer interface for Definition to MDX conversion
 */
export interface IWriter<T extends ExApiDefinition = ExApiDefinition> {
  /**
   * Check if this writer can handle the given definition
   *
   * @param definition - Definition to check
   * @returns true if this writer can handle it
   */
  canWrite(definition: ExApiDefinition): definition is T;

  /**
   * Generate MDX content from a definition
   *
   * @param definition - Definition to convert
   * @param slug - Docusaurus slug for the page
   * @returns MDX content string
   */
  write(definition: T, slug: string): string;
}
