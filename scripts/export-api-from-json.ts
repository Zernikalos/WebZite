import { Command } from 'commander';
import path from 'path';
import { ExportPipeline } from '../exporter/pipeline/ExportPipeline';

/**
 * Export JSON envelopes -> MDX.
 *
 * This regenerates docs without parsing HTML again.
 */
async function main(): Promise<void> {
  const program = new Command();

  program
    .name('export-api-from-json')
    .description('Generate MDX API docs from previously exported JSON envelopes')
    .argument('[json-path]', 'Path to JSON envelope directory or file', './tmp/jsonApiDocs')
    .option('-o, --output <output-path>', 'Output directory for MDX files', './docs/api')
    .option('--base-path <path>', 'Base path for API docs in Docusaurus', '/api/')
    .option('--dry-run', 'Preview changes without writing files', false)
    .option('-v, --verbose', 'Enable verbose output', false)
    .parse(process.argv);

  const options = program.opts();
  const jsonPath = program.args[0] || './tmp/jsonApiDocs';

  const pipeline = new ExportPipeline({
    // inputDir is unused in from-json mode, but required by options
    inputDir: path.resolve('./sourceDocs'),
    outputDir: path.resolve(options.output),
    basePath: options.basePath,
    dryRun: options.dryRun,
    verbose: options.verbose,
    emitJson: false,
    emitJsonOnly: false,
    jsonOutDir: path.resolve('./tmp/jsonApiDocs'),
    fromJsonPath: path.resolve(jsonPath)
  });

  const result = await pipeline.run();
  process.exit(result.success ? 0 : 1);
}

main().catch(err => {
  console.error('Fatal error:', err);
  process.exit(1);
});

