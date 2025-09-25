import type { Metadata } from 'next';

const DEPLOYMENT_ENV = (process.env.NEXT_PUBLIC_SITE_ENV ?? process.env.VERCEL_ENV ?? process.env.NODE_ENV ?? 'development').toLowerCase();

const DEFAULT_PRODUCTION_URL = 'https://cco-m.vn';
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? process.env.SITE_URL ?? (DEPLOYMENT_ENV === 'production' ? DEFAULT_PRODUCTION_URL : 'http://localhost:3000');

const LOCALE_PATHS: Record<string, string> = {
  'vi-VN': '',
};

const NOINDEX_ENVS = new Set(['development', 'preview', 'staging', 'test']);
const NOINDEX_QUERY_KEYS = new Set(['page', 'sort', 'filter', 'tag']);

type OpenGraphImage = {
  url: string;
  width: number;
  height: number;
  alt?: string;
  type?: string;
};

export type SearchParamValue = string | string[] | undefined;
export type SearchParams = Record<string, SearchParamValue> | undefined;

function normalisePath(path?: string) {
  if (!path || path === '/') {
    return '/';
  }
  return path.startsWith('/') ? path : `/${path}`;
}

export function getSiteUrl() {
  return SITE_URL.replace(/\/$/, '');
}

export function getMetadataBase() {
  return new URL(getSiteUrl());
}

export function getCanonicalUrl(path?: string) {
  const url = new URL(normalisePath(path), getMetadataBase());
  return url.toString();
}

export function getAlternateLanguages(path?: string) {
  const base = getMetadataBase();
  const pathname = normalisePath(path);
  return Object.fromEntries(
    Object.entries(LOCALE_PATHS).map(([locale, localePrefix]) => {
      const href = new URL(pathname, base);
      if (localePrefix) {
        href.pathname = `/${localePrefix.replace(/^\//, '')}${pathname}`.replace(/\/{2,}/g, '/');
      }
      return [locale, href.toString()];
    }),
  );
}

export function isIndexableEnvironment() {
  return !NOINDEX_ENVS.has(DEPLOYMENT_ENV);
}

export function shouldNoIndexSearchParams(searchParams: SearchParams) {
  if (!searchParams) {
    return false;
  }

  for (const key of Object.keys(searchParams)) {
    if (!NOINDEX_QUERY_KEYS.has(key)) {
      continue;
    }
    const value = searchParams[key];
    if (Array.isArray(value)) {
      if (value.some((item) => typeof item === 'string' && item.trim().length > 0)) {
        return true;
      }
      continue;
    }
    if (typeof value === 'string' && value.trim().length > 0 && !(key === 'page' && value.trim() === '1')) {
      return true;
    }
  }

  return false;
}

export function getRobotsMeta(searchParams?: SearchParams): Metadata['robots'] {
  const shouldBlock = !isIndexableEnvironment() || shouldNoIndexSearchParams(searchParams);
  return shouldBlock
    ? {
        index: false,
        follow: false,
      }
    : {
        index: true,
        follow: true,
      };
}

export function getOpenGraphImages(title: string, description?: string, path?: string): OpenGraphImage[] {
  const url = new URL('/og', getMetadataBase());
  url.searchParams.set('title', title);
  if (description) {
    url.searchParams.set('description', description);
  }
  if (path) {
    url.searchParams.set('path', normalisePath(path));
  }
  return [
    {
      url: url.toString(),
      width: 1200,
      height: 630,
      alt: title,
      type: 'image/png',
    },
  ];
}

export function createPageMetadata(
  {
    title,
    description,
    path = '/',
    keywords = [],
    searchParams,
  }: {
    title: string;
    description: string;
    path?: string;
    keywords?: string[];
    searchParams?: SearchParams;
  },
): Metadata {
  const canonical = getCanonicalUrl(path);
  const isIndexable = getRobotsMeta(searchParams);

  return {
    title,
    description,
    alternates: {
      canonical,
      languages: getAlternateLanguages(path),
    },
    keywords,
    openGraph: {
      title,
      description,
      url: canonical,
      siteName: 'CCoM',
      locale: 'vi_VN',
      type: 'website',
      images: getOpenGraphImages(title, description, path),
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: getOpenGraphImages(title, description, path).map((image) => image.url),
    },
    robots: isIndexable,
  };
}
