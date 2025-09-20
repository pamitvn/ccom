import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';
import './globals.css';

export const metadata: Metadata = {
  title: 'CCoM | Giải pháp xử lý rác tại nhà',
  description: 'Biến rác thải nhà bếp thành phân bón hữu cơ cùng thiết bị thông minh CCoM.',
};

export default function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html lang="vi">
      <body className="flex min-h-screen flex-col bg-white text-gray-900">
        <Header />
        <main className="flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
