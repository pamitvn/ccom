import type { ComponentType } from 'react';
import { Droplets, Home, Package, Palette, Power, Zap } from 'lucide-react';

export type ProductColorOption = {
  id: string;
  name: string;
  swatchClasses: string;
  image: string;
};

export type ProductSpecification = {
  icon: ComponentType<{ className?: string }>;
  label: string;
  value: string;
};

export type ProductFeature = {
  icon: string;
  title: string;
  description: string;
};

export const productColors: ProductColorOption[] = [
  { id: 'black', name: 'Đen', swatchClasses: 'bg-gray-900', image: '/product-black.jpg' },
  { id: 'white', name: 'Trắng', swatchClasses: 'bg-white border-2 border-gray-200', image: '/product-white.jpg' },
];

export const productSpecifications: ProductSpecification[] = [
  { icon: Palette, label: 'Màu sắc', value: 'Trắng, Đen' },
  { icon: Package, label: 'Kích thước', value: 'Nhỏ gọn, tối ưu không gian bếp' },
  { icon: Droplets, label: 'Dung tích', value: '2 - 3 lít' },
  { icon: Zap, label: 'Điện áp', value: '220V' },
  { icon: Power, label: 'Công suất', value: '150W - 200W' },
  { icon: Home, label: 'Vận hành', value: 'Tự động, chỉ cần một nút bấm' },
];

export const productFeatures: ProductFeature[] = [
  {
    icon: '🌿',
    title: 'Giảm mùi hôi trong gian bếp',
    description: 'Công nghệ khử mùi tiên tiến, mang lại không gian sống trong lành',
  },
  {
    icon: '💡',
    title: 'Tiết kiệm chi phí xử lý rác',
    description: 'Giảm đến 70% chi phí thu gom rác hàng tháng cho gia đình',
  },
  {
    icon: '🌱',
    title: 'Biến rác hữu cơ thành phân bón',
    description: 'Chuyển hóa rác thải thành phân bón giàu dinh dưỡng cho cây trồng',
  },
  {
    icon: '🌍',
    title: 'Bảo vệ môi trường',
    description: 'Giảm lượng rác thải ra ngoài, góp phần bảo vệ hành tinh xanh',
  },
];

export const productBenefits: string[] = [
  'Dễ dùng – phù hợp cho mọi thành viên trong gia đình',
  'Thiết kế tinh tế, nhỏ gọn, sang trọng',
  'Thân thiện môi trường và bền vững',
  'Vận hành êm ái, không gây tiếng ồn',
  'Bảo hành chính hãng 2 năm',
  'Hỗ trợ kỹ thuật 24/7',
];
