#!/usr/bin/env node

/**
 * Exporter - Dokka HTML to MDX conversion tool
 *
 * This is the main entry point for the exporter CLI.
 */

import { main } from './cli';

// Export public API
export * from './definitions';
export * from './extractors';
export * from './parsers';
export * from './writers';
export * from './routing';
export * from './rules';
export * from './pipeline';
export * from './utils';

// Run CLI
main().catch(error => {
  console.error('Unhandled error:', error);
  process.exit(1);
});
