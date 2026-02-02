import { Command } from 'commander';
import path from 'path';
import { ExportPipeline } from '../exporter/pipeline/ExportPipeline';

/**
 * Two-step export:
 * 1) HTML -> JSON envelopes (tmp/jsonApiDocs)
 * 2) JSON envelopes -> MDX (output dir)
 */
async function main(): Promise<void> {
  const program = new Command();

  program
    .name('export-api-both')
    .description('Export Dokka HTML API docs to JSON and then generate MDX from JSON')
    .argument('[input-path]', 'Path to input directory', './sourceDocs')
    .option('-o, --output <output-path>', 'Output directory for MDX files', './docs/api')
    .option('--json-out <path>', 'Directory where JSON envelopes will be written', './tmp/jsonApiDocs')
    .option('--base-path <path>', 'Base path for API docs in Docusaurus', '/api/')
    .option('--dry-run', 'Preview changes without writing files', false)
    .option('-v, --verbose', 'Enable verbose output', false)
    .parse(process.argv);

  const options = program.opts();
  const inputPath = program.args[0] || './sourceDocs';
  const outputDir = path.resolve(options.output);
  const jsonOutDir = path.resolve(options.jsonOut);

  // Step 1: HTML -> JSON only
  const toJson = new ExportPipeline({
    inputDir: path.resolve(inputPath),
    outputDir,
    basePath: options.basePath,
    dryRun: options.dryRun,
    verbose: options.verbose,
    emitJson: true,
    emitJsonOnly: true,
    jsonOutDir,
    fromJsonPath: null
  });

  const jsonResult = await toJson.run();
  if (!jsonResult.success) {
    process.exit(1);
  }

  // Step 2: JSON -> MDX
  const fromJson = new ExportPipeline({
    inputDir: path.resolve(inputPath),
    outputDir,
    basePath: options.basePath,
    dryRun: options.dryRun,
    verbose: options.verbose,
    emitJson: false,
    emitJsonOnly: false,
    jsonOutDir,
    fromJsonPath: jsonOutDir
  });

  const mdxResult = await fromJson.run();
  process.exit(mdxResult.success ? 0 : 1);
}

main().catch(err => {
  console.error('Fatal error:', err);
  process.exit(1);
});

