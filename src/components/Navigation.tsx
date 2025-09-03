import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Hammer, Phone } from 'lucide-react';

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const menuRef = useRef<HTMLDivElement>(null);

  const navItems = [
    { path: '/', label: 'Hjem' },
    { path: '/gallery', label: 'Gallery' },
    { path: '/about', label: 'Om oss' },
    { path: '/contact', label: 'Kontakt' },
  ];

  // Close menu when route changes
  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  // Handle click outside to close menu
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

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

        {/* Mobile Navigation - Overlay */}
        {isOpen && (
          <div className="md:hidden fixed inset-0 top-20 z-40 bg-black bg-opacity-50">
            <div ref={menuRef} className="absolute top-0 left-0 right-0 bg-orange-500 shadow-2xl rounded-b-2xl border-b-4 border-gold-500">
              <div className="px-4 py-6 space-y-3">
                {navItems.map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={() => setIsOpen(false)}
                    className={`block px-4 py-3 rounded-xl text-lg font-semibold transition-all duration-300 whitespace-nowrap ${
                      location.pathname === item.path
                        ? 'bg-gold-500 text-puce-500 shadow-lg'
                        : 'text-sand-500 hover:text-white hover:bg-puce-500 hover:shadow-md'
                    }`}
                  >
                    {item.label}
                  </Link>
                ))}
                {/* Additional mobile-only contact info */}
                <div className="pt-4 border-t border-gold-500/30">
                  <div className="text-center text-sand-500 text-sm">
                    <p className="font-medium mb-2">Ring oss direkte:</p>
                    <a
                      href="tel:+4747294697"
                      className="btn-premium inline-flex items-center px-6 py-3 rounded-xl text-lg font-bold hover:shadow-xl transition-all duration-300"
                    >
                      <Phone className="h-5 w-5 mr-2" />
                      +47 472 94 697
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;