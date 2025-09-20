'use client';

import { useState } from 'react';
import { useFormState, useFormStatus } from 'react-dom';
import { updateStoreAction } from './actions';

type Link = {
  label: string;
  href: string;
};

type LinkItem = Link & { key: string };

type StoreFormProps = {
  defaults: {
    name: string;
    tagline: string;
    hotline: string;
    email: string;
    address: string;
    productLinks: Link[];
    supportLinks: Link[];
    legal: string;
  };
};

type ActionState = {
  status: 'idle' | 'success' | 'error';
  message?: string;
};

const initialState: ActionState = { status: 'idle' };

const createKey = () => Math.random().toString(36).slice(2);

function SubmitButton({ label }: { label: string }) {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      className="inline-flex items-center justify-center rounded-lg bg-green-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-green-700 disabled:cursor-not-allowed disabled:bg-green-400"
      disabled={pending}
    >
      {pending ? 'Đang lưu...' : label}
    </button>
  );
}

function useLinkRepeater(initial: Link[]): [LinkItem[], (updater: (items: LinkItem[]) => LinkItem[]) => void] {
  const seeded = initial.length > 0 ? initial : [{ label: '', href: '' }];
  const [items, setItems] = useState<LinkItem[]>(
    seeded.map((item) => ({ ...item, key: createKey() }))
  );
  return [items, (updater) => setItems((prev) => updater(prev))];
}

export default function StoreForm({ defaults }: StoreFormProps) {
  const [state, formAction] = useFormState(updateStoreAction, initialState);
  const [productLinks, setProductLinks] = useLinkRepeater(defaults.productLinks);
  const [supportLinks, setSupportLinks] = useLinkRepeater(defaults.supportLinks);

  return (
    <form action={formAction} className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <label htmlFor="name" className="text-sm font-medium text-slate-700">
            Tên cửa hàng
          </label>
          <input
            id="name"
            name="name"
            defaultValue={defaults.name}
            className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-200"
            required
          />
        </div>
        <div>
          <label htmlFor="tagline" className="text-sm font-medium text-slate-700">
            Khẩu hiệu
          </label>
          <input
            id="tagline"
            name="tagline"
            defaultValue={defaults.tagline}
            className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-200"
          />
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <div>
          <label htmlFor="hotline" className="text-sm font-medium text-slate-700">
            Hotline
          </label>
          <input
            id="hotline"
            name="hotline"
            defaultValue={defaults.hotline}
            className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-200"
          />
        </div>
        <div>
          <label htmlFor="email" className="text-sm font-medium text-slate-700">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            defaultValue={defaults.email}
            className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-200"
          />
        </div>
        <div>
          <label htmlFor="address" className="text-sm font-medium text-slate-700">
            Địa chỉ
          </label>
          <input
            id="address"
            name="address"
            defaultValue={defaults.address}
            className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-200"
          />
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-semibold text-slate-800">Liên kết sản phẩm</h3>
          <button
            type="button"
            className="text-sm font-medium text-green-600 hover:text-green-700"
            onClick={() =>
              setProductLinks((items) => [...items, { key: createKey(), label: '', href: '' }])
            }
          >
            + Thêm liên kết
          </button>
        </div>
        <div className="space-y-3">
          {productLinks.map((link, index) => (
            <div
              key={link.key}
              className="flex flex-col gap-3 rounded-lg border border-slate-200 p-4 md:flex-row md:items-center md:gap-4"
            >
              <div className="flex-1">
                <label className="text-xs font-medium text-slate-500">Nhãn</label>
                <input
                  name={`productLinks[${index}][label]`}
                  defaultValue={link.label}
                  className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-200"
                  placeholder="Ví dụ: Máy xử lý rác"
                  required
                />
              </div>
              <div className="flex-1">
                <label className="text-xs font-medium text-slate-500">Đường dẫn</label>
                <input
                  name={`productLinks[${index}][href]`}
                  defaultValue={link.href}
                  className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-200"
                  placeholder="/product"
                  required
                />
              </div>
              <button
                type="button"
                className="self-start text-sm font-medium text-slate-500 hover:text-red-600 disabled:cursor-not-allowed"
                onClick={() =>
                  setProductLinks((items) =>
                    items.filter((_, itemIndex) => itemIndex !== index)
                  )
                }
                disabled={productLinks.length <= 1}
              >
                Xóa
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-semibold text-slate-800">Liên kết hỗ trợ</h3>
          <button
            type="button"
            className="text-sm font-medium text-green-600 hover:text-green-700"
            onClick={() =>
              setSupportLinks((items) => [...items, { key: createKey(), label: '', href: '' }])
            }
          >
            + Thêm liên kết
          </button>
        </div>
        <div className="space-y-3">
          {supportLinks.map((link, index) => (
            <div
              key={link.key}
              className="flex flex-col gap-3 rounded-lg border border-slate-200 p-4 md:flex-row md:items-center md:gap-4"
            >
              <div className="flex-1">
                <label className="text-xs font-medium text-slate-500">Nhãn</label>
                <input
                  name={`supportLinks[${index}][label]`}
                  defaultValue={link.label}
                  className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-200"
                  placeholder="Ví dụ: FAQ"
                  required
                />
              </div>
              <div className="flex-1">
                <label className="text-xs font-medium text-slate-500">Đường dẫn</label>
                <input
                  name={`supportLinks[${index}][href]`}
                  defaultValue={link.href}
                  className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-200"
                  placeholder="/#faq"
                  required
                />
              </div>
              <button
                type="button"
                className="self-start text-sm font-medium text-slate-500 hover:text-red-600 disabled:cursor-not-allowed"
                onClick={() =>
                  setSupportLinks((items) =>
                    items.filter((_, itemIndex) => itemIndex !== index)
                  )
                }
                disabled={supportLinks.length <= 1}
              >
                Xóa
              </button>
            </div>
          ))}
        </div>
      </div>

      <div>
        <label htmlFor="legal" className="text-sm font-medium text-slate-700">
          Thông tin pháp lý/cuối trang
        </label>
        <input
          id="legal"
          name="legal"
          defaultValue={defaults.legal}
          className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-200"
        />
      </div>

      {state.status === 'error' && state.message ? (
        <p className="text-sm text-red-600">{state.message}</p>
      ) : null}
      {state.status === 'success' && state.message ? (
        <p className="text-sm text-green-600">{state.message}</p>
      ) : null}

      <SubmitButton label="Lưu thông tin cửa hàng" />
    </form>
  );
}
