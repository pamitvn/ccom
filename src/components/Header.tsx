import { NavLink, Link } from 'react-router-dom';
import { Recycle } from 'lucide-react';

const baseLinkClasses =
  'text-gray-600 hover:text-green-600 transition-colors font-medium';

function Header() {
  return (
    <header className="bg-white shadow-sm">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link to="/" className="flex items-center space-x-2">
          <Recycle className="h-8 w-8 text-green-600" />
          <span className="text-2xl font-bold text-green-600">CCoM</span>
        </Link>
        <nav className="hidden md:flex space-x-8">
          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              `${baseLinkClasses} ${isActive ? 'text-green-600' : ''}`
            }
          >
            Trang chủ
          </NavLink>
          <NavLink
            to="/product"
            className={({ isActive }) =>
              `${baseLinkClasses} ${isActive ? 'text-green-600' : ''}`
            }
          >
            Sản phẩm
          </NavLink>
          <a href="/#benefits" className={baseLinkClasses}>
            Lợi ích
          </a>
        </nav>
      </div>
    </header>
  );
}

export default Header;
