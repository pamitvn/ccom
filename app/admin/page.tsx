import { getAppConfig } from '../../lib/config';
import { isAdminAuthenticated } from '../../lib/auth';
import { logoutAction } from './actions';
import ProductForm from './product-form';
import StoreForm from './store-form';
import PasswordForm from './password-form';

export default async function AdminPage() {
  const authed = await isAdminAuthenticated();
  if (!authed) {
    return null;
  }

  const config = await getAppConfig();

  const storeDefaults = {
    name: config.store.name,
    tagline: config.store.tagline,
    hotline: config.store.contact.hotline,
    email: config.store.contact.email,
    address: config.store.contact.address,
    productLinks: config.store.productLinks,
    supportLinks: config.store.supportLinks,
    legal: config.store.legal,
  };

  const productDefaults = {
    colors: config.product.colors,
    specifications: config.product.specifications,
    features: config.product.features,
    benefits: config.product.benefits,
  };

  return (
    <div className="space-y-10">
      <div className="flex flex-col gap-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-slate-900">Bảng điều khiển cửa hàng</h1>
          <p className="mt-1 text-sm text-slate-500">
            Cập nhật nhanh nội dung hiển thị ở trang chủ và trang sản phẩm. Thay đổi sẽ áp dụng ngay sau khi lưu.
          </p>
        </div>
        <form action={logoutAction}>
          <button
            type="submit"
            className="rounded-lg border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-600 transition hover:border-slate-300 hover:text-slate-800"
          >
            Đăng xuất
          </button>
        </form>
      </div>

      <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-lg font-semibold text-slate-900">Thông tin cửa hàng</h2>
        <p className="mt-1 text-sm text-slate-500">
          Cập nhật tên thương hiệu, thông tin liên lạc và các liên kết hiển thị ở phần đầu và cuối trang.
        </p>
        <div className="mt-6">
          <StoreForm defaults={storeDefaults} />
        </div>
      </section>

      <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-lg font-semibold text-slate-900">Nội dung sản phẩm</h2>
        <p className="mt-1 text-sm text-slate-500">
          Sửa danh sách màu sắc, thông số kỹ thuật và tính năng nổi bật của sản phẩm.
        </p>
        <div className="mt-6">
          <ProductForm defaults={productDefaults} />
        </div>
      </section>

      <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-lg font-semibold text-slate-900">Bảo mật quản trị</h2>
        <p className="mt-1 text-sm text-slate-500">
          Đổi mật khẩu truy cập bảng điều khiển. Sau khi cập nhật, mật khẩu mới sẽ áp dụng ngay.
        </p>
        <div className="mt-6">
          <PasswordForm />
        </div>
      </section>
    </div>
  );
}
