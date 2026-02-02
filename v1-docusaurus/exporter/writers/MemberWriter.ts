import { ExApiDefinition, ExApiMemberDef, PageType } from '../definitions';
import { BaseWriter } from './BaseWriter';

/**
 * Writer for Member pages
 */
export class MemberWriter extends BaseWriter<ExApiMemberDef> {
  canWrite(definition: ExApiDefinition): definition is ExApiMemberDef {
    return definition.pageType === PageType.MEMBER;
  }
}
