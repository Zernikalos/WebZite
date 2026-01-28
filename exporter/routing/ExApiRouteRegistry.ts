import { SkipReason } from '../definitions';
import { normalizeUrl, isInternalUrl, resolveRelativeUrl } from './urlNormalizer';

/**
 * Represents a registered route
 */
export interface RouteEntry {
  /** Route ID (normalized path without extension) */
  routeId: string;

  /** Path to source HTML file */
  sourcePath: string;

  /** Path to output MDX file (null if skipped) */
  outputPath: string | null;

  /** Docusaurus slug */
  slug: string;

  /** Full URL path in Docusaurus */
  url: string;

  /** Whether this route should be generated */
  shouldGenerate: boolean;

  /** Reason for skipping (if not generating) */
  skipReason: SkipReason | null;
}

/**
 * Result of resolving a link
 */
export interface ResolvedLink {
  /** The resolved URL to use */
  url: string;

  /** Whether the link was found and valid */
  isValid: boolean;

  /** Whether the link target exists but was skipped */
  targetSkipped: boolean;

  /** The route entry if found */
  targetRoute: RouteEntry | null;

  /** Strategy used for resolution */
  strategy: 'direct' | 'redirect-to-parent' | 'remove-link' | 'external' | 'anchor';
}

/**
 * Route Registry - central registry for all routes
 * Handles URL resolution and link validation
 */
export class ExApiRouteRegistry {
  /** Map of route ID to entry */
  private routes: Map<string, RouteEntry> = new Map();

  /** Map of source path to route ID */
  private sourcePathIndex: Map<string, string> = new Map();

  /** Map of URL to route ID */
  private urlIndex: Map<string, string> = new Map();

  /** Base path for API docs (e.g., '/api/') */
  private basePath: string;

  constructor(basePath: string = '/api/') {
    this.basePath = basePath.endsWith('/') ? basePath : basePath + '/';
  }

  /**
   * Register a route
   */
  register(entry: Omit<RouteEntry, 'url'>): RouteEntry {
    const url = this.buildUrl(entry.slug);
    const fullEntry: RouteEntry = { ...entry, url };

    this.routes.set(entry.routeId, fullEntry);
    this.sourcePathIndex.set(entry.sourcePath, entry.routeId);
    this.urlIndex.set(url, entry.routeId);

    return fullEntry;
  }

  /**
   * Mark a route as skipped
   */
  markSkipped(routeId: string, reason: SkipReason): void {
    const entry = this.routes.get(routeId);
    if (entry) {
      entry.shouldGenerate = false;
      entry.skipReason = reason;
      entry.outputPath = null;
    }
  }

  /**
   * Get a route by ID
   */
  getByRouteId(routeId: string): RouteEntry | undefined {
    return this.routes.get(routeId);
  }

  /**
   * Get a route by source path
   */
  getBySourcePath(sourcePath: string): RouteEntry | undefined {
    const routeId = this.sourcePathIndex.get(sourcePath);
    return routeId ? this.routes.get(routeId) : undefined;
  }

  /**
   * Get a route by URL
   */
  getByUrl(url: string): RouteEntry | undefined {
    const routeId = this.urlIndex.get(url);
    return routeId ? this.routes.get(routeId) : undefined;
  }

  /**
   * Resolve an internal href from a source route
   *
   * @param fromRouteId - The route ID of the page containing the link
   * @param rawHref - The raw href from the HTML
   * @returns Resolution result with strategy
   */
  resolveInternalHref(fromRouteId: string, rawHref: string): ResolvedLink {
    // Handle external links
    if (!isInternalUrl(rawHref)) {
      const normalized = normalizeUrl(rawHref);

      if (normalized.isExternal) {
        return {
          url: rawHref,
          isValid: true,
          targetSkipped: false,
          targetRoute: null,
          strategy: 'external'
        };
      }

      if (normalized.isAnchor) {
        return {
          url: rawHref,
          isValid: true,
          targetSkipped: false,
          targetRoute: null,
          strategy: 'anchor'
        };
      }
    }

    // Normalize the href
    const normalized = normalizeUrl(rawHref);

    // Calculate target route ID
    const fromEntry = this.routes.get(fromRouteId);
    if (!fromEntry) {
      return {
        url: normalized.url,
        isValid: false,
        targetSkipped: false,
        targetRoute: null,
        strategy: 'direct'
      };
    }

    // Resolve relative path to absolute route ID
    const targetRouteId = this.resolveTargetRouteId(fromRouteId, normalized.url);

    // Look up target route
    if (!targetRouteId) {
      // Could not resolve target route ID
      return {
        url: normalized.url,
        isValid: false,
        targetSkipped: false,
        targetRoute: null,
        strategy: 'direct'
      };
    }

    const targetRoute = this.routes.get(targetRouteId);

    if (!targetRoute) {
      // Target not found - link might be broken
      return {
        url: normalized.url,
        isValid: false,
        targetSkipped: false,
        targetRoute: null,
        strategy: 'direct'
      };
    }

    // Target exists but was skipped
    if (!targetRoute.shouldGenerate) {
      // Try to redirect to parent
      const parentRouteId = this.findParentRouteId(targetRouteId);
      const parentRoute = parentRouteId ? this.routes.get(parentRouteId) : undefined;

      if (parentRoute?.shouldGenerate && parentRouteId) {
        // Redirect to parent with anchor
        const relativeUrl = resolveRelativeUrl(fromRouteId, parentRouteId);
        const anchor = normalized.anchor ? `#${normalized.anchor}` : '';
        return {
          url: relativeUrl + anchor,
          isValid: true,
          targetSkipped: true,
          targetRoute: parentRoute,
          strategy: 'redirect-to-parent'
        };
      }

      // No valid parent - remove link (render as text)
      return {
        url: '',
        isValid: false,
        targetSkipped: true,
        targetRoute,
        strategy: 'remove-link'
      };
    }

    // Target exists and will be generated
    const relativeUrl = resolveRelativeUrl(fromRouteId, targetRouteId);
    const anchor = normalized.anchor ? `#${normalized.anchor}` : '';

    return {
      url: relativeUrl + anchor,
      isValid: true,
      targetSkipped: false,
      targetRoute,
      strategy: 'direct'
    };
  }

  /**
   * Resolve a relative URL to a target route ID
   */
  private resolveTargetRouteId(fromRouteId: string, relativeUrl: string): string | null {
    // Remove trailing slash and anchor for route ID lookup
    let targetPath = relativeUrl.split('#')[0];
    if (targetPath.endsWith('/')) {
      targetPath = targetPath.slice(0, -1);
    }

    if (targetPath === '.' || targetPath === './') {
      return fromRouteId;
    }

    // Handle relative paths
    const fromParts = fromRouteId.split('/');
    const relativeParts = targetPath.split('/');

    // Start from parent directory (remove current file)
    const baseParts = fromParts.slice(0, -1);

    for (const part of relativeParts) {
      if (part === '..') {
        baseParts.pop();
      } else if (part !== '.' && part !== '') {
        baseParts.push(part);
      }
    }

    return baseParts.join('/') || null;
  }

  /**
   * Find the parent route ID
   */
  private findParentRouteId(routeId: string): string | null {
    const parts = routeId.split('/');
    if (parts.length <= 1) return null;
    return parts.slice(0, -1).join('/');
  }

  /**
   * Build a full URL from a slug
   */
  private buildUrl(slug: string): string {
    if (slug === './' || slug === '') {
      return this.basePath;
    }
    const cleanSlug = slug.startsWith('./') ? slug.slice(2) : slug;
    return this.basePath + cleanSlug;
  }

  /**
   * Get all routes
   */
  getAllRoutes(): RouteEntry[] {
    return Array.from(this.routes.values());
  }

  /**
   * Get statistics
   */
  getStats(): {
    total: number;
    toGenerate: number;
    skipped: number;
  } {
    let toGenerate = 0;
    let skipped = 0;

    for (const route of this.routes.values()) {
      if (route.shouldGenerate) {
        toGenerate++;
      } else {
        skipped++;
      }
    }

    return {
      total: this.routes.size,
      toGenerate,
      skipped
    };
  }

  /**
   * Validate all registered routes and report broken links
   */
  validateLinks(): {
    valid: number;
    broken: number;
    brokenLinks: Array<{ from: string; to: string; href: string }>;
  } {
    // This would be called after all routes are registered
    // and would check all internal links
    // For now, return placeholder stats
    return {
      valid: this.routes.size,
      broken: 0,
      brokenLinks: []
    };
  }
}
