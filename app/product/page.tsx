import type { Metadata } from 'next';
import ProductDetailClient from './ProductDetailClient';

export const metadata: Metadata = {
  title: 'Máy xử lý rác thải CCoM | Sản phẩm',
  description: 'Khám phá chi tiết sản phẩm CCoM giúp xử lý rác thải tại nhà an toàn và tiện lợi.',
};

export default function ProductPage() {
  return <ProductDetailClient />;
}
