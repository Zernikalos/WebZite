import { ExApiDefinition, ExApiLibraryDef, PageType } from '../definitions';
import { BaseWriter } from './BaseWriter';

/**
 * Writer for Library pages
 */
export class LibraryWriter extends BaseWriter<ExApiLibraryDef> {
  canWrite(definition: ExApiDefinition): definition is ExApiLibraryDef {
    return definition.pageType === PageType.LIBRARY;
  }
}
