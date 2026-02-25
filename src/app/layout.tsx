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
    'Zernikalos is a Kotlin 3D engine for Kotlin Multiplatform projects. Build graphics apps and interactive experiences for Android, iOS, JVM, and Web from one codebase.',
  metadataBase: new URL('https://zernikalos.dev'),
  applicationName: 'Zernikalos',
  keywords: [
    'Kotlin 3D engine',
    'Kotlin game engine',
    'Kotlin Multiplatform 3D',
    'KMP graphics engine',
    'WebGPU Kotlin',
    'Android iOS Web 3D engine',
    'multiplatform game development',
  ],
  authors: [{ name: 'Zernikalos' }],
  category: 'technology',
  alternates: {
    canonical: '/',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },
  openGraph: {
    type: 'website',
    siteName: 'Zernikalos Engine',
    title: 'Zernikalos - The Kotlin 3D Engine',
    description:
      'A Kotlin Multiplatform 3D engine for graphics apps on Android, iOS, JVM, and Web.',
    url: 'https://zernikalos.dev',
    images: [
      {
        url: '/zklogo.svg',
        alt: 'Zernikalos logo',
      },
    ],
  },
  twitter: {
    card: 'summary',
    title: 'Zernikalos - The Kotlin 3D Engine',
    description:
      'Build multiplatform 3D apps in Kotlin for Android, iOS, JVM, and Web.',
    images: ['/zklogo.svg'],
  },
  icons: {
    icon: '/zklogo.svg',
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
