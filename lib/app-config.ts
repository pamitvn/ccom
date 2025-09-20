export type StoreContact = {
  hotline: string;
  email: string;
  address: string;
};

export type StoreLink = {
  label: string;
  href: string;
};

export type StoreConfig = {
  name: string;
  tagline: string;
  contact: StoreContact;
  productLinks: StoreLink[];
  supportLinks: StoreLink[];
  legal: string;
};

export type ProductColorOption = {
  id: string;
  name: string;
  swatchClasses: string;
  image: string;
};

export type SpecificationIconId =
  | 'palette'
  | 'package'
  | 'droplets'
  | 'zap'
  | 'power'
  | 'home';

export type ProductSpecification = {
  icon: SpecificationIconId;
  label: string;
  value: string;
};

export type ProductFeature = {
  icon: string;
  title: string;
  description: string;
};

export type ProductConfig = {
  colors: ProductColorOption[];
  specifications: ProductSpecification[];
  features: ProductFeature[];
  benefits: string[];
};

export type AppConfig = {
  store: StoreConfig;
  product: ProductConfig;
};

export const defaultAppConfig: AppConfig = {
  store: {
    name: 'CCoM',
    tagline: 'Giải pháp xử lý rác thải tại nhà thân thiện với môi trường',
    contact: {
      hotline: '1900-xxxx',
      email: 'support@ccom.vn',
      address: 'Hà Nội, Việt Nam',
    },
    productLinks: [
      { label: 'Máy xử lý rác CCoM', href: '/product' },
      { label: 'Phụ kiện', href: '/product' },
      { label: 'Bảo trì', href: '/product' },
    ],
    supportLinks: [
      { label: 'Hướng dẫn sử dụng', href: '/#how-it-works' },
      { label: 'FAQ', href: '/#faq' },
      { label: 'Liên hệ', href: '/#contact' },
    ],
    legal: '© 2024 CCoM. Tất cả quyền được bảo lưu.',
  },
  product: {
    colors: [
      { id: 'black', name: 'Đen', swatchClasses: 'bg-gray-900', image: '/product-black.jpg' },
      {
        id: 'white',
        name: 'Trắng',
        swatchClasses: 'bg-white border-2 border-gray-200',
        image: '/product-white.jpg',
      },
    ],
    specifications: [
      { icon: 'palette', label: 'Màu sắc', value: 'Trắng, Đen' },
      { icon: 'package', label: 'Kích thước', value: 'Nhỏ gọn, tối ưu không gian bếp' },
      { icon: 'droplets', label: 'Dung tích', value: '2 - 3 lít' },
      { icon: 'zap', label: 'Điện áp', value: '220V' },
      { icon: 'power', label: 'Công suất', value: '150W - 200W' },
      { icon: 'home', label: 'Vận hành', value: 'Tự động, chỉ cần một nút bấm' },
    ],
    features: [
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
    ],
    benefits: [
      'Dễ dùng – phù hợp cho mọi thành viên trong gia đình',
      'Thiết kế tinh tế, nhỏ gọn, sang trọng',
      'Thân thiện môi trường và bền vững',
      'Vận hành êm ái, không gây tiếng ồn',
      'Bảo hành chính hãng 2 năm',
      'Hỗ trợ kỹ thuật 24/7',
    ],
  },
};
