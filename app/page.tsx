import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Check, DollarSign, Leaf, Recycle, Star } from 'lucide-react';

export default function HomePage() {
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section id="hero" className="bg-gradient-to-br from-green-50 to-blue-50 py-20">
        <div className="container mx-auto grid items-center gap-12 px-4 lg:grid-cols-2">
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="text-5xl font-bold leading-tight text-gray-900 lg:text-6xl">
                Giải pháp xử lý rác tại nhà -
                <span className="text-green-600"> An toàn &amp; Tiện lợi</span>
              </h1>
              <p className="text-xl text-gray-600">
                Biến rác thải nhà bếp thành phân bón hữu cơ chỉ trong vài giờ
              </p>
            </div>

            <div className="flex flex-col gap-4 sm:flex-row">
              <Link
                href="/product"
                className="flex items-center justify-center space-x-2 rounded-xl bg-green-600 px-8 py-4 text-lg font-semibold text-white transition-all hover:scale-105 hover:bg-green-700"
              >
                <span>Xem sản phẩm</span>
                <ArrowRight className="h-5 w-5" />
              </Link>
              <Link
                href="/#benefits"
                className="rounded-xl border border-green-600 px-8 py-4 text-center text-lg font-semibold text-green-600 transition-all hover:bg-green-50"
              >
                Tìm hiểu thêm
              </Link>
            </div>

            <div className="flex items-center space-x-4 text-sm text-gray-600">
              <div className="flex space-x-1">
                {[...Array(5)].map((_, index) => (
                  <Star key={index} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <span>Đánh giá 4.9/5 từ hơn 1,000 khách hàng</span>
            </div>
          </div>

          <div className="relative">
            <div className="rounded-3xl bg-white p-8 shadow-2xl">
              <Image
                src="/product-black.jpg"
                alt="Máy xử lý rác thải CCoM"
                width={720}
                height={720}
                priority
                className="h-auto w-full"
              />
            </div>
            <div className="absolute -right-4 -top-4 rounded-full bg-green-600 px-4 py-2 font-semibold text-white">
              Mới ra mắt!
            </div>
          </div>
        </div>
      </section>

      {/* Problem Section */}
      <section id="problems" className="bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-4xl space-y-8 text-center">
            <h2 className="text-3xl font-bold text-gray-900">Vấn đề bạn đang gặp phải?</h2>

            <div className="grid gap-8 md:grid-cols-3">
              <div className="rounded-2xl bg-white p-6 shadow-sm">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-red-100">
                  <div className="h-8 w-8 rounded-full bg-red-500" />
                </div>
                <h3 className="mb-2 font-semibold text-gray-900">Mùi hôi khó chịu</h3>
                <p className="text-gray-600">
                  Rác thải hữu cơ bốc mùi khó chịu trong nhà, ảnh hưởng đến chất lượng cuộc sống
                </p>
              </div>

              <div className="rounded-2xl bg-white p-6 shadow-sm">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-orange-100">
                  <DollarSign className="h-8 w-8 text-orange-500" />
                </div>
                <h3 className="mb-2 font-semibold text-gray-900">Chi phí cao</h3>
                <p className="text-gray-600">Mỗi tháng phải chi trả nhiều tiền cho việc thu gom và xử lý rác thải</p>
              </div>

              <div className="rounded-2xl bg-white p-6 shadow-sm">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gray-100">
                  <Leaf className="h-8 w-8 text-gray-500" />
                </div>
                <h3 className="mb-2 font-semibold text-gray-900">Không bền vững</h3>
                <p className="text-gray-600">
                  Chưa có giải pháp bền vững để bảo vệ môi trường và tái sử dụng rác hữu cơ
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section id="benefits" className="py-20">
        <div className="container mx-auto px-4">
          <div className="mb-16 space-y-4 text-center">
            <h2 className="text-4xl font-bold text-gray-900">CCoM - Giải pháp bạn cần</h2>
            <p className="mx-auto max-w-2xl text-xl text-gray-600">
              Nhỏ gọn, tiện lợi, dễ sử dụng - chỉ một nút bấm, máy tự động biến rác thành phân bón
            </p>
          </div>

          <div className="grid gap-8 lg:grid-cols-4">
            <div className="space-y-4 text-center">
              <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-green-100 transition-colors hover:bg-green-200">
                <Recycle className="h-10 w-10 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900">Giảm mùi hôi trong nhà</h3>
              <p className="text-gray-600">Khử hoàn toàn mùi hôi từ rác hữu cơ, mang lại không gian sống trong lành</p>
            </div>

            <div className="space-y-4 text-center">
              <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-blue-100 transition-colors hover:bg-blue-200">
                <DollarSign className="h-10 w-10 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900">Tiết kiệm chi phí xử lý rác</h3>
              <p className="text-gray-600">Giảm đến 70% chi phí thu gom rác hàng tháng cho gia đình</p>
            </div>

            <div className="space-y-4 text-center">
              <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-emerald-100 transition-colors hover:bg-emerald-200">
                <Leaf className="h-10 w-10 text-emerald-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900">Biến rác thành phân bón</h3>
              <p className="text-gray-600">Chuyển hóa rác hữu cơ thành phân bón giàu dinh dưỡng cho cây trồng</p>
            </div>

            <div className="space-y-4 text-center">
              <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-teal-100 transition-colors hover:bg-teal-200">
                <Check className="h-10 w-10 text-teal-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900">Bảo vệ môi trường</h3>
              <p className="text-gray-600">Góp phần giảm lượng rác thải ra môi trường, bảo vệ hành tinh xanh</p>
            </div>
          </div>
        </div>
      </section>

      {/* Product Showcase */}
      <section id="product-overview" className="bg-gray-50 py-20">
        <div className="container mx-auto grid items-center gap-16 px-4 lg:grid-cols-2">
          <div>
            <Image
              src="/product-white.jpg"
              alt="Máy CCoM màu trắng"
              width={720}
              height={720}
              className="h-auto w-full rounded-2xl shadow-2xl"
            />
          </div>

          <div className="space-y-8">
            <div className="space-y-4">
              <h2 className="text-4xl font-bold text-gray-900">
                Sản phẩm chính
                <span className="block text-green-600">CCoM</span>
              </h2>
              <p className="text-lg text-gray-600">
                Thiết kế hiện đại, công nghệ tiên tiến, phù hợp với mọi không gian nhà bếp
              </p>
            </div>

            <div className="space-y-4">
              <FeatureItem title="Kích thước: Nhỏ gọn, phù hợp mọi không gian" />
              <FeatureItem title="Dung tích: 2 - 3 lít" />
              <FeatureItem title="Điện áp: 220V - 240V" />
              <FeatureItem title="Công suất: 150W - 200W tiết kiệm điện" />
              <FeatureItem title="Kiểm soát mùi hoàn toàn" />
              <FeatureItem title="Vận hành chỉ với 1 nút nhấn" />
            </div>
          </div>
        </div>
      </section>

      {/* Call to action */}
      <section id="cta" className="bg-gradient-to-r from-green-600 to-emerald-600 py-20">
        <div className="container mx-auto flex flex-col items-center gap-6 px-4 text-center text-white">
          <h2 className="text-4xl font-bold">Sẵn sàng thay đổi cách bạn xử lý rác thải?</h2>
          <p className="max-w-2xl text-lg text-green-100">
            Đặt mua CCoM ngay hôm nay và trải nghiệm không gian sống sạch sẽ, thân thiện với môi trường.
          </p>
          <Link
            href="/product"
            className="rounded-xl bg-white px-8 py-4 text-lg font-semibold text-green-700 transition-all hover:scale-105"
          >
            Tìm hiểu sản phẩm
          </Link>
        </div>
      </section>
    </div>
  );
}

function FeatureItem({ title }: { title: string }) {
  return (
    <div className="flex items-start space-x-3">
      <Check className="mt-1 h-6 w-6 flex-shrink-0 text-green-600" />
      <h4 className="font-semibold text-gray-900">{title}</h4>
    </div>
  );
}
