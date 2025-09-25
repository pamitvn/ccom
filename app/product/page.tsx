import type { Metadata } from 'next';
import Script from 'next/script';
import { getProductConfig, getStoreConfig } from '../../lib/config';
import { createPageMetadata, getCanonicalUrl, getSiteUrl } from '../../lib/seo';
import ProductDetailClient from './ProductDetailClient';

type PageSearchParams = Record<string, string | string[] | undefined>;

type PageProps = {
  searchParams?: Promise<PageSearchParams>;
};

export async function generateMetadata({ searchParams }: PageProps): Promise<Metadata> {
  const resolvedSearchParams = searchParams ? await searchParams : undefined;
  const store = await getStoreConfig();
  const title = 'Máy xử lý rác thải CCoM – Sản phẩm chính hãng';
  const description = `${store.name} cung cấp máy xử lý rác hữu cơ CS 500W, giảm 80–90% thể tích rác và tạo phân hữu cơ sạch.`;

  const metadata = createPageMetadata({
    title,
    description,
    path: '/product',
    keywords: [
      'máy xử lý rác CCoM',
      'ccom cs 500w',
      'máy ủ phân hữu cơ',
      'thiết bị xử lý rác nhà bếp',
    ],
    searchParams: resolvedSearchParams,
  });

  return {
    ...metadata,
    openGraph: {
      ...(metadata.openGraph ?? {}),
      url: getCanonicalUrl('/product'),
    },
  };
}

export default async function ProductPage() {
  const [product, store] = await Promise.all([getProductConfig(), getStoreConfig()]);
  const siteUrl = getSiteUrl();
  const canonical = getCanonicalUrl('/product');
  const productImages = product.colors.map((color) => `${siteUrl}${color.image}`);
  const discountedPrice = Math.round(product.price * (1 - product.discountPercent / 100))
    .toString();

  const offerJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Offer',
    '@id': `${canonical}#offer`,
    priceCurrency: 'VND',
    price: discountedPrice,
    priceSpecification: {
      '@type': 'UnitPriceSpecification',
      priceCurrency: 'VND',
      price: discountedPrice,
      referenceQuantity: {
        '@type': 'QuantitativeValue',
        value: 1,
        unitCode: 'EA',
      },
    },
    availability: 'https://schema.org/InStock',
    itemCondition: 'https://schema.org/NewCondition',
    url: canonical,
    itemOffered: {
      '@id': `${canonical}#product`,
    },
    seller: {
      '@type': 'Organization',
      name: store.name,
      telephone: store.contact.hotline,
      email: store.contact.email,
    },
  } as const;

  const productJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    '@id': `${canonical}#product`,
    name: 'Máy xử lý rác hữu cơ CCoM CS 500W',
    image: productImages,
    description:
      'Máy tái chế rác hữu cơ CS 500W của CCoM sấy khô, nghiền nhỏ và khử mùi triệt để, tạo phân hữu cơ sạch cho gia đình.',
    sku: 'CCOM-CS-500W',
    brand: {
      '@type': 'Brand',
      name: store.name,
    },
    offers: {
      '@id': `${canonical}#offer`,
    },
    productionDate: '2024',
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
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Sản phẩm',
        item: canonical,
      },
    ],
  } as const;

  return (
    <>
      <ProductDetailClient
        product={product}
        zaloLink={store.contact.zaloLink}
        hotline={store.contact.hotline}
      />
      <Script id="ld-json-product" type="application/ld+json" strategy="beforeInteractive">
        {JSON.stringify(productJsonLd)}
      </Script>
      <Script id="ld-json-product-offer" type="application/ld+json" strategy="beforeInteractive">
        {JSON.stringify(offerJsonLd)}
      </Script>
      <Script id="ld-json-product-breadcrumbs" type="application/ld+json" strategy="beforeInteractive">
        {JSON.stringify(breadcrumbJsonLd)}
      </Script>
    </>
  );
}
