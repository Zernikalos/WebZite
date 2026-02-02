import { ExApiDefinition, ExApiClassDef, PageType } from '../definitions';
import { BaseWriter } from './BaseWriter';

/**
 * Writer for Class pages
 */
export class ClassWriter extends BaseWriter<ExApiClassDef> {
  canWrite(definition: ExApiDefinition): definition is ExApiClassDef {
    return definition.pageType === PageType.CLASS;
  }
}
