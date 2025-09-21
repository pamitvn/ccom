export type StoreContact = {
  hotline: string;
  email: string;
  address: string;
  zaloLink: string;
};

export type StoreLink = {
  label: string;
  href: string;
};

export type StoreConfig = {
  name: string;
  tagline: string;
  heroHighlights: string[];
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
  | 'home'
  | 'filter'
  | 'ruler'
  | 'scale'
  | 'shield';

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
  price: number;
  discountPercent: number;
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
    tagline: 'Máy tái chế rác hữu cơ CS 500W – Dung tích 4L',
    heroHighlights: [
      'Xử lý rác trong 2–3 giờ thành mùn hữu cơ khô.',
      'Giảm 80–90% thể tích rác, giữ bếp sạch thơm.',
      'Khử mùi than hoạt tính, không còn ruồi muỗi.',
    ],
    contact: {
      hotline: '0846989394',
      email: 'support@ccom.vn',
      address: '926/15 Khu Phố 55, Phường Thới An, TP.HCM, Việt Nam',
      zaloLink: 'https://zalo.me/0846989394',
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
    legal: '© 2024 CCoM.',
  },
  product: {
    price: 4_990_000,
    discountPercent: 17,
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
      { icon: 'power', label: 'Công suất', value: '500W mạnh mẽ, xử lý rác nhanh chóng' },
      { icon: 'droplets', label: 'Dung tích thùng chứa', value: '4L – đáp ứng nhu cầu gia đình 3–6 người' },
      { icon: 'filter', label: 'Công nghệ xử lý', value: 'Sấy nhiệt + Nghiền nát + Khử mùi than hoạt tính' },
      { icon: 'zap', label: 'Nguồn điện', value: '220V – 50Hz, an toàn cho gia đình' },
      { icon: 'ruler', label: 'Kích thước', value: '30 × 25 × 35 cm (tham khảo)' },
      { icon: 'scale', label: 'Trọng lượng', value: '7 – 8 kg' },
      { icon: 'shield', label: 'Chất liệu', value: 'Vỏ ABS + Inox chống gỉ, bền bỉ' },
    ],
    features: [
      {
        icon: '⚡',
        title: 'Công suất 500W mạnh mẽ',
        description: 'Nghiền nhỏ và sấy khô rác hữu cơ chỉ trong 2–3 giờ, giữ bếp sạch thơm.',
      },
      {
        icon: '🪣',
        title: 'Dung tích 4L tiện dụng',
        description: 'Phù hợp gia đình 3–6 người, xử lý rác thải nhà bếp hằng ngày.',
      },
      {
        icon: '🌀',
        title: '3 trong 1: Sấy – Nghiền – Khử mùi',
        description: 'Rác được nghiền nhỏ, sấy khô và khử mùi triệt để, không còn nhớp nháp.',
      },
      {
        icon: '⏱️',
        title: 'Thời gian xử lý nhanh',
        description: 'Chu trình tiêu chuẩn 2–3 giờ, tùy nhu cầu có thể sấy nhanh 10–15 phút/mẻ.',
      },
      {
        icon: '🔒',
        title: 'Thiết kế thông minh, an toàn',
        description: 'Khóa nắp tự động, chống rò điện, vỏ cách nhiệt, hạn chế bỏng.',
      },
      {
        icon: '🔇',
        title: 'Tiết kiệm điện năng & êm ái',
        description: 'Tiêu thụ điện thấp, vận hành êm không gây ồn lớn.',
      },
      {
        icon: '🧼',
        title: 'Vệ sinh cực dễ',
        description: 'Khay chứa và lưỡi nghiền tháo rời, vệ sinh nhanh chóng.',
      },
      {
        icon: '🌍',
        title: 'Sống xanh bền vững',
        description: 'Giảm 80–90% thể tích rác, tạo phân hữu cơ giàu dinh dưỡng cho cây.',
      },
    ],
    benefits: [
      'Bảo vệ sức khỏe: không còn vi khuẩn, ruồi muỗi phát sinh từ rác bếp.',
      'Tiết kiệm chi phí: chủ động nguồn phân hữu cơ sạch cho cây trồng.',
      'Bảo vệ môi trường: giảm rác thải chôn lấp và khí nhà kính.',
      'Lý tưởng cho gia đình chung cư, nhà phố muốn tiết kiệm diện tích chứa rác.',
      'Hoàn hảo cho người yêu trồng cây, làm vườn cần phân hữu cơ sạch.',
      'Phù hợp gia đình sống xanh, mong muốn căn bếp luôn sạch đẹp.',
    ],
  },
};
