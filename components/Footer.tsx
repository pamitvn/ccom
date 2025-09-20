import Link from 'next/link';
import { Recycle } from 'lucide-react';
import { getStoreConfig } from '../lib/config';

export default async function Footer() {
  const store = await getStoreConfig();
  return (
    <footer className="mt-auto bg-gray-900 py-12 text-white">
      <div className="container mx-auto px-4">
        <div className="grid gap-8 md:grid-cols-4">
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Recycle className="h-8 w-8 text-green-400" />
              <span className="text-2xl font-bold">{store.name}</span>
            </div>
            <p className="text-gray-400">{store.tagline}</p>
          </div>

          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Sản phẩm</h4>
            <ul className="space-y-2 text-gray-400">
              {store.productLinks.map((link) => (
                <li key={link.label}>
                  {link.href.startsWith('/') ? (
                    <Link href={link.href} className="transition-colors hover:text-white">
                      {link.label}
                    </Link>
                  ) : (
                    <a href={link.href} className="transition-colors hover:text-white">
                      {link.label}
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Hỗ trợ</h4>
            <ul className="space-y-2 text-gray-400">
              {store.supportLinks.map((link) => (
                <li key={link.label}>
                  {link.href.startsWith('/') ? (
                    <Link href={link.href} className="transition-colors hover:text-white">
                      {link.label}
                    </Link>
                  ) : (
                    <a href={link.href} className="transition-colors hover:text-white">
                      {link.label}
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Liên hệ</h4>
            <ul className="space-y-2 text-gray-400">
              <li>Hotline: {store.contact.hotline}</li>
              <li>Email: {store.contact.email}</li>
              <li>Địa chỉ: {store.contact.address}</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>{store.legal}</p>
        </div>
      </div>
    </footer>
  );
}
