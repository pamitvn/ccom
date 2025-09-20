import { ArrowRight, Check, DollarSign, Leaf, Recycle, Star } from 'lucide-react';
import { Link } from 'react-router-dom';

function HomePage() {
  return (
    <main className="bg-white">
      {/* Hero Section */}
      <section id="hero" className="bg-gradient-to-br from-green-50 to-blue-50 py-20">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                  Giải pháp xử lý rác tại nhà -
                  <span className="text-green-600"> An toàn & Tiện lợi</span>
                </h1>
                <p className="text-xl text-gray-600">
                  Biến rác thải nhà bếp thành phân bón hữu cơ chỉ trong vài giờ
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  to="/product"
                  className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all transform hover:scale-105 flex items-center justify-center space-x-2"
                >
                  <span>Xem sản phẩm</span>
                  <ArrowRight className="h-5 w-5" />
                </Link>
                <a
                  href="/#benefits"
                  className="border border-green-600 text-green-600 hover:bg-green-50 px-8 py-4 rounded-xl font-semibold text-lg transition-all text-center"
                >
                  Tìm hiểu thêm
                </a>
              </div>

              <div className="flex items-center space-x-4 text-sm text-gray-600">
                <div className="flex space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <span>Đánh giá 4.9/5 từ hơn 1,000 khách hàng</span>
              </div>
            </div>

            <div className="relative">
              <div className="bg-white rounded-3xl shadow-2xl p-8">
                <img
                  src="/product-black.jpg"
                  alt="Máy xử lý rác thải CCoM"
                  className="w-full h-auto"
                />
              </div>
              <div className="absolute -top-4 -right-4 bg-green-600 text-white px-4 py-2 rounded-full font-semibold">
                Mới ra mắt!
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Problem Section */}
      <section id="problems" className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <h2 className="text-3xl font-bold text-gray-900">
              Vấn đề bạn đang gặp phải?
            </h2>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-white p-6 rounded-2xl shadow-sm">
                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <div className="w-8 h-8 bg-red-500 rounded-full"></div>
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Mùi hôi khó chịu</h3>
                <p className="text-gray-600">Rác thải hữu cơ bốc mùi khó chịu trong nhà, ảnh hưởng đến chất lượng cuộc sống</p>
              </div>

              <div className="bg-white p-6 rounded-2xl shadow-sm">
                <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <DollarSign className="h-8 w-8 text-orange-500" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Chi phí cao</h3>
                <p className="text-gray-600">Mỗi tháng phải chi trả nhiều tiền cho việc thu gom và xử lý rác thải</p>
              </div>

              <div className="bg-white p-6 rounded-2xl shadow-sm">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Leaf className="h-8 w-8 text-gray-500" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Không bền vững</h3>
                <p className="text-gray-600">Chưa có giải pháp bền vững để bảo vệ môi trường và tái sử dụng rác hữu cơ</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section id="benefits" className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-4xl font-bold text-gray-900">
              CCoM - Giải pháp bạn cần
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Nhỏ gọn, tiện lợi, dễ sử dụng - chỉ một nút bấm, máy tự động biến rác thành phân bón
            </p>
          </div>

          <div className="grid lg:grid-cols-4 gap-8">
            <div className="text-center space-y-4 group">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto group-hover:bg-green-200 transition-colors">
                <Recycle className="h-10 w-10 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900">Giảm mùi hôi trong nhà</h3>
              <p className="text-gray-600">Khử hoàn toàn mùi hôi từ rác hữu cơ, mang lại không gian sống trong lành</p>
            </div>

            <div className="text-center space-y-4 group">
              <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto group-hover:bg-blue-200 transition-colors">
                <DollarSign className="h-10 w-10 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900">Tiết kiệm chi phí xử lý rác</h3>
              <p className="text-gray-600">Giảm đến 70% chi phí thu gom rác hàng tháng cho gia đình</p>
            </div>

            <div className="text-center space-y-4 group">
              <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto group-hover:bg-emerald-200 transition-colors">
                <Leaf className="h-10 w-10 text-emerald-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900">Biến rác thành phân bón</h3>
              <p className="text-gray-600">Chuyển hóa rác hữu cơ thành phân bón giàu dinh dưỡng cho cây trồng</p>
            </div>

            <div className="text-center space-y-4 group">
              <div className="w-20 h-20 bg-teal-100 rounded-full flex items-center justify-center mx-auto group-hover:bg-teal-200 transition-colors">
                <Check className="h-10 w-10 text-teal-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900">Bảo vệ môi trường</h3>
              <p className="text-gray-600">Góp phần giảm lượng rác thải ra môi trường, bảo vệ hành tinh xanh</p>
            </div>
          </div>
        </div>
      </section>

      {/* Product Showcase */}
      <section id="product-overview" className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <img
                src="/product-white.jpg"
                alt="Máy CCoM màu trắng"
                className="w-full h-auto rounded-2xl shadow-2xl"
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
                <div className="flex items-start space-x-3">
                  <Check className="h-6 w-6 text-green-600 mt-1 flex-shrink-0" />
                  <h4 className="font-semibold text-gray-900">Kích thước: Nhỏ gọn, phù hợp mọi không gian</h4>
                </div>

                <div className="flex items-start space-x-3">
                  <Check className="h-6 w-6 text-green-600 mt-1 flex-shrink-0" />
                  <h4 className="font-semibold text-gray-900">Dung tích: 2 - 3 lít</h4>
                </div>

                <div className="flex items-start space-x-3">
                  <Check className="h-6 w-6 text-green-600 mt-1 flex-shrink-0" />
                  <h4 className="font-semibold text-gray-900">Điện áp: 220V - 240V</h4>
                </div>

                <div className="flex items-start space-x-3">
                  <Check className="h-6 w-6 text-green-600 mt-1 flex-shrink-0" />
                  <h4 className="font-semibold text-gray-900">Công suất: 150W - 200W tiết kiệm điện</h4>
                </div>

                <div className="flex items-start space-x-3">
                  <Check className="h-6 w-6 text-green-600 mt-1 flex-shrink-0" />
                  <h4 className="font-semibold text-gray-900">Kiểm soát mùi hoàn toàn</h4>
                </div>

                <div className="flex items-start space-x-3">
                  <Check className="h-6 w-6 text-green-600 mt-1 flex-shrink-0" />
                  <h4 className="font-semibold text-gray-900">Vận hành chỉ với 1 nút nhấn</h4>
                </div>
              </div>

              <Link
                to="/product"
                className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all transform hover:scale-105 inline-flex items-center space-x-2"
              >
                <span>Đặt mua ngay</span>
                <ArrowRight className="h-5 w-5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section id="cta" className="py-20 bg-gradient-to-r from-green-600 to-green-700">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto space-y-8">
            <h2 className="text-4xl font-bold text-white">
              Đặt mua ngay hôm nay để tận hưởng căn bếp sạch sẽ, trong lành!
            </h2>
            <p className="text-xl text-green-100">
              Tham gia cùng hàng nghìn gia đình đã chọn CCoM để có cuộc sống xanh và thân thiện với môi trường
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/product"
                className="bg-white hover:bg-gray-100 text-green-600 px-8 py-4 rounded-xl font-semibold text-lg transition-all transform hover:scale-105 flex items-center justify-center space-x-2"
              >
                <span>Mua ngay với giá ưu đãi</span>
                <ArrowRight className="h-5 w-5" />
              </Link>
              <a
                href="tel:1900xxxx"
                className="border-2 border-white text-white hover:bg-white hover:text-green-600 px-8 py-4 rounded-xl font-semibold text-lg transition-all"
              >
                Liên hệ tư vấn miễn phí
              </a>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center space-y-2 sm:space-y-0 sm:space-x-8 text-green-100">
              <div className="flex items-center space-x-2">
                <Check className="h-5 w-5" />
                <span>Miễn phí vận chuyển</span>
              </div>
              <div className="flex items-center space-x-2">
                <Check className="h-5 w-5" />
                <span>Bảo hành 2 năm</span>
              </div>
              <div className="flex items-center space-x-2">
                <Check className="h-5 w-5" />
                <span>Hỗ trợ 24/7</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

export default HomePage;
