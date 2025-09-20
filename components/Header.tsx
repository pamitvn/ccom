'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Recycle } from 'lucide-react';

const baseLinkClasses =
  'text-gray-600 hover:text-green-600 transition-colors font-medium';

const navLinks = [
  { href: '/', label: 'Trang chủ' },
  { href: '/product', label: 'Sản phẩm' },
  { href: '/#benefits', label: 'Lợi ích', external: true },
];

function Header() {
  const pathname = usePathname();

  return (
    <header className="bg-white shadow-sm">
      <div className="container mx-auto flex items-center justify-between px-4 py-4">
        <Link href="/" className="flex items-center space-x-2">
          <Recycle className="h-8 w-8 text-green-600" />
          <span className="text-2xl font-bold text-green-600">CCoM</span>
        </Link>
        <nav className="hidden space-x-8 md:flex">
          {navLinks.map((link) =>
            link.external ? (
              <a key={link.label} href={link.href} className={baseLinkClasses}>
                {link.label}
              </a>
            ) : (
              <Link
                key={link.label}
                href={link.href}
                className={`${baseLinkClasses} ${
                  pathname === link.href ? 'text-green-600' : ''
                }`}
              >
                {link.label}
              </Link>
            ),
          )}
        </nav>
      </div>
    </header>
  );
}

export default Header;
