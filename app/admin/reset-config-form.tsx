'use client';

import { useFormState, useFormStatus } from 'react-dom';
import { resetConfigAction } from './actions';

type ActionState = {
  status: 'idle' | 'success' | 'error';
  message?: string;
};

const initialState: ActionState = { status: 'idle' };

function ResetButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      className="inline-flex items-center justify-center rounded-lg border border-red-200 px-4 py-2 text-sm font-semibold text-red-600 transition hover:border-red-300 hover:text-red-700 disabled:cursor-not-allowed disabled:border-red-100 disabled:text-red-300"
      disabled={pending}
    >
      {pending ? 'Đang khôi phục...' : 'Khôi phục mặc định'}
    </button>
  );
}

export default function ResetConfigForm() {
  const [state, formAction] = useFormState(resetConfigAction, initialState);

  return (
    <form
      action={formAction}
      className="flex flex-col gap-2 sm:flex-row sm:items-center"
      onSubmit={(event) => {
        if (typeof window !== 'undefined') {
          const confirmed = window.confirm(
            'Khôi phục cấu hình mặc định sẽ ghi đè toàn bộ thay đổi hiện tại. Bạn có chắc chắn?'
          );
          if (!confirmed) {
            event.preventDefault();
          }
        }
      }}
    >
      <ResetButton />
      {state.status === 'error' && state.message ? (
        <span className="text-sm text-red-600">{state.message}</span>
      ) : null}
      {state.status === 'success' && state.message ? (
        <span className="text-sm text-green-600">{state.message}</span>
      ) : null}
    </form>
  );
}
