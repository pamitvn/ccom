'use client';

import { useState } from 'react';
import { useFormState, useFormStatus } from 'react-dom';
import {
  type ProductColorOption,
  type ProductFeature,
  type ProductSpecification,
} from '../../lib/app-config';
import { updateProductAction } from './actions';

type ActionState = {
  status: 'idle' | 'success' | 'error';
  message?: string;
};

const initialState: ActionState = { status: 'idle' };

type ProductDefaults = {
  price: number;
  discountPercent: number;
  colors: ProductColorOption[];
  specifications: ProductSpecification[];
  features: ProductFeature[];
  benefits: string[];
};

type ColorItem = { key: string; value: ProductColorOption };

type SpecItem = { key: string; value: ProductSpecification };

type FeatureItem = { key: string; value: ProductFeature };

type BenefitItem = { key: string; value: string };

const createKey = () => Math.random().toString(36).slice(2);

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      className="inline-flex items-center justify-center rounded-lg bg-green-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-green-700 disabled:cursor-not-allowed disabled:bg-green-400"
      disabled={pending}
    >
      {pending ? 'Đang lưu...' : 'Lưu thông tin sản phẩm'}
    </button>
  );
}

export default function ProductForm({ defaults }: { defaults: ProductDefaults }) {
  const [state, formAction] = useFormState(updateProductAction, initialState);

  const seededColors: ProductColorOption[] =
    defaults.colors.length > 0
      ? defaults.colors
      : [{ id: '', name: '', swatchClasses: '', image: '' }];
  const seededSpecifications: ProductSpecification[] =
    defaults.specifications.length > 0
      ? defaults.specifications
      : [{ icon: 'palette' as ProductSpecification['icon'], label: '', value: '' }];
  const seededFeatures: ProductFeature[] =
    defaults.features.length > 0
      ? defaults.features
      : [{ icon: '🌿', title: '', description: '' }];
  const seededBenefits: string[] = defaults.benefits.length > 0 ? defaults.benefits : [''];

  const [colors, setColors] = useState<ColorItem[]>(
    seededColors.map((color) => ({ key: createKey(), value: { ...color } }))
  );

  const [specifications, setSpecifications] = useState<SpecItem[]>(
    seededSpecifications.map((spec) => ({ key: createKey(), value: { ...spec } }))
  );

  const [features, setFeatures] = useState<FeatureItem[]>(
    seededFeatures.map((feature) => ({ key: createKey(), value: { ...feature } }))
  );

  const [benefits, setBenefits] = useState<BenefitItem[]>(
    seededBenefits.map((benefit) => ({ key: createKey(), value: benefit }))
  );

  return (
    <form action={formAction} className="space-y-8">
      <section className="space-y-4">
        <h3 className="text-sm font-semibold text-slate-800">Giá bán</h3>
        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <label className="text-xs font-medium text-slate-500" htmlFor="price">
              Giá hiện tại (VND)
            </label>
            <input
              id="price"
              name="price"
              type="number"
              min="0"
              step="1000"
              defaultValue={defaults.price}
              className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-200"
              required
            />
          </div>
          <div>
            <label className="text-xs font-medium text-slate-500" htmlFor="discountPercent">
              Phần trăm giảm giá (%)
            </label>
            <input
              id="discountPercent"
              name="discountPercent"
              type="number"
              min="0"
              max="100"
              step="0.5"
              defaultValue={defaults.discountPercent}
              className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-200"
            />
          </div>
        </div>
      </section>

      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-semibold text-slate-800">Màu sắc</h3>
          <button
            type="button"
            className="text-sm font-medium text-green-600 hover:text-green-700"
            onClick={() =>
              setColors((items) => [
                ...items,
                { key: createKey(), value: { id: '', name: '', swatchClasses: '', image: '' } },
              ])
            }
          >
            + Thêm màu
          </button>
        </div>
        <div className="space-y-3">
          {colors.map((item, index) => (
            <div
              key={item.key}
              className="grid gap-3 rounded-lg border border-slate-200 p-4 md:grid-cols-4"
            >
              <div>
                <label className="text-xs font-medium text-slate-500">ID</label>
                <input
                  name={`colors[${index}][id]`}
                  defaultValue={item.value.id}
                  placeholder="black"
                  className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-200"
                  required
                />
              </div>
              <div>
                <label className="text-xs font-medium text-slate-500">Tên</label>
                <input
                  name={`colors[${index}][name]`}
                  defaultValue={item.value.name}
                  placeholder="Đen"
                  className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-200"
                  required
                />
              </div>
              <div>
                <label className="text-xs font-medium text-slate-500">Lớp Tailwind</label>
                <input
                  name={`colors[${index}][swatchClasses]`}
                  defaultValue={item.value.swatchClasses}
                  placeholder="bg-gray-900"
                  className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-200"
                />
              </div>
              <div>
                <label className="text-xs font-medium text-slate-500">Ảnh</label>
                <input
                  name={`colors[${index}][image]`}
                  defaultValue={item.value.image}
                  placeholder="/product-black.jpg"
                  className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-200"
                  required
                />
              </div>
              <button
                type="button"
                className="text-sm font-medium text-slate-500 hover:text-red-600 disabled:cursor-not-allowed"
                onClick={() => setColors((items) => items.filter((_, i) => i !== index))}
                disabled={colors.length <= 1}
              >
                Xóa
              </button>
            </div>
          ))}
        </div>
      </section>

      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-semibold text-slate-800">Thông số kỹ thuật</h3>
          <button
            type="button"
            className="text-sm font-medium text-green-600 hover:text-green-700"
            onClick={() =>
              setSpecifications((items) => [
                ...items,
                { key: createKey(), value: { icon: 'palette', label: '', value: '' } },
              ])
            }
          >
            + Thêm thông số
          </button>
        </div>
        <div className="space-y-3">
          {specifications.map((item, index) => (
            <div
              key={item.key}
              className="grid gap-3 rounded-lg border border-slate-200 p-4 md:grid-cols-3"
            >
              <div>
                <label className="text-xs font-medium text-slate-500">Icon</label>
                <input
                  name={`specifications[${index}][icon]`}
                  defaultValue={item.value.icon}
                  placeholder="palette"
                  className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-200"
                  required
                />
              </div>
              <div>
                <label className="text-xs font-medium text-slate-500">Nhãn</label>
                <input
                  name={`specifications[${index}][label]`}
                  defaultValue={item.value.label}
                  placeholder="Màu sắc"
                  className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-200"
                  required
                />
              </div>
              <div>
                <label className="text-xs font-medium text-slate-500">Giá trị</label>
                <input
                  name={`specifications[${index}][value]`}
                  defaultValue={item.value.value}
                  placeholder="Trắng, Đen"
                  className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-200"
                  required
                />
              </div>
              <button
                type="button"
                className="text-sm font-medium text-slate-500 hover:text-red-600 disabled:cursor-not-allowed"
                onClick={() => setSpecifications((items) => items.filter((_, i) => i !== index))}
                disabled={specifications.length <= 1}
              >
                Xóa
              </button>
            </div>
          ))}
        </div>
      </section>

      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-semibold text-slate-800">Tính năng nổi bật</h3>
          <button
            type="button"
            className="text-sm font-medium text-green-600 hover:text-green-700"
            onClick={() =>
              setFeatures((items) => [
                ...items,
                { key: createKey(), value: { icon: '🌿', title: '', description: '' } },
              ])
            }
          >
            + Thêm tính năng
          </button>
        </div>
        <div className="space-y-3">
          {features.map((item, index) => (
            <div
              key={item.key}
              className="grid gap-3 rounded-lg border border-slate-200 p-4 md:grid-cols-3"
            >
              <div>
                <label className="text-xs font-medium text-slate-500">Biểu tượng</label>
                <input
                  name={`features[${index}][icon]`}
                  defaultValue={item.value.icon}
                  placeholder="🌿"
                  className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-200"
                />
              </div>
              <div>
                <label className="text-xs font-medium text-slate-500">Tiêu đề</label>
                <input
                  name={`features[${index}][title]`}
                  defaultValue={item.value.title}
                  placeholder="Giảm mùi hôi"
                  className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-200"
                  required
                />
              </div>
              <div>
                <label className="text-xs font-medium text-slate-500">Mô tả</label>
                <textarea
                  name={`features[${index}][description]`}
                  defaultValue={item.value.description}
                  rows={2}
                  className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-200"
                  required
                />
              </div>
              <button
                type="button"
                className="text-sm font-medium text-slate-500 hover:text-red-600 disabled:cursor-not-allowed"
                onClick={() => setFeatures((items) => items.filter((_, i) => i !== index))}
                disabled={features.length <= 1}
              >
                Xóa
              </button>
            </div>
          ))}
        </div>
      </section>

      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-semibold text-slate-800">Lợi ích</h3>
          <button
            type="button"
            className="text-sm font-medium text-green-600 hover:text-green-700"
            onClick={() => setBenefits((items) => [...items, { key: createKey(), value: '' }])}
          >
            + Thêm lợi ích
          </button>
        </div>
        <div className="space-y-3">
          {benefits.map((item, index) => (
            <div
              key={item.key}
              className="flex items-start gap-3 rounded-lg border border-slate-200 p-4"
            >
              <div className="flex-1">
                <label className="text-xs font-medium text-slate-500">Nội dung</label>
                <input
                  name={`benefits[${index}]`}
                  defaultValue={item.value}
                  placeholder="Dễ dùng cho mọi người"
                  className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-200"
                  required
                />
              </div>
              <button
                type="button"
                className="text-sm font-medium text-slate-500 hover:text-red-600 disabled:cursor-not-allowed"
                onClick={() => setBenefits((items) => items.filter((_, i) => i !== index))}
                disabled={benefits.length <= 1}
              >
                Xóa
              </button>
            </div>
          ))}
        </div>
      </section>

      {state.status === 'error' && state.message ? (
        <p className="text-sm text-red-600">{state.message}</p>
      ) : null}
      {state.status === 'success' && state.message ? (
        <p className="text-sm text-green-600">{state.message}</p>
      ) : null}

      <SubmitButton />
    </form>
  );
}
