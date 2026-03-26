export function extractDemoScript(html: string): string | null {
  // Extract the first <script type="module">...</script> block.
  const re = new RegExp(
    String.raw`<script\s+[^>]*type=(\"|')module\1[^>]*>([\s\S]*?)<\/script>`,
    "i",
  );
  const m = html.match(re);
  if (!m) return null;
  // Replace tabs with 2 spaces to keep indentation consistent in rendered code blocks.
  let script = m[2].replace(/\t/g, "  ");
  // Keep indentation of the first line. Only trim blank lines around the block.
  script = script.replace(/^\s*\n+/, "");
  script = script.replace(/\n+\s*$/, "\n");
  return script;
}

