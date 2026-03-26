import { DocsLayout } from "fumadocs-ui/layouts/docs";
import { baseOptions } from "@/lib/layout.shared";
import { getDemosNavigationTree } from "./demosTools";

export default function Layout({ children }: { children: React.ReactNode }) {
  const tree = getDemosNavigationTree();

  return (
    <DocsLayout tree={tree} {...baseOptions()}>
      {children}
    </DocsLayout>
  );
}

