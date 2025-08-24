import React from 'react';
import { Link } from 'react-router-dom';
import { Scale, Phone, Mail, MapPin, Facebook, Twitter, Linkedin, Instagram, ArrowUp } from 'lucide-react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { name: 'Inicio', href: '/' },
    { name: 'Sobre Mí', href: '/about' },
    { name: 'Servicios', href: '/services' },
    { name: 'Blog', href: '/blog' },
    { name: 'Contacto', href: '/contact' },
  ];

  const legalLinks = [
    { name: 'Política de Privacidad', href: '/privacy' },
    { name: 'Términos de Servicio', href: '/terms' },
    { name: 'Aviso Legal', href: '/legal' },
  ];

  const services = [
    'Derecho Civil',
    'Derecho Penal',
    'Derecho Laboral',
    'Derecho Familiar',
    'Derecho Comercial',
  ];

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative bg-gradient-to-br from-neutral-900 via-neutral-800 to-neutral-900">
      {/* Decorative gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Company Info */}
          <div className="lg:col-span-1">
            <div className="flex items-center space-x-3 mb-6">
              <div className="p-2 bg-gradient-to-br from-primary-500 to-primary-600 rounded-xl shadow-glow">
                <Scale className="h-7 w-7 text-white" />
              </div>
              <div>
                <span className="text-xl font-display font-bold text-white">Dra. María González</span>
                <p className="text-sm text-neutral-400">Abogada Especialista</p>
              </div>
            </div>
            <p className="text-neutral-300 mb-6 leading-relaxed">
              Abogada especialista con más de 15 años de experiencia brindando 
              asesoría legal integral y representación de calidad.
            </p>
            <div className="flex space-x-4">
              {[
                { icon: Facebook, href: '#' },
                { icon: Twitter, href: '#' },
                { icon: Linkedin, href: '#' },
                { icon: Instagram, href: '#' },
              ].map(({ icon: Icon, href }, index) => (
                <a
                  key={index}
                  href={href}
                  className="p-2.5 bg-neutral-800 hover:bg-gradient-to-br hover:from-primary-500 hover:to-accent-500 text-neutral-400 hover:text-white rounded-xl transition-all duration-300 hover:shadow-glow transform hover:-translate-y-1"
                >
                  <Icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-display font-semibold text-white mb-6">Enlaces Rápidos</h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-neutral-300 hover:text-primary-400 transition-all duration-300 hover:translate-x-1 inline-block"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-lg font-display font-semibold text-white mb-6">Servicios</h3>
            <ul className="space-y-3">
              {services.map((service) => (
                <li key={service}>
                  <span className="text-neutral-300 hover:text-accent-400 transition-colors duration-300 cursor-default">
                    {service}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-display font-semibold text-white mb-6">Contacto</h3>
            <div className="space-y-4">
              <div className="flex items-start space-x-3 group">
                <div className="p-2 bg-neutral-800 group-hover:bg-primary-500/20 rounded-lg transition-colors duration-300">
                  <MapPin className="h-5 w-5 text-primary-400" />
                </div>
                <div>
                  <p className="text-neutral-300">Av. Principal 123</p>
                  <p className="text-neutral-400 text-sm">Ciudad, País 12345</p>
                </div>
              </div>
              <div className="flex items-center space-x-3 group">
                <div className="p-2 bg-neutral-800 group-hover:bg-primary-500/20 rounded-lg transition-colors duration-300">
                  <Phone className="h-5 w-5 text-primary-400" />
                </div>
                <a href="tel:+15551234567" className="text-neutral-300 hover:text-primary-400 transition-colors duration-300">
                  +1 (555) 123-4567
                </a>
              </div>
              <div className="flex items-center space-x-3 group">
                <div className="p-2 bg-neutral-800 group-hover:bg-primary-500/20 rounded-lg transition-colors duration-300">
                  <Mail className="h-5 w-5 text-primary-400" />
                </div>
                <a href="mailto:contacto@abogada.com" className="text-neutral-300 hover:text-primary-400 transition-colors duration-300">
                  contacto@abogada.com
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-neutral-700/50 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-neutral-400 text-sm">
              © {currentYear} Dra. María González. Todos los derechos reservados.
            </p>
            <div className="flex items-center space-x-6">
              {legalLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.href}
                  className="text-neutral-400 hover:text-primary-400 transition-colors duration-300 text-sm"
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Scroll to top button */}
      <button
        onClick={scrollToTop}
        className="absolute bottom-8 right-8 p-3 bg-gradient-to-br from-primary-500 to-primary-600 text-white rounded-full shadow-glow hover:shadow-glow-lg transform hover:-translate-y-1 transition-all duration-300"
        aria-label="Scroll to top"
      >
        <ArrowUp className="h-5 w-5" />
      </button>
    </footer>
  );
};

export default Footer;