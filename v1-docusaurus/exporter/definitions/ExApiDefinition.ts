import { PageType } from './enums';
import { ExApiDocItem } from './ExApiDocItem';
import { ExApiBreadcrumb } from './ExApiBreadcrumb';

/**
 * Base interface for all API page definitions
 * Each page type (Library, Package, Class, Member) extends this
 */
export interface ExApiDefinition {
  /** Type of page (library, package, classlike, member) */
  readonly pageType: PageType;

  /** Path to the source HTML file */
  readonly sourcePath: string;

  /** Page title (display name) */
  readonly title: string;

  /** Main name from breadcrumbs (e.g., "ZKO", "loadScene") */
  readonly mainName: string;

  /** Namespace built from breadcrumbs (e.g., "zernikalos.loader") */
  readonly namespace: string;

  /** Breadcrumb trail for navigation */
  readonly breadcrumbs: ExApiBreadcrumb[];

  /** Documentation items contained in this page */
  readonly documentationItems: ExApiDocItem[];

  /** Available tokens/sourcesets (e.g., "Kotlin", "Java") */
  readonly availableTokens: string[];
}

/**
 * Type guard to check if a definition is of a specific page type
 */
export function isPageType<T extends ExApiDefinition>(
  def: ExApiDefinition,
  pageType: PageType
): def is T {
  return def.pageType === pageType;
}
