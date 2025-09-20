import type { Metadata } from 'next';
import { getProductConfig } from '../../lib/config';
import ProductDetailClient from './ProductDetailClient';

export const metadata: Metadata = {
  title: 'Máy xử lý rác thải CCoM | Sản phẩm',
  description: 'Khám phá chi tiết sản phẩm CCoM giúp xử lý rác thải tại nhà an toàn và tiện lợi.',
};

export default async function ProductPage() {
  const product = await getProductConfig();
  return <ProductDetailClient product={product} />;
}
