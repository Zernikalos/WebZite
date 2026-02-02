import { ExApiDefinition } from './ExApiDefinition';
import { ExApiDocItem } from './ExApiDocItem';
import { ExApiBreadcrumb } from './ExApiBreadcrumb';
import { PageType } from './enums';

/**
 * Definition for a Class page (class, interface, object, enum)
 * Contains constructors, properties, functions, and nested types
 */
export interface ExApiClassDef extends ExApiDefinition {
  readonly pageType: PageType.CLASS;
}

/**
 * Creates a new Class page definition
 */
export function createClassDef(params: {
  sourcePath: string;
  title: string;
  mainName: string;
  namespace: string;
  breadcrumbs: ExApiBreadcrumb[];
  documentationItems: ExApiDocItem[];
  availableTokens: string[];
}): ExApiClassDef {
  return {
    pageType: PageType.CLASS,
    sourcePath: params.sourcePath,
    title: params.title,
    mainName: params.mainName,
    namespace: params.namespace,
    breadcrumbs: params.breadcrumbs,
    documentationItems: params.documentationItems,
    availableTokens: params.availableTokens
  };
}
