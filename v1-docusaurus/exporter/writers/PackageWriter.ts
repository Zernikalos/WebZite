import { ExApiDefinition, ExApiPackageDef, PageType } from '../definitions';
import { BaseWriter } from './BaseWriter';

/**
 * Writer for Package pages
 */
export class PackageWriter extends BaseWriter<ExApiPackageDef> {
  canWrite(definition: ExApiDefinition): definition is ExApiPackageDef {
    return definition.pageType === PageType.PACKAGE;
  }
}
