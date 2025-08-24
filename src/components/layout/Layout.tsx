import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import { Helmet } from 'react-helmet-async';

interface LayoutProps {
  title?: string;
  description?: string;
  keywords?: string;
}

const Layout: React.FC<LayoutProps> = ({ 
  title = 'Dra. María González - Abogada Especialista',
  description = 'Servicios legales profesionales con más de 15 años de experiencia. Especialista en derecho civil, penal, laboral y familiar.',
  keywords = 'abogada, servicios legales, derecho civil, derecho penal, asesoría legal'
}) => {
  return (
    <>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="keywords" content={keywords} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        <link rel="canonical" href={window.location.href} />
      </Helmet>
      
      <div className="min-h-screen flex flex-col bg-neutral-50">
        <Header />
        <main className="flex-1 relative">
          {/* Background decoration */}
          <div className="absolute inset-0 bg-gradient-to-br from-primary-50/30 via-transparent to-accent-50/30 pointer-events-none" />
          <div className="relative z-10">
            <Outlet />
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
};

// Page component for individual pages with SEO
export const Page: React.FC<LayoutProps & { children: React.ReactNode }> = ({ 
  title = 'Dra. María González - Abogada Especialista',
  description = 'Servicios legales profesionales con más de 15 años de experiencia. Especialista en derecho civil, penal, laboral y familiar.',
  keywords = 'abogada, servicios legales, derecho civil, derecho penal, asesoría legal',
  children
}) => {
  return (
    <>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="keywords" content={keywords} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        <link rel="canonical" href={window.location.href} />
      </Helmet>
      
      <div className="min-h-screen flex flex-col bg-neutral-50">
        <Header />
        <main className="flex-1 relative">
          {/* Background decoration */}
          <div className="absolute inset-0 bg-gradient-to-br from-primary-50/30 via-transparent to-accent-50/30 pointer-events-none" />
          <div className="relative z-10">
            {children}
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
};

export default Layout;