import { DocsLayout } from 'fumadocs-ui/layouts/docs';
import { baseOptions } from '@/lib/layout.shared';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <DocsLayout 
      tree={{ name: 'API Reference', children: [] }} 
      {...baseOptions()}
    >
      {children}
    </DocsLayout>
  );
}
