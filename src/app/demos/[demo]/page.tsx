import { notFound } from "next/navigation";
import { DocsBody, DocsDescription, DocsPage, DocsTitle } from "fumadocs-ui/layouts/docs/page";
import { getDemoById } from "@/lib/demos";
import { normalizeBasePath } from "@/lib/normalizeBasePath";
import fs from "node:fs/promises";
import path from "node:path";
import DemoTabs from "./DemoTabs";
import { extractDemoScript } from "./extractDemoScript";
import CodeBlock from "@/components/CodeBlock";

export const dynamicParams = false;

export async function generateStaticParams() {
  return [
    { demo: "fox" },
    { demo: "soldier" },
    { demo: "stormtrooper" },
  ];
}

function buildDemoUrl(htmlPath: string): string {
  // Ensure it works under GitHub Pages basePath.
  const base = normalizeBasePath(process.env.NEXT_PUBLIC_BASE_PATH);
  return `${base}${htmlPath}`;
}

export default function Page(props: { params: Promise<{ demo: string }> }) {
  // Next 16 passes params as a Promise in some configurations in this codebase.
  // eslint-disable-next-line @typescript-eslint/no-floating-promises
  return (
    // @ts-ignore
    <AsyncDemoPage params={props.params} />
  );
}

async function AsyncDemoPage({ params }: { params: Promise<{ demo: string }> }) {
  const p = await params;
  const demo = getDemoById(p.demo);
  if (!demo) notFound();

  const src = buildDemoUrl(demo.htmlPath);

  const publicHtmlPath = path.join(process.cwd(), "public", demo.htmlPath.replace(/^\//, ""));
  const scriptCode = await (async () => {
    try {
      const html = await fs.readFile(publicHtmlPath, "utf-8");
      return extractDemoScript(html) ?? `// No <script type=\"module\"> block found in ${publicHtmlPath}\n`;
    } catch (e) {
      return `// Could not read demo HTML at ${publicHtmlPath}\n`;
    }
  })();

  return (
    <DocsPage full>
      <DocsTitle>{demo.title}</DocsTitle>
      <DocsDescription>{demo.description}</DocsDescription>
      <DocsBody>
        <DemoTabs title={demo.title} iframeSrc={src}>
          <CodeBlock language="javascript" code={scriptCode} />
        </DemoTabs>
      </DocsBody>
    </DocsPage>
  );
}

