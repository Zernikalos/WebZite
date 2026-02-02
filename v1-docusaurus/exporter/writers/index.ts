import { ExApiDefinition, PageType } from '../definitions';
import { IWriter } from './IWriter';
import { LibraryWriter } from './LibraryWriter';
import { PackageWriter } from './PackageWriter';
import { ClassWriter } from './ClassWriter';
import { MemberWriter } from './MemberWriter';

export { IWriter } from './IWriter';
export { BaseWriter } from './BaseWriter';
export { LibraryWriter } from './LibraryWriter';
export { PackageWriter } from './PackageWriter';
export { ClassWriter } from './ClassWriter';
export { MemberWriter } from './MemberWriter';

// Template exports
export { generateFrontmatter } from './templates/frontmatter';
export { generateImports } from './templates/imports';
export {
  generateDocHeader,
  generateCodeBlock,
  generateDocumentationItem,
  generateDocumentationItemList,
  type TypeInfoItem
} from './templates/components';

/**
 * All available writers
 */
const writers: IWriter[] = [
  new LibraryWriter(),
  new PackageWriter(),
  new ClassWriter(),
  new MemberWriter()
];

/**
 * Get the appropriate writer for a definition
 *
 * @param definition - Definition to write
 * @returns Writer that can handle the definition
 */
export function getWriter(definition: ExApiDefinition): IWriter | null {
  for (const writer of writers) {
    if (writer.canWrite(definition)) {
      return writer;
    }
  }
  return null;
}

/**
 * Get a writer for a specific page type
 *
 * @param pageType - Page type
 * @returns Writer for the type
 */
export function getWriterForType(pageType: PageType): IWriter {
  switch (pageType) {
    case PageType.LIBRARY:
      return new LibraryWriter();
    case PageType.PACKAGE:
      return new PackageWriter();
    case PageType.CLASS:
      return new ClassWriter();
    case PageType.MEMBER:
      return new MemberWriter();
  }
}

/**
 * Write a definition to MDX string
 *
 * @param definition - Definition to write
 * @param slug - Docusaurus slug
 * @returns MDX content string or null if no writer found
 */
export function writeMdx(definition: ExApiDefinition, slug: string): string | null {
  const writer = getWriter(definition);
  if (!writer) {
    return null;
  }
  return writer.write(definition, slug);
}
