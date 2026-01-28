import { ExApiDefinition } from './ExApiDefinition';
import { ExApiDocItem } from './ExApiDocItem';
import { ExApiBreadcrumb } from './ExApiBreadcrumb';
import { PageType } from './enums';

/**
 * Definition for a Package page
 * Contains types, functions, and properties within the package
 */
export interface ExApiPackageDef extends ExApiDefinition {
  readonly pageType: PageType.PACKAGE;
}

/**
 * Creates a new Package page definition
 */
export function createPackageDef(params: {
  sourcePath: string;
  title: string;
  mainName: string;
  namespace: string;
  breadcrumbs: ExApiBreadcrumb[];
  documentationItems: ExApiDocItem[];
  availableTokens: string[];
}): ExApiPackageDef {
  return {
    pageType: PageType.PACKAGE,
    sourcePath: params.sourcePath,
    title: params.title,
    mainName: params.mainName,
    namespace: params.namespace,
    breadcrumbs: params.breadcrumbs,
    documentationItems: params.documentationItems,
    availableTokens: params.availableTokens
  };
}
