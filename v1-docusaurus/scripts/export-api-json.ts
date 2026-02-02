import { Command } from 'commander';
import path from 'path';
import { ExportPipeline } from '../exporter/pipeline/ExportPipeline';

/**
 * Export Dokka HTML -> JSON envelopes only.
 *
 * This is intended for a two-step workflow:
 * 1) HTML -> JSON (this script)
 * 2) JSON -> MDX (scripts/export-api-from-json.ts)
 */
async function main(): Promise<void> {
  const program = new Command();

  program
    .name('export-api-json')
    .description('Export Dokka HTML API docs to JSON envelopes (no MDX output)')
    .argument('[input-path]', 'Path to input directory', './sourceDocs')
    .option('-o, --output <output-path>', 'Output directory used to compute outputRelativePath', './docs/api')
    .option('--json-out <path>', 'Directory where JSON envelopes will be written', './tmp/jsonApiDocs')
    .option('--base-path <path>', 'Base path for API docs in Docusaurus', '/api/')
    .option('--dry-run', 'Preview changes without writing files', false)
    .option('-v, --verbose', 'Enable verbose output', false)
    .parse(process.argv);

  const options = program.opts();
  const inputPath = program.args[0] || './sourceDocs';

  const pipeline = new ExportPipeline({
    inputDir: path.resolve(inputPath),
    outputDir: path.resolve(options.output),
    basePath: options.basePath,
    dryRun: options.dryRun,
    verbose: options.verbose,
    emitJson: true,
    emitJsonOnly: true,
    jsonOutDir: path.resolve(options.jsonOut),
    fromJsonPath: null
  });

  const result = await pipeline.run();
  process.exit(result.success ? 0 : 1);
}

main().catch(err => {
  console.error('Fatal error:', err);
  process.exit(1);
});

