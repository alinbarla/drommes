import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Hammer, Phone } from 'lucide-react';

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const navItems = [
    { path: '/', label: 'Hjem' },
    { path: '/gallery', label: 'Gallery' },
    { path: '/about', label: 'Om oss' },
    { path: '/contact', label: 'Kontakt' },
  ];

  return (
    <nav className="bg-puce-500 shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="group-hover:shadow-lg transition-all duration-300">
              <img src="/logo.png" alt="Drømme Huset AS Logo" className="h-14 w-auto" />
            </div>
            <span className="text-sand-500 text-xl font-bold">Drømme Huset AS</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-6 md:ml-8 lg:ml-10 flex items-center space-x-3 md:space-x-4 lg:space-x-6">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`px-3 lg:px-4 py-2 rounded-lg text-sm lg:text-base font-medium transition-all duration-300 whitespace-nowrap ${
                    location.pathname === item.path
                      ? 'bg-gold-500 text-puce-500 shadow-lg'
                      : 'text-sand-500 hover:text-white hover:bg-orange-500 hover:shadow-md'
                  }`}
                >
                  {item.label}
                </Link>
              ))}
              {/* Phone button: icon-only on md, full on lg+ */}
              <a
                href="tel:+4747294697"
                className="btn-premium inline-flex lg:hidden items-center p-2 rounded-lg hover:shadow-lg group"
                title="Ring oss"
              >
                <Phone className="h-4 w-4 group-hover:scale-110 transition-transform duration-300" />
              </a>
              <a
                href="tel:+4747294697"
                className="btn-premium hidden lg:inline-flex items-center px-4 py-2 rounded-lg hover:shadow-lg group whitespace-nowrap"
              >
                <Phone className="h-4 w-4 mr-2 group-hover:scale-110 transition-transform duration-300" />
                +47 472 94 697
              </a>
            </div>
          </div>

          {/* Mobile menu button and phone */}
          <div className="md:hidden flex items-center space-x-2">
            <a
              href="tel:+4747294697"
              className="btn-premium inline-flex items-center px-3 py-2 rounded-lg hover:shadow-lg group"
            >
              <Phone className="h-4 w-4 group-hover:scale-110 transition-transform duration-300" />
            </a>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-sand-500 hover:text-white hover:bg-orange-500 transition-colors duration-300"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-orange-500 rounded-b-lg">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsOpen(false)}
                  className={`block px-3 py-2 rounded-md text-base font-medium transition-all duration-300 whitespace-nowrap truncate ${
                    location.pathname === item.path
                      ? 'bg-gold-500 text-puce-500'
                      : 'text-sand-500 hover:text-white hover:bg-puce-500'
                  }`}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;