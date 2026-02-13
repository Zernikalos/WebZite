import { DocsLayout } from 'fumadocs-ui/layouts/docs';
import { baseOptions } from '@/lib/layout.shared';
import { getApiNavigationTree } from './apiTools';
import './api.css';

export default async function Layout({ children }: { children: React.ReactNode }) {
  const tree = await getApiNavigationTree();

  return (
    <DocsLayout 
      tree={tree} 
      {...baseOptions()}
    >
      {children}
    </DocsLayout>
  );
}
