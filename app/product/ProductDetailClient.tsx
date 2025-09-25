'use client';

import { useCallback, useMemo, useState, type SVGProps } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import type { LucideIcon } from 'lucide-react';
import {
  ArrowRight,
  Award,
  Check,
  Droplets,
  Filter,
  Home,
  Package,
  Palette,
  Power,
  Ruler,
  Scale,
  ShoppingCart,
  Share2,
  Shield,
  Star,
  Zap,
} from 'lucide-react';
import type { ProductColorOption, ProductConfig, SpecificationIconId } from '../../lib/app-config';

const specificationIcons: Record<SpecificationIconId, LucideIcon> = {
  palette: Palette,
  package: Package,
  droplets: Droplets,
  zap: Zap,
  power: Power,
  home: Home,
  filter: Filter,
  ruler: Ruler,
  scale: Scale,
  shield: Shield,
};

type ProductDetailClientProps = {
  product: ProductConfig;
  zaloLink?: string;
  hotline?: string;
};

export default function ProductDetailClient({ product, zaloLink, hotline }: ProductDetailClientProps) {
  const colors = product.colors;
  const initialColor = colors[0]?.id ?? '';
  const [selectedColor, setSelectedColor] = useState<string>(initialColor);

  const activeColor = useMemo<ProductColorOption | undefined>(() => {
    if (colors.length === 0) {
      return undefined;
    }
    return colors.find((option) => option.id === selectedColor) ?? colors[0];
  }, [colors, selectedColor]);

  const priceFormatter = useMemo(
    () =>
      new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND',
        maximumFractionDigits: 0,
      }),
    []
  );

  const hasDiscount = product.discountPercent > 0 && product.discountPercent < 100;
  const discountLabel = hasDiscount
    ? `Giảm ${Number.isInteger(product.discountPercent) ? product.discountPercent : product.discountPercent.toFixed(1)}%`
    : null;
  const computedOriginalPrice = hasDiscount
    ? Math.round(product.price / (1 - product.discountPercent / 100))
    : null;
  const roundedOriginalPrice = computedOriginalPrice
    ? Math.round(computedOriginalPrice / 1000) * 1000
    : null;
  const normalizedZaloLink = zaloLink?.trim() ?? '';
  const sanitizedHotline = hotline ? hotline.replace(/\D+/g, '') : '';
  const hotlineHref = sanitizedHotline.length > 0 ? `tel:${sanitizedHotline}` : '';
  const [shareFeedback, setShareFeedback] = useState('');

  const handleShare = useCallback(async () => {
    if (typeof window === 'undefined') {
      return;
    }

    const shareUrl = window.location.href;
    const shareData = {
      title: 'Máy tái chế rác hữu cơ CS 500W',
      text: 'Khám phá máy tái chế rác hữu cơ CS 500W – giải pháp xử lý rác sạch và tiện lợi cho gia đình.',
      url: shareUrl,
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
        setShareFeedback('Đã mở chia sẻ tới mạng xã hội.');
        return;
      }

      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(shareUrl);
        setShareFeedback('Đã sao chép liên kết để bạn chia sẻ.');
        return;
      }

      setShareFeedback(`Chia sẻ thủ công bằng cách sao chép liên kết: ${shareUrl}`);
    } catch (error) {
      if ((error as Error)?.name === 'AbortError') {
        setShareFeedback('Đã hủy thao tác chia sẻ.');
      } else {
        setShareFeedback('Không thể chia sẻ. Vui lòng thử lại.');
      }
    }
  }, []);

  return (
    <div className="bg-green-50">
      <div className="border-b bg-white">
        <div className="container mx-auto flex items-center space-x-2 px-4 py-3 text-sm text-gray-600">
          <Link href="/" className="hover:text-green-600">
            Trang chủ
          </Link>
          <span>/</span>
          <Link href="/product" className="hover:text-green-600">
            Sản phẩm
          </Link>
          <span>/</span>
          <span className="text-gray-900">Máy xử lý rác thải CCoM</span>
        </div>
      </div>

      <section className="container mx-auto px-4 py-12">
        <div className="grid gap-12 lg:grid-cols-2">
          <div className="space-y-6">
            <div className="rounded-3xl bg-white p-8 shadow-lg">
              <div className="relative mx-auto aspect-square w-full max-w-[420px]">
                {activeColor ? (
                  <Image
                    src={activeColor.image}
                    alt="Máy xử lý rác thải CCoM"
                    fill
                    sizes="(max-width: 768px) 100vw, 420px"
                    className="object-contain"
                    priority
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center rounded-2xl bg-gray-100 text-gray-500">
                    Đang cập nhật
                  </div>
                )}
              </div>
            </div>

            <div className="flex justify-center space-x-4">
              {colors.map((color) => (
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
                <span className="text-3xl font-bold text-green-600">{priceFormatter.format(product.price)}</span>
                {roundedOriginalPrice ? (
                  <span className="text-xl text-gray-400 line-through">
                    {priceFormatter.format(roundedOriginalPrice)}
                  </span>
                ) : null}
                {discountLabel ? (
                  <span className="rounded-full bg-red-100 px-3 py-1 text-sm font-semibold text-red-600">
                    {discountLabel}
                  </span>
                ) : null}
              </div>
            </div>

            <div className="rounded-xl bg-green-50 p-6">
              <h3 className="mb-3 text-lg font-semibold text-gray-900">Mô tả sản phẩm</h3>
              <p className="leading-relaxed text-gray-700">
                Máy xử lý rác thải CCoM giúp <strong>biến rác nhà bếp thành phân bón hữu cơ chỉ trong vài giờ</strong>.
                Thiết kế nhỏ gọn, hiện đại, phù hợp cho mọi gia đình, đặc biệt dễ vận hành chỉ với một nút bấm.
              </p>
            </div>

            <div className="space-y-6">
              <div>
                <h4 className="mb-3 font-semibold text-gray-900">
                  Màu sắc: {activeColor?.name ?? 'Đang cập nhật'}
                </h4>
                <div className="flex space-x-3">
                  {colors.map((color) => (
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

            <div className="space-y-4">
              {hotlineHref ? (
                <a
                  href={hotlineHref}
                  className="flex w-full items-center justify-center space-x-2 rounded-xl bg-green-600 py-4 text-lg font-semibold text-white transition-all hover:scale-105 hover:bg-green-700"
                >
                  <ShoppingCart className="h-6 w-6" />
                  <span>Gọi mua ngay - Giao hàng miễn phí</span>
                </a>
              ) : (
                <button
                  type="button"
                  className="flex w-full items-center justify-center space-x-2 rounded-xl bg-green-600 py-4 text-lg font-semibold text-white transition-all hover:scale-105 hover:bg-green-700"
                >
                  <ShoppingCart className="h-6 w-6" />
                  <span>Mua ngay - Giao hàng miễn phí</span>
                </button>
              )}

              <div
                className={`grid gap-4 ${normalizedZaloLink ? 'md:grid-cols-2' : 'md:grid-cols-1'}`}
              >
                {normalizedZaloLink ? (
                  <a
                    href={normalizedZaloLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center space-x-2 rounded-xl border-2 border-green-600 py-3 font-semibold text-green-600 transition-all hover:bg-green-50"
                  >
                    <ZaloIcon className="h-6 w-6" />
                    <span>Zalo</span>
                  </a>
                ) : null}
                <div className="flex flex-col items-center space-y-2">
                  <button
                    type="button"
                    onClick={handleShare}
                    className="flex w-full items-center justify-center space-x-2 rounded-xl border-2 border-gray-300 py-3 font-semibold text-gray-600 transition-all hover:bg-gray-50"
                  >
                    <Share2 className="h-5 w-5" />
                    <span>Chia sẻ</span>
                  </button>
                  {shareFeedback ? (
                    <span className="text-center text-xs text-gray-500">{shareFeedback}</span>
                  ) : null}
                </div>
              </div>
            </div>

            <div className="rounded-xl bg-green-50 p-4">
              <div className="grid grid-cols-3 gap-4 text-center">
                <div className="space-y-2">
                  <Shield className="mx-auto h-8 w-8 text-green-600" />
                  <p className="text-sm font-medium text-green-900">Bảo hành 1 năm lỗi từ nhà sản xuất</p>
                </div>
                <div className="space-y-2">
                  <ArrowRight className="mx-auto h-8 w-8 text-green-600" />
                  <p className="text-sm font-medium text-green-900">Giao hàng miễn phí</p>
                </div>
                <div className="space-y-2">
                  <Check className="mx-auto h-8 w-8 text-green-600" />
                  <p className="text-sm font-medium text-green-900">Đổi mới trong 7 ngày nếu lỗi từ nhà sản xuất</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-16 rounded-3xl bg-white shadow-lg">
          <div className="p-8">
            <h2 className="mb-8 text-2xl font-bold text-gray-900">Thông số kỹ thuật</h2>
            <div className="grid gap-6 md:grid-cols-2">
              {product.specifications.map((spec) => {
                const Icon = specificationIcons[spec.icon];
                return (
                  <div key={spec.label} className="flex items-center space-x-4 rounded-xl bg-gray-50 p-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
                      {Icon ? <Icon className="h-6 w-6 text-green-600" /> : <span>{spec.icon}</span>}
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">{spec.label}</h4>
                      <p className="text-gray-600">{spec.value}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="bg-gray-50 p-8">
            <h2 className="mb-8 text-2xl font-bold text-gray-900">Tính năng nổi bật</h2>
            <div className="grid gap-6 md:grid-cols-2">
              {product.features.map((feature) => (
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

          <div className="p-8">
            <h2 className="mb-8 text-2xl font-bold text-gray-900">Lý do nên chọn CCoM</h2>
            <div className="grid gap-4 md:grid-cols-2">
              {product.benefits.map((benefit) => (
                <div key={benefit} className="flex items-center space-x-3">
                  <Check className="h-5 w-5 flex-shrink-0 text-green-600" />
                  <span className="text-gray-700">{benefit}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

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
    </div>
  );
}

function ZaloIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      width="1em"
      height="1em"
      viewBox="0 0 50 50"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M22.782 0.166016H27.199C33.2653 0.166016 36.8103 1.05701 39.9572 2.74421C43.1041 4.4314 45.5875 6.89585 47.2557 10.0428C48.9429 13.1897 49.8339 16.7347 49.8339 22.801V27.1991C49.8339 33.2654 48.9429 36.8104 47.2557 39.9573C45.5685 43.1042 43.1041 45.5877 39.9572 47.2559C36.8103 48.9431 33.2653 49.8341 27.199 49.8341H22.8009C16.7346 49.8341 13.1896 48.9431 10.0427 47.2559C6.89583 45.5687 4.41243 43.1042 2.7442 39.9573C1.057 36.8104 0.166016 33.2654 0.166016 27.1991V22.801C0.166016 16.7347 1.057 13.1897 2.7442 10.0428C4.43139 6.89585 6.89583 4.41245 10.0427 2.74421C13.1707 1.05701 16.7346 0.166016 22.782 0.166016Z"
        fill="#0068FF"
      />
      <path
        opacity="0.12"
        fillRule="evenodd"
        clipRule="evenodd"
        d="M49.8336 26.4736V27.1994C49.8336 33.2657 48.9427 36.8107 47.2555 39.9576C45.5683 43.1045 43.1038 45.5879 39.9569 47.2562C36.81 48.9434 33.265 49.8344 27.1987 49.8344H22.8007C17.8369 49.8344 14.5612 49.2378 11.8104 48.0966L7.27539 43.4267L49.8336 26.4736Z"
        fill="#001A33"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M7.779 43.5892C10.1019 43.846 13.0061 43.1836 15.0682 42.1825C24.0225 47.1318 38.0197 46.8954 46.4923 41.4732C46.8209 40.9803 47.1279 40.4677 47.4128 39.9363C49.1062 36.7779 50.0004 33.22 50.0004 27.1316V22.7175C50.0004 16.629 49.1062 13.0711 47.4128 9.91273C45.7385 6.75436 43.2461 4.28093 40.0877 2.58758C36.9293 0.894239 33.3714 0 27.283 0H22.8499C17.6644 0 14.2982 0.652754 11.4699 1.89893C11.3153 2.03737 11.1636 2.17818 11.0151 2.32135C2.71734 10.3203 2.08658 27.6593 9.12279 37.0782C9.13064 37.0921 9.13933 37.1061 9.14889 37.1203C10.2334 38.7185 9.18694 41.5154 7.55068 43.1516C7.28431 43.399 7.37944 43.5512 7.779 43.5892Z"
        fill="white"
      />
      <path
        d="M20.5632 17H10.8382V19.0853H17.5869L10.9329 27.3317C10.7244 27.635 10.5728 27.9194 10.5728 28.5639V29.0947H19.748C20.203 29.0947 20.5822 28.7156 20.5822 28.2606V27.1421H13.4922L19.748 19.2938C19.8428 19.1801 20.0134 18.9716 20.0893 18.8768L20.1272 18.8199C20.4874 18.2891 20.5632 17.8341 20.5632 17.2844V17Z"
        fill="#0068FF"
      />
      <path d="M32.9416 29.0947H34.3255V17H32.2402V28.3933C32.2402 28.7725 32.5435 29.0947 32.9416 29.0947Z" fill="#0068FF" />
      <path
        d="M25.814 19.6924C23.1979 19.6924 21.0747 21.8156 21.0747 24.4317C21.0747 27.0478 23.1979 29.171 25.814 29.171C28.4301 29.171 30.5533 27.0478 30.5533 24.4317C30.5723 21.8156 28.4491 19.6924 25.814 19.6924ZM25.814 27.2184C24.2785 27.2184 23.0273 25.9672 23.0273 24.4317C23.0273 22.8962 24.2785 21.645 25.814 21.645C27.3495 21.645 28.6007 22.8962 28.6007 24.4317C28.6007 25.9672 27.3685 27.2184 25.814 27.2184Z"
        fill="#0068FF"
      />
      <path
        d="M40.4867 19.6162C37.8516 19.6162 35.7095 21.7584 35.7095 24.3934C35.7095 27.0285 37.8516 29.1707 40.4867 29.1707C43.1217 29.1707 45.2639 27.0285 45.2639 24.3934C45.2639 21.7584 43.1217 19.6162 40.4867 19.6162ZM40.4867 27.2181C38.9322 27.2181 37.681 25.9669 37.681 24.4124C37.681 22.8579 38.9322 21.6067 40.4867 21.6067C42.0412 21.6067 43.2924 22.8579 43.2924 24.4124C43.2924 25.9669 42.0412 27.2181 40.4867 27.2181Z"
        fill="#0068FF"
      />
      <path d="M29.4562 29.0944H30.5747V19.957H28.6221V28.2793C28.6221 28.7153 29.0012 29.0944 29.4562 29.0944Z" fill="#0068FF" />
    </svg>
  );
}
