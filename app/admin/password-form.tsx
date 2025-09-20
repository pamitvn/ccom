'use client';

import { useFormState, useFormStatus } from 'react-dom';
import { changePasswordAction } from './actions';

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
      {pending ? 'Đang cập nhật...' : 'Đổi mật khẩu'}
    </button>
  );
}

export default function PasswordForm() {
  const [state, formAction] = useFormState(changePasswordAction, initialState);

  return (
    <form action={formAction} className="space-y-4">
      <div className="grid gap-4 md:grid-cols-3">
        <div className="md:col-span-1">
          <label htmlFor="currentPassword" className="text-sm font-medium text-slate-700">
            Mật khẩu hiện tại
          </label>
          <input
            id="currentPassword"
            name="currentPassword"
            type="password"
            autoComplete="current-password"
            className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-200"
            required
          />
        </div>
        <div>
          <label htmlFor="newPassword" className="text-sm font-medium text-slate-700">
            Mật khẩu mới
          </label>
          <input
            id="newPassword"
            name="newPassword"
            type="password"
            autoComplete="new-password"
            className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-200"
            required
          />
        </div>
        <div>
          <label htmlFor="confirmPassword" className="text-sm font-medium text-slate-700">
            Xác nhận mật khẩu mới
          </label>
          <input
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            autoComplete="new-password"
            className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-200"
            required
          />
        </div>
      </div>

      <p className="text-xs text-slate-400">Mật khẩu nên có tối thiểu 6 ký tự.</p>

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
