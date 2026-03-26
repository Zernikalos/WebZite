import type * as PageTree from "fumadocs-core/page-tree";
import { DEMOS } from "@/lib/demos";

function slugify(value: string): string {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export function getDemosNavigationTree(): PageTree.Root {
  const byGroup = new Map<string, typeof DEMOS>();
  for (const d of DEMOS) {
    const list = byGroup.get(d.group) ?? [];
    list.push(d);
    byGroup.set(d.group, list);
  }

  const groupItems = Array.from(byGroup.entries())
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([group, demos]) => ({
      type: "folder",
      name: group,
      // Unique + stable URL prevents internal key/id collisions.
      url: `/demos/${slugify(group)}/`,
      children: demos
        .slice()
        .sort((a, b) => a.title.localeCompare(b.title))
        .map((d) => ({
          type: "page",
          name: d.title,
          url: `/demos/${d.id}/`,
        })),
      defaultOpen: true,
    }));

  return {
    name: "Demos",
    children: groupItems,
  } as PageTree.Root;
}

