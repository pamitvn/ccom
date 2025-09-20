export type StoreContact = {
  hotline: string;
  email: string;
  address: string;
};

export type StoreLink = {
  label: string;
  href: string;
};

export const storeName = 'CCoM';

export const storeTagline =
  'Giải pháp xử lý rác thải tại nhà thân thiện với môi trường';

export const storeContact: StoreContact = {
  hotline: '1900-xxxx',
  email: 'support@ccom.vn',
  address: 'Hà Nội, Việt Nam',
};

export const storeProductLinks: StoreLink[] = [
  { label: 'Máy xử lý rác CCoM', href: '/product' },
  { label: 'Phụ kiện', href: '/product' },
  { label: 'Bảo trì', href: '/product' },
];

export const storeSupportLinks: StoreLink[] = [
  { label: 'Hướng dẫn sử dụng', href: '/#how-it-works' },
  { label: 'FAQ', href: '/#faq' },
  { label: 'Liên hệ', href: '/#contact' },
];

export const storeLegal = '© 2024 CCoM. Tất cả quyền được bảo lưu.';
