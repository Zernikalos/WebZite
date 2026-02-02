/**
 * URL normalization utilities for converting Dokka URLs to Docusaurus format
 */

/**
 * Result of normalizing a URL
 */
export interface NormalizedUrl {
  /** The normalized URL */
  url: string;

  /** Whether the URL is external (http/https) */
  isExternal: boolean;

  /** Whether the URL is an anchor-only link */
  isAnchor: boolean;

  /** The anchor part if present (without #) */
  anchor: string | null;
}

/**
 * Normalize a Dokka href to Docusaurus format
 * - Removes .html extension
 * - Handles index files
 * - Ensures trailing slashes for directories
 * - Preserves anchors
 *
 * @param href - The original href from Dokka HTML
 * @returns Normalized URL result
 */
export function normalizeUrl(href: string): NormalizedUrl {
  // Handle empty or hash-only links
  if (!href || href === '#') {
    return {
      url: '#',
      isExternal: false,
      isAnchor: true,
      anchor: null
    };
  }

  // Handle external links
  if (/^https?:\/\//.test(href)) {
    return {
      url: href,
      isExternal: true,
      isAnchor: false,
      anchor: null
    };
  }

  // Handle anchor-only links
  if (href.startsWith('#')) {
    return {
      url: href,
      isExternal: false,
      isAnchor: true,
      anchor: href.slice(1)
    };
  }

  // Split URL and anchor
  let [path, anchor] = href.split('#');
  const hasAnchor = anchor !== undefined;

  // Remove .html extension
  path = path.replace(/\.html$/, '');

  // Handle index files
  if (path === 'index') {
    path = './';
  } else if (path.endsWith('/index')) {
    path = path.slice(0, -6) + '/';
  }

  // Ensure trailing slash for directory-style URLs (not for ./ and not if already has trailing slash)
  if (path !== './' && path !== '' && !path.endsWith('/') && !hasAnchor) {
    path += '/';
  }

  // Reconstruct URL with anchor if present
  const url = hasAnchor ? `${path}#${anchor}` : path;

  return {
    url,
    isExternal: false,
    isAnchor: false,
    anchor: anchor ?? null
  };
}

/**
 * Normalize a source path (from Dokka HTML) to a route ID
 * This creates a consistent identifier for routing
 *
 * @param sourcePath - Path to the source HTML file
 * @returns Normalized route ID
 */
export function sourcePathToRouteId(sourcePath: string): string {
  return sourcePath
    .replace(/\\/g, '/') // Normalize path separators
    .replace(/\.html$/, '') // Remove .html
    .replace(/\/index$/, ''); // Remove trailing /index
}

/**
 * Convert a route ID to a Docusaurus slug
 *
 * @param routeId - The route ID
 * @returns Docusaurus slug
 */
export function routeIdToSlug(routeId: string): string {
  if (!routeId || routeId === '') {
    return './';
  }

  // Ensure trailing slash
  if (!routeId.endsWith('/')) {
    return routeId + '/';
  }

  return routeId;
}

/**
 * Resolve a relative URL from one route to another
 *
 * @param fromRouteId - The source route ID
 * @param toRouteId - The target route ID
 * @returns Relative URL from source to target
 */
export function resolveRelativeUrl(fromRouteId: string, toRouteId: string): string {
  const fromParts = fromRouteId.split('/').filter(Boolean);
  const toParts = toRouteId.split('/').filter(Boolean);

  // Find common prefix
  let commonLength = 0;
  while (
    commonLength < fromParts.length &&
    commonLength < toParts.length &&
    fromParts[commonLength] === toParts[commonLength]
  ) {
    commonLength++;
  }

  // Calculate how many levels to go up
  const upLevels = fromParts.length - commonLength;

  // Build relative path
  const relativeParts: string[] = [];

  // Add ../ for each level up
  for (let i = 0; i < upLevels; i++) {
    relativeParts.push('..');
  }

  // Add remaining path to target
  for (let i = commonLength; i < toParts.length; i++) {
    relativeParts.push(toParts[i]);
  }

  // Join and ensure trailing slash
  let result = relativeParts.join('/');
  if (!result) {
    result = './';
  } else if (!result.endsWith('/')) {
    result += '/';
  }

  return result;
}

/**
 * Check if a URL points to an internal API page
 *
 * @param url - URL to check
 * @returns true if the URL is internal
 */
export function isInternalUrl(url: string): boolean {
  if (!url || url === '#') return false;
  if (/^https?:\/\//.test(url)) return false;
  if (url.startsWith('#')) return false;
  return true;
}
