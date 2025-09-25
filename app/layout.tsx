import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import Script from 'next/script';
import { Inter } from 'next/font/google';
import Footer from '../components/Footer';
import Header from '../components/Header';
import { getStoreConfig } from '../lib/config';
import {
  getAlternateLanguages,
  getCanonicalUrl,
  getMetadataBase,
  getOpenGraphImages,
  getRobotsMeta,
  getSiteUrl,
} from '../lib/seo';
import './globals.css';

const inter = Inter({ subsets: ['latin'], display: 'swap', variable: '--font-sans' });

const defaultTitle = 'CCoM | Giải pháp xử lý rác tại nhà';
const defaultDescription = 'Biến rác thải nhà bếp thành phân bón hữu cơ cùng thiết bị thông minh CCoM.';

export const metadata: Metadata = {
  metadataBase: getMetadataBase(),
  title: {
    default: defaultTitle,
    template: '%s | CCoM',
  },
  description: defaultDescription,
  applicationName: 'CCoM',
  keywords: [
    'máy xử lý rác hữu cơ',
    'máy xử lý rác nhà bếp',
    'máy ủ phân hữu cơ',
    'thiết bị tái chế rác',
    'ccom',
  ],
  authors: [{ name: 'CCoM' }],
  creator: 'CCoM',
  publisher: 'CCoM',
  alternates: {
    canonical: getCanonicalUrl('/'),
    languages: getAlternateLanguages('/'),
  },
  openGraph: {
    title: defaultTitle,
    description: defaultDescription,
    url: getCanonicalUrl('/'),
    siteName: 'CCoM',
    locale: 'vi_VN',
    type: 'website',
    images: getOpenGraphImages(defaultTitle, defaultDescription, '/'),
  },
  twitter: {
    card: 'summary_large_image',
    title: defaultTitle,
    description: defaultDescription,
    images: getOpenGraphImages(defaultTitle, defaultDescription, '/')?.map((image) => image.url) ?? [],
  },
  robots: getRobotsMeta(),
  icons: {
    icon: [
      { url: '/favicon.svg', type: 'image/svg+xml' },
      { url: '/icon-32.png', sizes: '32x32', type: 'image/png' },
      { url: '/icon-192.png', sizes: '192x192', type: 'image/png' },
      { url: '/icon-512.png', sizes: '512x512', type: 'image/png' },
    ],
    apple: [{ url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' }],
    other: [
      { rel: 'mask-icon', url: '/safari-pinned-tab.svg', color: '#16a34a' },
    ],
  },
  manifest: '/site.webmanifest',
  category: 'Home & Garden',
};

export default async function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  const store = await getStoreConfig();
  const siteUrl = getSiteUrl();
  const organizationJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: store.name,
    url: siteUrl,
    logo: `${siteUrl}/icon-512.png`,
    contactPoint: [
      {
        '@type': 'ContactPoint',
        telephone: store.contact.hotline,
        contactType: 'customer service',
        email: store.contact.email,
        areaServed: 'VN',
        availableLanguage: ['Vietnamese'],
      },
    ],
    sameAs: [store.contact.zaloLink],
  } as const;

  const websiteJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: store.name,
    url: siteUrl,
    inLanguage: 'vi-VN',
  } as const;

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Trang chủ',
        item: siteUrl,
      },
    ],
  } as const;

  return (
    <html lang="vi" className={inter.variable}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        {/* eslint-disable-next-line @next/next/google-font-preconnect */}
        <link rel="dns-prefetch" href="https://fonts.gstatic.com" />
      </head>
      <body className={`${inter.className} flex min-h-screen flex-col bg-white text-gray-900`}>
        <Header />
        <main className="flex-1">
          {children}
        </main>
        <Footer />
        <Script id="ld-json-organization" type="application/ld+json" strategy="beforeInteractive">
          {JSON.stringify(organizationJsonLd)}
        </Script>
        <Script id="ld-json-website" type="application/ld+json" strategy="beforeInteractive">
          {JSON.stringify(websiteJsonLd)}
        </Script>
        <Script id="ld-json-breadcrumbs" type="application/ld+json" strategy="beforeInteractive">
          {JSON.stringify(breadcrumbJsonLd)}
        </Script>
      </body>
    </html>
  );
}
