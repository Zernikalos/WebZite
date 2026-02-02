import type { Metadata } from 'next';
import { RootProvider } from 'fumadocs-ui/provider/next';
import './global.css';
import { Inter } from 'next/font/google';

const inter = Inter({
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: {
    default: 'Zernikalos - The Kotlin 3D Engine',
    template: '%s | Zernikalos',
  },
  description:
    'Zernikalos Engine is a Kotlin 3D engine for building multiplatform graphics apps on JVM, Android, iOS, and Web.',
  metadataBase: new URL('https://zernikalos.dev'),
  openGraph: {
    type: 'website',
    siteName: 'Zernikalos Engine',
    title: 'Zernikalos - The Kotlin 3D Engine',
    description:
      'A Kotlin 3D engine for multiplatform graphics and interactive applications.',
  },
};

export default function Layout({ children }: LayoutProps<'/'>) {
  return (
    <html lang="en" className={inter.className} suppressHydrationWarning>
      <body className="flex flex-col min-h-screen">
        <RootProvider>{children}</RootProvider>
      </body>
    </html>
  );
}
