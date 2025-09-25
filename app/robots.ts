import type { MetadataRoute } from 'next';
import { getSiteUrl, isIndexableEnvironment } from '../lib/seo';

export default function robots(): MetadataRoute.Robots {
  const isIndexable = isIndexableEnvironment();
  const siteUrl = getSiteUrl();

  return {
    rules: [
      {
        userAgent: '*',
        allow: isIndexable ? '/' : '',
        disallow: isIndexable ? ['/admin'] : '/',
      },
    ],
    sitemap: [`${siteUrl}/sitemap.xml`],
    host: siteUrl,
  };
}
