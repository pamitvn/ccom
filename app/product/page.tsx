import type { Metadata } from 'next';
import { getProductConfig, getStoreConfig } from '../../lib/config';
import ProductDetailClient from './ProductDetailClient';

export const metadata: Metadata = {
  title: 'Máy xử lý rác thải CCoM | Sản phẩm',
  description: 'Khám phá chi tiết sản phẩm CCoM giúp xử lý rác thải tại nhà an toàn và tiện lợi.',
};

export default async function ProductPage() {
  const [product, store] = await Promise.all([getProductConfig(), getStoreConfig()]);
  return (
    <ProductDetailClient
      product={product}
      zaloLink={store.contact.zaloLink}
      hotline={store.contact.hotline}
    />
  );
}
