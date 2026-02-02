import { ExApiDefinition } from './ExApiDefinition';
import { ExApiDocItem } from './ExApiDocItem';
import { ExApiBreadcrumb } from './ExApiBreadcrumb';
import { PageType } from './enums';

/**
 * Definition for a Library page (API root index)
 * Contains the list of all packages
 */
export interface ExApiLibraryDef extends ExApiDefinition {
  readonly pageType: PageType.LIBRARY;
}

/**
 * Creates a new Library page definition
 */
export function createLibraryDef(params: {
  sourcePath: string;
  documentationItems: ExApiDocItem[];
  availableTokens?: string[];
}): ExApiLibraryDef {
  return {
    pageType: PageType.LIBRARY,
    sourcePath: params.sourcePath,
    title: 'API Index',
    mainName: 'API Index',
    namespace: '',
    breadcrumbs: [],
    documentationItems: params.documentationItems,
    availableTokens: params.availableTokens ?? []
  };
}
