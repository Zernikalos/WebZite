import path from 'path';
import type { ExApiDefinition } from '../definitions';

/**
 * JSON envelope written by the exporter when --emit-json is enabled.
 * This keeps enough metadata to regenerate MDX later without parsing HTML again.
 */
export interface ExApiJsonEnvelope {
  /** Envelope schema version */
  version: 1;

  /** Route id derived from source path */
  routeId: string;

  /** Docusaurus slug used when rendering this page */
  slug: string;

  /** Output path relative to outputDir (should end with .mdx) */
  outputRelativePath: string;

  /** The parsed page definition */
  definition: ExApiDefinition;
}

export function makeJsonEnvelope(params: {
  routeId: string;
  slug: string;
  outputPath: string;
  outputDir: string;
  definition: ExApiDefinition;
}): ExApiJsonEnvelope {
  return {
    version: 1,
    routeId: params.routeId,
    slug: params.slug,
    outputRelativePath: path.relative(params.outputDir, params.outputPath).replace(/\\/g, '/'),
    definition: params.definition
  };
}

