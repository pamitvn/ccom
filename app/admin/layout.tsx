import type { ReactNode } from 'react';
import Link from 'next/link';
import { isAdminAuthenticated } from '../../lib/auth';
import LoginForm from './login-form';

export default async function AdminLayout({ children }: { children: ReactNode }) {
  const authed = await isAdminAuthenticated();

  return (
    <div className="min-h-screen bg-slate-100">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-4">
          <Link href="/" className="text-xl font-semibold text-green-600">
            CCoM Store
          </Link>
          <span className="text-sm text-slate-500">Admin panel</span>
        </div>
      </header>

      <main className="mx-auto w-full max-w-5xl px-4 py-10">
        {authed ? (
          children
        ) : (
          <div className="mx-auto max-w-md rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
            <h1 className="text-2xl font-semibold text-slate-900">Đăng nhập quản trị</h1>
            <p className="mt-2 text-sm text-slate-500">
              Nhập mật khẩu quản trị viên để truy cập vào bảng điều khiển cửa hàng.
            </p>
            <div className="mt-6">
              <LoginForm />
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
