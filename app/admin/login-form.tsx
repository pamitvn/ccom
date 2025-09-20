'use client';

import { useFormState, useFormStatus } from 'react-dom';
import { loginAction } from './actions';

const initialState = { error: undefined as string | undefined };

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      className="mt-4 w-full rounded-lg bg-green-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-green-700 disabled:cursor-not-allowed disabled:bg-green-400"
      disabled={pending}
    >
      {pending ? 'Đang xác thực...' : 'Đăng nhập'}
    </button>
  );
}

export default function LoginForm() {
  const [state, formAction] = useFormState(loginAction, initialState);

  return (
    <form action={formAction} className="space-y-4">
      <div>
        <label htmlFor="password" className="text-sm font-medium text-slate-700">
          Mật khẩu quản trị
        </label>
        <input
          id="password"
          name="password"
          type="password"
          autoComplete="current-password"
          className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-200"
          required
        />
      </div>

      {state.error ? <p className="text-sm text-red-600">{state.error}</p> : null}

      <SubmitButton />
    </form>
  );
}
