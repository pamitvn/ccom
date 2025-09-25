const deploymentEnv = (process.env.NEXT_PUBLIC_SITE_ENV ?? process.env.VERCEL_ENV ?? process.env.NODE_ENV ?? 'development').toLowerCase();
const defaultProductionUrl = 'https://cco-m.vn';
const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL ?? process.env.SITE_URL ?? (deploymentEnv === 'production' ? defaultProductionUrl : 'http://localhost:3000')).replace(/\/$/, '');
const noindexEnvs = new Set(['development', 'preview', 'staging', 'test']);
const isIndexable = !noindexEnvs.has(deploymentEnv);

const locales = [
  { hreflang: 'vi-VN', href: `${siteUrl}/` },
  { hreflang: 'x-default', href: `${siteUrl}/` },
];

/** @type {import('next-sitemap').IConfig} */
const config = {
  siteUrl,
  changefreq: 'weekly',
  priority: 0.7,
  sitemapBaseFileName: 'sitemap',
  generateRobotsTxt: true,
  generateIndexSitemap: false,
  autoLastmod: true,
  exclude: ['/admin', '/admin/*'],
  additionalPaths: async () => {
    const now = new Date().toISOString();
    return [
      {
        loc: `${siteUrl}/product`,
        changefreq: 'weekly',
        priority: 0.8,
        lastmod: now,
        alternateRefs: locales.map((locale) => ({
          hreflang: locale.hreflang,
          href: `${locale.href}product`,
        })),
      },
    ];
  },
  transform: async (_config, path) => {
    if (path.startsWith('/admin')) {
      return null;
    }

    const alternateRefs = locales.map((locale) => ({
      href: path === '/' ? locale.href : `${locale.href}${path.startsWith('/') ? path.slice(1) : path}`,
      hreflang: locale.hreflang,
    }));

    return {
      loc: `${siteUrl}${path}`,
      changefreq: path === '/' ? 'daily' : 'weekly',
      priority: path === '/' ? 1.0 : 0.7,
      lastmod: new Date().toISOString(),
      alternateRefs,
    };
  },
  robotsTxtOptions: {
    policies: isIndexable
      ? [
          {
            userAgent: '*',
            allow: '/',
          },
        ]
      : [
          {
            userAgent: '*',
            disallow: '/',
          },
        ],
    additionalSitemaps: [`${siteUrl}/sitemap.xml`],
  },
};

export default config;
