import Link from "next/link";
import { DEMOS } from "@/lib/demos";
import { DocsBody, DocsDescription, DocsPage, DocsTitle } from "fumadocs-ui/layouts/docs/page";

export default function Page() {
  const byGroup = DEMOS.reduce<Record<string, typeof DEMOS>>((acc, d) => {
    (acc[d.group] ??= []).push(d);
    return acc;
  }, {});

  return (
    <DocsPage>
      <DocsTitle>Demos</DocsTitle>
      <DocsDescription>Small, focused examples used across the documentation.</DocsDescription>
      <DocsBody>
        <div className="space-y-6">
          {Object.entries(byGroup).map(([group, demos]) => (
            <section key={group}>
              <h2 className="text-lg font-semibold">{group}</h2>
              <ul className="mt-2 space-y-2">
                {demos.map((d) => (
                  <li key={d.id}>
                    <Link href={`/demos/${d.id}/`} className="underline">
                      {d.title}
                    </Link>
                    <div className="text-sm opacity-80">{d.description}</div>
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>
      </DocsBody>
    </DocsPage>
  );
}

