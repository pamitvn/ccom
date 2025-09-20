'use client';

import { useFormState, useFormStatus } from 'react-dom';
import { updateStoreAction } from './actions';

type StoreFormProps = {
  defaults: {
    name: string;
    tagline: string;
    hotline: string;
    email: string;
    address: string;
    productLinks: string;
    supportLinks: string;
    legal: string;
  };
};

type ActionState = {
  status: 'idle' | 'success' | 'error';
  message?: string;
};

const initialState: ActionState = { status: 'idle' };

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

export default function StoreForm({ defaults }: StoreFormProps) {
  const [state, formAction] = useFormState(updateStoreAction, initialState);

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

      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <label htmlFor="productLinks" className="text-sm font-medium text-slate-700">
            Liên kết sản phẩm <span className="text-xs text-slate-400">(mỗi dòng: nhãn | URL)</span>
          </label>
          <textarea
            id="productLinks"
            name="productLinks"
            defaultValue={defaults.productLinks}
            rows={4}
            className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-200"
          />
        </div>
        <div>
          <label htmlFor="supportLinks" className="text-sm font-medium text-slate-700">
            Liên kết hỗ trợ <span className="text-xs text-slate-400">(mỗi dòng: nhãn | URL)</span>
          </label>
          <textarea
            id="supportLinks"
            name="supportLinks"
            defaultValue={defaults.supportLinks}
            rows={4}
            className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-200"
          />
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
