'use client';

import { useFormState, useFormStatus } from 'react-dom';
import { updateProductAction } from './actions';

type ProductDefaults = {
  colors: string;
  specifications: string;
  features: string;
  benefits: string;
};

type ActionState = {
  status: 'idle' | 'success' | 'error';
  message?: string;
};

const initialState: ActionState = { status: 'idle' };

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

  return (
    <form action={formAction} className="space-y-6">
      <div>
        <label htmlFor="colors" className="text-sm font-medium text-slate-700">
          Màu sắc <span className="text-xs text-slate-400">(mỗi dòng: id | tên | lớp tailwind | đường dẫn ảnh)</span>
        </label>
        <textarea
          id="colors"
          name="colors"
          defaultValue={defaults.colors}
          rows={4}
          className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-200"
        />
      </div>

      <div>
        <label htmlFor="specifications" className="text-sm font-medium text-slate-700">
          Thông số kỹ thuật <span className="text-xs text-slate-400">(mỗi dòng: icon | nhãn | giá trị)</span>
        </label>
        <textarea
          id="specifications"
          name="specifications"
          defaultValue={defaults.specifications}
          rows={4}
          className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-200"
        />
      </div>

      <div>
        <label htmlFor="features" className="text-sm font-medium text-slate-700">
          Tính năng nổi bật <span className="text-xs text-slate-400">(mỗi dòng: icon | tiêu đề | mô tả)</span>
        </label>
        <textarea
          id="features"
          name="features"
          defaultValue={defaults.features}
          rows={4}
          className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-200"
        />
      </div>

      <div>
        <label htmlFor="benefits" className="text-sm font-medium text-slate-700">
          Lợi ích <span className="text-xs text-slate-400">(mỗi dòng một lợi ích)</span>
        </label>
        <textarea
          id="benefits"
          name="benefits"
          defaultValue={defaults.benefits}
          rows={4}
          className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-200"
        />
      </div>

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
