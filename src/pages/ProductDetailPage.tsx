import { useState } from 'react';
import { ArrowRight, Award, Check, Heart, ShoppingCart, Share2, Shield, Star } from 'lucide-react';
import { Link } from 'react-router-dom';
import {
  productBenefits,
  productColors,
  productFeatures,
  productSpecifications,
} from '../config/product';

function ProductDetailPage() {
  const [selectedColor, setSelectedColor] = useState<string>(productColors[0].id);

  const activeColor =
    productColors.find((option) => option.id === selectedColor) ?? productColors[0];

  return (
    <main className="bg-gray-50">
      {/* Breadcrumb */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <Link to="/" className="hover:text-green-600">
              Trang chủ
            </Link>
            <span>/</span>
            <Link to="/product" className="hover:text-green-600">
              Sản phẩm
            </Link>
            <span>/</span>
            <span className="text-gray-900">Máy xử lý rác thải CCoM</span>
          </div>
        </div>
      </div>

      {/* Product Detail */}
      <section className="container mx-auto px-4 py-12">
        <div className="grid gap-12 lg:grid-cols-2">
          {/* Product Images */}
          <div className="space-y-6">
            <div className="rounded-3xl bg-white p-8 shadow-lg">
              <div className="relative mx-auto aspect-square w-full max-w-[420px]">
                <img
                  src={activeColor.image}
                  alt="Máy xử lý rác thải CCoM"
                  className="h-full w-full object-contain"
                />
              </div>
            </div>

            {/* Color Selection */}
            <div className="flex justify-center space-x-4">
              {productColors.map((color) => (
                <button
                  key={color.id}
                  type="button"
                  onClick={() => setSelectedColor(color.id)}
                  className={`h-16 w-16 rounded-xl transition-all hover:scale-105 ${color.swatchClasses} ${
                    selectedColor === color.id ? 'ring-4 ring-green-500 ring-offset-2' : ''
                  }`}
                  aria-label={`Chọn màu ${color.name}`}
                />
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-8">
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <div className="flex space-x-1">
                  {[...Array(5)].map((_, index) => (
                    <Star key={index} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <span className="text-gray-600">(1,247 đánh giá)</span>
                <Award className="h-5 w-5 text-green-600" />
                <span className="font-medium text-green-600">Bán chạy nhất</span>
              </div>

              <h1 className="text-3xl font-bold text-gray-900">Máy xử lý rác thải CCoM</h1>
              <p className="text-lg text-gray-600">Giải pháp xử lý rác thải tại nhà an toàn &amp; tiện lợi</p>

              <div className="flex items-center space-x-4">
                <span className="text-3xl font-bold text-green-600">4.990.000₫</span>
                <span className="text-xl text-gray-400 line-through">5.990.000₫</span>
                <span className="rounded-full bg-red-100 px-3 py-1 text-sm font-semibold text-red-600">
                  Giảm 17%
                </span>
              </div>
            </div>

            {/* Product Description */}
            <div className="rounded-xl bg-green-50 p-6">
              <h3 className="mb-3 text-lg font-semibold text-gray-900">Mô tả sản phẩm</h3>
              <p className="leading-relaxed text-gray-700">
                Máy xử lý rác thải CCoM giúp <strong>biến rác nhà bếp thành phân bón hữu cơ chỉ trong vài giờ</strong>.
                Thiết kế nhỏ gọn, hiện đại, phù hợp cho mọi gia đình, đặc biệt dễ vận hành chỉ với một nút bấm.
              </p>
            </div>

            {/* Color Selection */}
            <div className="space-y-6">
              <div>
                <h4 className="mb-3 font-semibold text-gray-900">Màu sắc: {activeColor.name}</h4>
                <div className="flex space-x-3">
                  {productColors.map((color) => (
                    <button
                      key={color.id}
                      type="button"
                      onClick={() => setSelectedColor(color.id)}
                      className={`rounded-lg border-2 px-4 py-2 text-sm font-semibold transition-all ${
                        selectedColor === color.id
                          ? 'border-green-500 bg-green-50 text-green-700'
                          : 'border-gray-200 text-gray-600 hover:border-gray-300'
                      }`}
                    >
                      {color.name}
                    </button>
                  ))}
                </div>
              </div>

            </div>

            {/* Action Buttons */}
            <div className="space-y-4">
              <button
                type="button"
                className="flex w-full items-center justify-center space-x-2 rounded-xl bg-green-600 py-4 text-lg font-semibold text-white transition-all hover:scale-105 hover:bg-green-700"
              >
                <ShoppingCart className="h-6 w-6" />
                <span>Mua ngay - Giao hàng miễn phí</span>
              </button>

              <div className="grid gap-4 md:grid-cols-2">
                <button
                  type="button"
                  className="flex items-center justify-center space-x-2 rounded-xl border-2 border-green-600 py-3 font-semibold text-green-600 transition-all hover:bg-green-50"
                >
                  <Heart className="h-5 w-5" />
                  <span>Yêu thích</span>
                </button>
                <button
                  type="button"
                  className="flex items-center justify-center space-x-2 rounded-xl border-2 border-gray-300 py-3 font-semibold text-gray-600 transition-all hover:bg-gray-50"
                >
                  <Share2 className="h-5 w-5" />
                  <span>Chia sẻ</span>
                </button>
              </div>
            </div>

            {/* Guarantees */}
            <div className="rounded-xl bg-blue-50 p-4">
              <div className="grid grid-cols-3 gap-4 text-center">
                <div className="space-y-2">
                  <Shield className="mx-auto h-8 w-8 text-blue-600" />
                  <p className="text-sm font-medium text-blue-900">Bảo hành 2 năm</p>
                </div>
                <div className="space-y-2">
                  <ArrowRight className="mx-auto h-8 w-8 text-blue-600" />
                  <p className="text-sm font-medium text-blue-900">Giao hàng miễn phí</p>
                </div>
                <div className="space-y-2">
                  <Check className="mx-auto h-8 w-8 text-blue-600" />
                  <p className="text-sm font-medium text-blue-900">Đổi trả 30 ngày</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Detailed Information */}
        <div className="mt-16 rounded-3xl bg-white shadow-lg">
          {/* Specifications */}
          <div className="p-8">
            <h2 className="mb-8 text-2xl font-bold text-gray-900">Thông số kỹ thuật</h2>
            <div className="grid gap-6 md:grid-cols-2">
              {productSpecifications.map((spec) => (
                <div key={spec.label} className="flex items-center space-x-4 rounded-xl bg-gray-50 p-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
                    <spec.icon className="h-6 w-6 text-green-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">{spec.label}</h4>
                    <p className="text-gray-600">{spec.value}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Features */}
          <div className="bg-gray-50 p-8">
            <h2 className="mb-8 text-2xl font-bold text-gray-900">Tính năng nổi bật</h2>
            <div className="grid gap-6 md:grid-cols-2">
              {productFeatures.map((feature) => (
                <div key={feature.title} className="rounded-xl bg-white p-6 shadow-sm">
                  <div className="flex items-start space-x-4">
                    <div className="text-3xl">{feature.icon}</div>
                    <div>
                      <h4 className="mb-2 font-semibold text-gray-900">{feature.title}</h4>
                      <p className="text-gray-600">{feature.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Benefits */}
          <div className="p-8">
            <h2 className="mb-8 text-2xl font-bold text-gray-900">Lý do nên chọn CCoM</h2>
            <div className="grid gap-4 md:grid-cols-2">
              {productBenefits.map((benefit) => (
                <div key={benefit} className="flex items-center space-x-3">
                  <Check className="h-5 w-5 flex-shrink-0 text-green-600" />
                  <span className="text-gray-700">{benefit}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Final CTA */}
        <div className="mt-12 rounded-3xl bg-gradient-to-r from-green-600 to-green-700 p-8 text-center text-white">
          <h2 className="mb-4 text-3xl font-bold">Đặt hàng ngay hôm nay!</h2>
          <p className="mb-6 text-xl text-green-100">
            Trải nghiệm căn bếp sạch sẽ, không mùi hôi, và tận hưởng lợi ích từ phân bón hữu cơ tự nhiên!
          </p>
          <button
            type="button"
            className="mx-auto flex items-center justify-center space-x-2 rounded-xl bg-white px-8 py-4 text-lg font-semibold text-green-600 transition-all hover:scale-105 hover:bg-gray-100"
          >
            <ShoppingCart className="h-6 w-6" />
            <span>Mua ngay - Ưu đãi có hạn</span>
          </button>
        </div>
      </section>
    </main>
  );
}

export default ProductDetailPage;
