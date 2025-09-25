import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import type { LucideIcon } from 'lucide-react';
import {
  ArrowRight,
  Building2,
  Check,
  HeartPulse,
  Home,
  Leaf,
  Sparkles,
  Sprout,
  Star,
  Timer,
  Shrink,
} from 'lucide-react';
import { getProductConfig, getStoreConfig } from '../lib/config';
import { createPageMetadata } from '../lib/seo';

type PageSearchParams = Record<string, string | string[] | undefined>;

type PageProps = {
  searchParams?: Promise<PageSearchParams>;
};

export async function generateMetadata({ searchParams }: PageProps): Promise<Metadata> {
  const resolvedSearchParams = searchParams ? await searchParams : undefined;
  const store = await getStoreConfig();
  const title = store.tagline;
  const description = 'Máy xử lý rác hữu cơ CS 500W biến rác nhà bếp thành phân hữu cơ sạch chỉ trong vài giờ.';

  return createPageMetadata({
    title,
    description,
    path: '/',
    keywords: [
      'CCoM',
      'máy xử lý rác hữu cơ',
      'biến rác thành phân',
      'máy xử lý rác nhà bếp',
      'máy ủ rác hữu cơ',
    ],
    searchParams: resolvedSearchParams,
  });
}

export default async function HomePage() {
  const store = await getStoreConfig();
  const product = await getProductConfig();

  const heroHighlights =
    store.heroHighlights.length > 0
      ? store.heroHighlights
      : [
          'Xử lý rác trong 2–3 giờ thành mùn hữu cơ khô.',
          'Giảm 80–90% thể tích rác, giữ bếp sạch thơm.',
          'Khử mùi than hoạt tính, không còn ruồi muỗi.',
        ];

  const whyItems: { icon: LucideIcon; title: string; description: string }[] = [
    {
      icon: Timer,
      title: 'Xử lý rác trong 2–3 giờ',
      description:
        'Rau, vỏ trái cây, thức ăn thừa, bã cà phê, vỏ trứng… được nghiền nhỏ, sấy khô và khử mùi triệt để.',
    },
    {
      icon: Shrink,
      title: 'Giảm 80–90% thể tích rác',
      description: 'Không còn cảnh rác tràn thùng hay mùi hôi khó chịu trong căn bếp.',
    },
    {
      icon: Sparkles,
      title: 'Khử mùi hoàn toàn',
      description: 'Công nghệ lọc than hoạt tính, không ruồi muỗi, không ám mùi.',
    },
    {
      icon: Leaf,
      title: 'Tạo phân hữu cơ dinh dưỡng',
      description: 'Thành phẩm là mùn hữu cơ giàu dưỡng chất, bón trực tiếp cho cây trồng.',
    },
    {
      icon: Home,
      title: 'Tiện lợi – Sang trọng – Hiện đại',
      description: 'Thiết kế nhỏ gọn, đẹp mắt, nâng tầm mọi căn bếp gia đình.',
    },
  ];

  const audienceItems: { icon: LucideIcon; title: string; description: string }[] = [
    {
      icon: Building2,
      title: 'Gia đình ở chung cư, nhà phố',
      description: 'Giải pháp gọn nhẹ khi không có nhiều không gian chứa rác.',
    },
    {
      icon: Sprout,
      title: 'Người yêu làm vườn, trồng cây',
      description: 'Chủ động nguồn phân hữu cơ sạch, giàu dinh dưỡng mỗi ngày.',
    },
    {
      icon: HeartPulse,
      title: 'Gia đình chú trọng sức khỏe & môi trường',
      description: 'Giữ căn bếp sạch đẹp, an toàn cho cả nhà, sống xanh hơn từng ngày.',
    },
  ];

  const realBenefits = [
    'Bảo vệ sức khỏe: không còn vi khuẩn, ruồi muỗi từ rác.',
    'Tiết kiệm chi phí: có phân hữu cơ miễn phí cho cây trồng.',
    'Bảo vệ môi trường: giảm lượng rác chôn lấp và khí nhà kính.',
  ];

  return (
    <div className="bg-white">
      <section id="hero" className="bg-gradient-to-br from-green-50 to-blue-50 py-20">
        <div className="container mx-auto grid items-center gap-12 px-4 lg:grid-cols-2">
          <div className="space-y-8">
            <span className="inline-flex items-center rounded-full bg-green-100 px-4 py-1 text-sm font-medium text-green-700">
              Máy tái chế rác hữu cơ gia đình
            </span>
            <div className="space-y-4">
              <h1 className="text-5xl font-bold leading-tight text-gray-900 lg:text-6xl">
                {store.tagline}
                <span className="ml-2 text-green-600" role="img" aria-label="Sprout">
                  🌱
                </span>
              </h1>
              <p className="text-xl text-gray-600">
                Biến rác thành phân – Giữ bếp sạch thơm – Bảo vệ môi trường.
              </p>
            </div>

            <ul className="space-y-3 text-gray-700">
              {heroHighlights.map((item) => (
                <li key={item} className="flex items-start space-x-3">
                  <Check className="mt-1 h-5 w-5 flex-shrink-0 text-green-600" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>

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
                sizes="(min-width: 1024px) 50vw, 90vw"
                className="h-auto w-full"
              />
            </div>
            <div className="absolute -right-4 -top-4 rounded-full bg-green-600 px-4 py-2 font-semibold text-white">
              Biến rác thành phân!
            </div>
          </div>
        </div>
      </section>

      <section id="why" className="py-16">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-4xl font-bold text-gray-900">Tại sao bạn nên có máy này trong bếp?</h2>
            <p className="mt-4 text-lg text-gray-600">
              CS 500W xử lý trọn vẹn rác hữu cơ mỗi ngày, giữ căn bếp sạch sẽ và mang lại nguồn phân hữu cơ dồi dào.
            </p>
          </div>

          <div className="mt-12 grid gap-8 md:grid-cols-2 xl:grid-cols-3">
            {whyItems.map((item) => (
              <div key={item.title} className="rounded-3xl bg-white p-6 shadow-lg">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-green-100 text-green-600">
                  <item.icon className="h-6 w-6" />
                </div>
                <h3 className="mb-2 text-xl font-semibold text-gray-900">{item.title}</h3>
                <p className="text-gray-600">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="benefits" className="bg-gray-50 py-20">
        <div className="container mx-auto px-4">
          <div className="mb-12 max-w-3xl text-center md:mx-auto">
            <h2 className="text-4xl font-bold text-gray-900">Tính năng nổi bật</h2>
            <p className="mt-4 text-lg text-gray-600">
              3 trong 1: Sấy nhiệt, nghiền nhỏ và khử mùi than hoạt tính – rác biến thành mùn hữu cơ sạch, khô ráo.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-4">
            {product.features.map((feature) => (
              <div key={feature.title} className="rounded-3xl bg-white p-6 shadow-sm">
                <div className="mb-4 text-3xl">{feature.icon}</div>
                <h3 className="mb-2 text-lg font-semibold text-gray-900">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="audience" className="bg-gray-50 py-20">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-4xl font-bold text-gray-900">Phù hợp với ai?</h2>
            <p className="mt-4 text-lg text-gray-600">
              Dành cho những gia đình yêu thích sự gọn gàng, sạch sẽ và ưu tiên lối sống xanh.
            </p>
          </div>

          <div className="mt-12 grid gap-8 md:grid-cols-3">
            {audienceItems.map((item) => (
              <div key={item.title} className="rounded-3xl bg-white p-6 text-center shadow-lg">
                <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-green-100 text-green-600">
                  <item.icon className="h-7 w-7" />
                </div>
                <h3 className="mb-2 text-lg font-semibold text-gray-900">{item.title}</h3>
                <p className="text-gray-600">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="real-benefits" className="py-20">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-4xl font-bold text-gray-900">Lợi ích thực tế</h2>
            <p className="mt-4 text-lg text-gray-600">
              Sống tiện nghi hơn và góp phần bảo vệ môi trường ngay trong căn bếp của bạn.
            </p>
          </div>

          <ul className="mt-12 grid gap-6 md:grid-cols-3">
            {realBenefits.map((benefit) => (
              <li key={benefit} className="rounded-3xl border border-green-100 p-6 text-left shadow-sm">
                <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-green-600 text-white">
                  <Check className="h-5 w-5" />
                </div>
                <p className="text-gray-700">{benefit}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section id="cta" className="bg-gradient-to-r from-green-600 to-emerald-600 py-20">
        <div className="container mx-auto flex flex-col items-center gap-6 px-4 text-center text-white">
          <h2 className="text-4xl font-bold">Sẵn sàng nâng cấp căn bếp sống xanh?</h2>
          <p className="max-w-2xl text-lg text-green-100">
            Đặt mua {store.name} CS 500W ngay hôm nay để biến rác nhà bếp thành phân hữu cơ sạch, bảo vệ sức khỏe cả gia đình và môi trường.
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
