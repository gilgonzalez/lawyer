import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Scale } from 'lucide-react';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const navigation = [
    { name: 'Inicio', href: '/' },
    { name: 'Sobre Mí', href: '/about' },
    { name: 'Servicios', href: '/services' },
    { name: 'Blog', href: '/blog' },
    { name: 'Contacto', href: '/contact' },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="bg-white/95 backdrop-blur-md shadow-soft sticky top-0 z-50 border-b border-neutral-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4 lg:py-6">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="p-2 bg-gradient-to-br from-primary-500 to-primary-600 rounded-xl shadow-soft group-hover:shadow-glow transition-all duration-300">
              <Scale className="h-6 w-6 lg:h-7 lg:w-7 text-white" />
            </div>
            <div className="flex flex-col">
              <span className="text-lg lg:text-xl font-display font-semibold text-neutral-900 leading-tight">Dra. María González</span>
              <span className="text-xs lg:text-sm text-neutral-600 font-medium">Abogada Especialista</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-1">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`relative px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 group ${
                  isActive(item.href)
                    ? 'text-primary-600 bg-primary-50 shadow-soft'
                    : 'text-neutral-700 hover:text-primary-600 hover:bg-neutral-50'
                }`}
              >
                {item.name}
                {isActive(item.href) && (
                  <div className="absolute inset-x-0 -bottom-1 h-0.5 bg-gradient-to-r from-primary-500 to-accent-500 rounded-full" />
                )}
              </Link>
            ))}
          </nav>

          {/* CTA Button */}
          <div className="hidden lg:block">
            <Link
              to="/contact"
              className="group relative bg-gradient-to-r from-primary-600 to-primary-700 text-white px-6 py-3 rounded-xl font-semibold hover:from-primary-700 hover:to-primary-800 transition-all duration-300 shadow-soft hover:shadow-glow transform hover:-translate-y-0.5"
            >
              <span className="relative z-10">Consulta Gratuita</span>
              <div className="absolute inset-0 bg-gradient-to-r from-accent-500 to-accent-600 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden p-2.5 rounded-xl text-neutral-700 hover:text-primary-600 hover:bg-neutral-50 transition-all duration-300"
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        <div className={`lg:hidden overflow-hidden transition-all duration-300 ease-in-out ${
          isMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}>
          <div className="px-2 pt-2 pb-6 space-y-2 bg-white/95 backdrop-blur-sm border-t border-neutral-100">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`block px-4 py-3 rounded-xl text-base font-medium transition-all duration-300 ${
                  isActive(item.href)
                    ? 'text-primary-600 bg-primary-50 shadow-soft'
                    : 'text-neutral-700 hover:text-primary-600 hover:bg-neutral-50'
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
            <Link
              to="/contact"
              className="block w-full text-center bg-gradient-to-r from-primary-600 to-primary-700 text-white px-6 py-3 rounded-xl font-semibold hover:from-primary-700 hover:to-primary-800 transition-all duration-300 shadow-soft mt-4"
              onClick={() => setIsMenuOpen(false)}
            >
              Consulta Gratuita
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;