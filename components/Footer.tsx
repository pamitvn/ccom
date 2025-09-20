import Link from 'next/link';
import { Recycle } from 'lucide-react';
import {
  storeContact,
  storeLegal,
  storeName,
  storeProductLinks,
  storeSupportLinks,
  storeTagline,
} from '../config/store';

function Footer() {
  return (
    <footer className="mt-auto bg-gray-900 py-12 text-white">
      <div className="container mx-auto px-4">
        <div className="grid gap-8 md:grid-cols-4">
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Recycle className="h-8 w-8 text-green-400" />
              <span className="text-2xl font-bold">{storeName}</span>
            </div>
            <p className="text-gray-400">{storeTagline}</p>
          </div>

          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Sản phẩm</h4>
            <ul className="space-y-2 text-gray-400">
              {storeProductLinks.map((link) => (
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
              {storeSupportLinks.map((link) => (
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
              <li>Hotline: {storeContact.hotline}</li>
              <li>Email: {storeContact.email}</li>
              <li>Địa chỉ: {storeContact.address}</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>{storeLegal}</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
