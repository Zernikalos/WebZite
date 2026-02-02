import { ExApiDefinition } from './ExApiDefinition';
import { ExApiDocItem } from './ExApiDocItem';
import { ExApiBreadcrumb } from './ExApiBreadcrumb';
import { PageType } from './enums';

/**
 * Definition for a Member page (individual function, property, etc.)
 * Contains detailed documentation for a single member
 */
export interface ExApiMemberDef extends ExApiDefinition {
  readonly pageType: PageType.MEMBER;
}

/**
 * Creates a new Member page definition
 */
export function createMemberDef(params: {
  sourcePath: string;
  title: string;
  mainName: string;
  namespace: string;
  breadcrumbs: ExApiBreadcrumb[];
  documentationItems: ExApiDocItem[];
  availableTokens: string[];
}): ExApiMemberDef {
  return {
    pageType: PageType.MEMBER,
    sourcePath: params.sourcePath,
    title: params.title,
    mainName: params.mainName,
    namespace: params.namespace,
    breadcrumbs: params.breadcrumbs,
    documentationItems: params.documentationItems,
    availableTokens: params.availableTokens
  };
}
